/* Takes a GitHub Access Token, organization, start date, and end date as arguments */
const github = require('octonode');

/* List of contributors to exclude from the output */
const coreContributors = [
  'chasenlehara',
  'cherifGsoul',
  'greenkeeperio-bot',
  'justinbmeyer',
  'kdillon',
  'matthewp',
  'phillipskevin',
  'pYr0x'
];

/* Read the command’s arguments */
const authorizationToken = process.argv[2];// Required
if (!authorizationToken) {
  throw new Error('No authorization token provided; please include it as the first argument to this script.');
}
const organizationName = process.argv[3];// Required
if (!organizationName) {
  throw new Error('No organization name provided; please include it as the second argument to this script.');
}
const startDateString = process.argv[4];// Required
const startDateParsed = Date.parse(startDateString);
if (!startDateParsed) {
  throw new Error('No start date provided; please include it as the third argument to this script.');
}
const endDateString = process.argv[5];// Required
const endDateParsed = Date.parse(endDateString);
if (!endDateParsed) {
  throw new Error('No end date provided; please include it as the fourth argument to this script.');
}
if (endDateParsed <= startDateParsed) {
  throw new Error('Invalid start and end dates.');
}

/* Create the start and end as Date objects */
const endDate = addDayToDate(new Date(endDateParsed));// The argument is the last day, so add one day
const startDate = new Date(startDateParsed);

/* Get a list of repositories for a given org */
const githubClient = github.client(authorizationToken);
const githubOrg = githubClient.org(organizationName);
const reposCallOptions = {
  page: 1,
  per_page: 100
};
const repoNames = [];// This will keep a list of all the repo names

/* Support specifying a repository name */
if (organizationName.includes('/')) {
  getPullRequestsForRepos([organizationName]);
} else {
  githubOrg.repos(reposCallOptions, reposCallback);// First page fetch
}

/* Adds one day to a given date */
function addDayToDate(date) {
  date.setDate(date.getDate() + 1);
  return date;
}

/* Given a repo name, return a Promise for all the PRs in that repo */
function getPullRequestsForRepo(repo) {
  const prsOptions = {
    page: 1,
    per_page: 100,
    state: 'closed'
  };

  return new Promise(function(resolve, reject) {
      console.info(`Getting pull requests for ${repo}…`);
      const githubRepo = githubClient.repo(repo);
      githubRepo.prs(prsOptions, function(error, pullRequests) {
        if (error) {
          reject(error);
        } else {

          // Filter out any PRs not created in our date range or created by other users, like bots
          const mergedPRs = pullRequests.filter(function(pullRequest) {
            const createdDate = Date.parse(pullRequest.created_at);
            const dateIsInRange = createdDate >= startDate && createdDate < endDate;
            return dateIsInRange && pullRequest.user.type === 'User';
          });

          // If the number of returned PRs is the max limit…
          if (pullRequests.length === prsOptions.per_page) {
            const lastPR = pullRequests[pullRequests.length - 1];
            // …check to see if the last PR is in the range…
            if (Date.parse(lastPR.created_at) >= startDateParsed) {
              // …if it is, then we might have missed some PRs and we should write code to handle this case
              reject(new Error(`Last PR in ${repo} is after the start date: ${lastPR.created_at}`));
            }
          }

          console.info(`Retrieved ${mergedPRs.length} pull requests for ${repo}`);
          resolve(mergedPRs);
        }
      });
  });
}

/* Given a list of repository names, get all the PRs for those repos */
function getPullRequestsForRepos(repoNames) {
  console.info(`Getting pull requests for ${repoNames.length} repositories.`);
  let result = Promise.resolve();

  // Iterate through all the repository names one-by-one…
  const prPromises = repoNames.map(function(repoName) {
    // …get the pull requests for each repo…
    return getPullRequestsForRepo(repoName);
  });
  Promise.all(prPromises).then(function(results) {

    // …combine the results into one array…
    const mergedPRs = results.reduce(function(a, b) {
      return a.concat(b);
    }, []);
    console.info(`Getting names from ${repoNames.length} pull requests.`);

    // …map those to user names…
    const users = Array.from(new Set(mergedPRs.map(function(pullRequest) {
      return pullRequest.user.login;
    })));
    console.info(`${users.length} total contributors.`);

    // …filter out the core team…
    const outsideContributors = users.filter(function(user) {
      return coreContributors.includes(user) === false;
    });
    console.info(`${outsideContributors.length} outside contributors to ${organizationName}:`);

    // …get each contributor’s info…
    outsideContributors.forEach(function(user) {
      githubClient.get(`/users/${user}`, {}, function(error, status, userInfo, headers) {
        if (error) {
          console.error(`Error getting info for ${user}:`, error);
        } else {
          let searchURL = '';
          if (organizationName.includes('/')) {
            searchURL = `https://github.com/${organizationName}/pulls?s=created&o=asc&q=is%3Apr+is%3Aclosed+created%3A${startDateString}..${endDateString}`;
          } else {
            searchURL = `https://github.com/search?utf8=%E2%9C%93&s=created&o=asc&q=author%3A${userInfo.login}%20org%3A${organizationName}+is%3Apr+is%3Aclosed+created%3A${startDateString}..${endDateString}`;
          }
          console.info(`
${userInfo.name}:
${userInfo.html_url}
${searchURL}`);
        }
      });
    });
  }, function(error) {
    console.error('Error getting pull requests:', error);
  });
}

/* Handle the response to getting all the repos for an org */
function reposCallback(error, repos) {
  if (error) {
    console.error('Error retrieving repos:', error);
  } else {

    // Add all the repo names to repoNames
    repoNames.push.apply(repoNames, repos.map(function(repo) {
      return repo.full_name;
    }));

    // If the number of repos returned by the API is the same
    // as our limit, then we need to fetch the next page.
    if (repos.length === reposCallOptions.per_page) {
      reposCallOptions.page += 1;
      githubOrg.repos(reposCallOptions, reposCallback);

    } else {// Done fetching the repo names
      getPullRequestsForRepos(repoNames);
    }
  }
}
