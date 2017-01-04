/* Take two folders as arguments and calculate the statistical differences between them. */
const fs = require('fs');
const path = require('path');

/* Read the command’s arguments */
const dir1 = process.argv[2];
const dir2 = process.argv[3];
console.info('First directory:', dir1);
console.info('Second directory:', dir2);

/* Get the contents of both folders */
const dir1Contents = fs.readdirSync(dir1);
const dir2Contents = fs.readdirSync(dir2);

/* Weed out any files that aren’t in both */
const fileNameFilter = ['canjs.json', 'documentjs.json', 'donejs.json', 'funcunit.json', 'jquerypp.json', 'steal-tools.json', 'steal.json', 'testee.json'];
const filenames = dir1Contents.filter(function(filename) {
  return dir2Contents.includes(filename);
}).filter(function(filename) {
  return fileNameFilter.includes(filename);
});
console.info('File names:', filenames.join(', '));

/* List of all the stats we collect */
const statNames = ['forks_count', 'stargazers_count', 'subscribers_count'];

/* Helper function for parsing a file as a GitHub API response */
const getInfoFromFileInDirectory = function(filename, directory) {
  const pathname = path.join(directory, filename);
  const fileContents = fs.readFileSync(pathname, 'utf8');
  const jsonObject = JSON.parse(fileContents);
  const info = {};
  statNames.forEach(function(statName) {
    info[statName] = jsonObject[statName];
  });
  return info;
};

/* Helper function for calculating the stats between two objects */
const getStatDifference = function(info1, info2) {
  const stats = {};
  statNames.forEach(function(statName) {
    const info1Value = info1[statName];
    const info2Value = info2[statName];
    stats[statName] = Math.round((info2Value - info1Value) / info1Value * 1000) / 10;
  });
  return stats;
};

/* Get the stats for each of the files */
const fileInfo = filenames.map(function(filename) {
  const fileInDir1 = getInfoFromFileInDirectory(filename, dir1);
  const fileInDir2 = getInfoFromFileInDirectory(filename, dir2);
  return {
    filename: filename,
    first: fileInDir1,
    second: fileInDir2,
    percentages: getStatDifference(fileInDir1, fileInDir2)
  };
});

const formatPercentage = function(percentage) {
  const sign = (percentage > 0) ? '+' : '';
  return sign + percentage + '%';
};

/* Print the results */
console.info('| Name | Forks | Stars | Subscribers |');
console.info('|-|-|-|-|');
fileInfo.forEach(function(stats) {
  const filename = stats.filename.replace('.json', '');
  const first = stats.first;
  const second = stats.second;
  const percentages = stats.percentages;
  const forks = `${formatPercentage(percentages.forks_count)} (${first.forks_count} -> ${second.forks_count})`;
  const stars = `${formatPercentage(percentages.stargazers_count)} (${first.stargazers_count} -> ${second.stargazers_count})`;
  const subscribers = `${formatPercentage(percentages.subscribers_count)} (${first.subscribers_count} -> ${second.subscribers_count})`;
  console.info(`| ${filename} | ${forks} | ${stars} | ${subscribers} |`);
});
