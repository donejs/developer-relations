const fs = require('fs');
const octonode = require('octonode');
const organizations = ['donejs', 'canjs', 'bitovi', 'stealjs', 'bit-docs'];
const pageSize = 100;
const authorizationToken = process.argv[2];

if (!authorizationToken) {
  throw new Error('No authorization token provided; please include it as the first argument to this script.');
}

const client = octonode.client(authorizationToken);
const license = `The MIT License (MIT)

Copyright (c) COPYRIGHT_YEAR Bitovi

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`

async function getRepos(org) {
  var pageIndex = 1;
  var incompletePageFound = false;
  var repoList = [];

  while (incompletePageFound === false) {
    var repoPage = await getRepoPage(org, pageIndex);
    repoList = repoList.concat(repoPage);

    pageIndex++;
    if (repoPage.length < pageSize) {
      incompletePageFound = true;
    }
  }

  return repoList;
}

function getRepoPage(org, pageIndex) {
  return new Promise(function(resolve, reject) {
    // loop over paginated API until we find the end of the data
    org.repos({page: pageIndex, per_page: pageSize}, (err, results)=> {
      resolve(results);
    });    
  })
}

function getRepoRootContents(repo) {
  return new Promise(function(resolve, reject) {
    repo.contents('', function(err, results) {
      resolve(results);
    });
  })
}

async function getReposMissingLicense(orgs) {
  var reposMissingLicense = [];

  for (var orgName of orgs) {
    const org = client.org(orgName);
    const repos = await getRepos(org);
    const publicRepos = repos.filter((r)=>!r.private);
    for (var repoData of publicRepos) {
      if (repoData.name === 'can-view-target') {
        debugger;
      }

      const repoClient = client.repo(repoData.full_name);
      const files = await getRepoRootContents(repoClient);
      if (files === undefined) {
        // skip empty repos
        continue;
      }
      const licenseIndex = files.findIndex((file)=>{
        return file.name.toLowerCase().startsWith('license')
      });
      if (licenseIndex === -1) {
        reposMissingLicense.push(repoData);
      }
    }
  }

  return reposMissingLicense;
}

function addLicense(license, repoData) {
  return new Promise(async function(resolve, reject) {
    const repoClient = client.repo(repoData.full_name);
    const repoLicense = license.replace('COPYRIGHT_YEAR', new Date(repoData.created_at).getFullYear());

    repoClient.createContents('LICENSE.md', 'Adding missing license.', repoLicense, function(err, result) {
      if (err) console.log(repoData.full_name + ' failed to commit.')
      resolve(result);
    }); 
  });
}

async function addLicenseToRepos(license, repos) {
  repos = await repos;
  for (var repoData of repos) {
    await addLicense(license, repoData);
  }
}

addLicenseToRepos(
  license,
  getReposMissingLicense(organizations)
);
