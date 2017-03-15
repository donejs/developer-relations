/* Takes a GitHub Access Token and organization as arguments and prompts you to update the labels in each repository. */
const fs = require('fs');
const github = require('octonode');
const githubLabelSync = require('github-label-sync');
const labels = JSON.parse(fs.readFileSync('./labels.json', 'utf8'));
const readline = require('readline');

/* Read the command’s arguments */
const accessToken = process.argv[2];// Required
const organizationName = process.argv[3];// Required
if (!accessToken) {
  throw new Error('No access token provided; please include it as the first argument to this script.');
}
if (!organizationName) {
  throw new Error('No organization name provided; please include it as the second argument to this script.');
}

/* Support specifying a repository name */
if (organizationName.includes('/')) {
  syncRepo(organizationName);

} else {

  /* Get a list of repositories for a given org */
  const githubClient = github.client(accessToken);
  const githubOrg = githubClient.org(organizationName);
  githubOrg.repos(function(error, repos) {
    if (error) {
      console.error('Error retrieving repos:', error);
    } else {
      const repoNames = repos.map(function(repo) {
        return repo.full_name;
      });
      let result = Promise.resolve();
      repoNames.forEach(function(repoName) {
        result = result.then(function() {
          return new Promise(function(resolve, reject) {
            syncRepo(repoName).then(resolve, reject);
          });
        }, function(error) {
          console.error('Error syncing labels:', error);
        });
      });
    }
  });

}

function syncRepo(repo) {

  /* Options to pass to github-label-sync */
  const syncOptions = {
    accessToken,
    allowAddedLabels: true,
    dryRun: true,
    labels,
    repo
  };

  return new Promise(function(resolve, reject) {

      /* Dry run */
      console.info(`Dry run for ${repo}…`);
      githubLabelSync(syncOptions).then(function(diff) {
        if (!diff || diff.length === 0) {
          console.info(`Dry run for ${repo} returned no potential changes.`);
          resolve(0);
          return;
        }

        console.info(`Potential changes for ${repo}:`, diff);

        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout
        });

        /* Prompt to actually execute the changes */
        rl.question(`Execute the changes for ${repo}? (yes or no) `, (answer) => {

          /* Answered yes, so execute the changes */
          if (answer === 'yes') {
            console.info(`Executing the changes for ${repo}…`);

            syncOptions.dryRun = false;

            githubLabelSync(syncOptions).then(function(diff) {
              console.info(`Executed changes for ${repo}:`, diff);
              resolve(diff && diff.length);
            }, reject);

          } else {
            console.info(`Did not execute the changes for ${repo}.`);
            resolve(0);
          }

          rl.close();
        });

      }, reject);

  });
}
