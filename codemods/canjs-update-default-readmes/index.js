var fs = require('fs');
var path = require('path');
var MODULE_DESC_REGEX = /<code>__can-.+__ <\/code>\n(.+)/m;
var FALLBACK_MODULE_DESC_REGEX = /(?=\n[a-z]|\n[A-Z])\n(.+)/m

module.exports = {
	getOptions: function () {
		return [];
	},

	getReadme,

	run: function (directory, opts) {
		var package = require(path.join(directory, 'package.json'));
		var name = package.name;
		return Promise.all([
			getMDFileByName(directory, 'readme'),
			getMDFileByName(directory, 'license')
		]).then(([readme, license]) => {
			if (!license) {
				console.error(`No license was not found at ${name}`);
				return Promise.resolve();
			}
			return new Promise(function (resolve, reject) {
				if (!readme) {
					readme = path.join(directory, 'README.md');
					return resolve('');
				}
				fs.readFile(readme, {encoding: 'utf8'}, function (error, text) {
					error ? reject(error) : resolve(text);
				});
			}).then(function (text) {
				var readme = getReadme(package, text, path.basename(license));
				if (readme === text) {
					console.error('readme is already updated.');
				}
				return readme;
			}).then(function (newText) {
				return new Promise(function (resolve, reject) {
					fs.writeFile(readme, newText, function (error) {
						error ? reject(error) : resolve();
					});
				});
			});
		});
	}
};

function getReadme(package, originalReadme, license){

	var moduleName = package.name;
	var matches = originalReadme.match(MODULE_DESC_REGEX);
	var desc;

	if(matches && matches[1]){
		desc = matches[1];
	}else{
		matches = originalReadme.match(FALLBACK_MODULE_DESC_REGEX);
		if(matches && matches[1] || package.description){
			desc = matches && matches[1] || package.description;
		}else{
			console.error(`Failed to parse original description of ${moduleName}!`);
			desc = 'FAILED TO GET DESCRIPTION';
		}
	}

	return `# ${moduleName}

[![Join our Slack](https://img.shields.io/badge/slack-join%20chat-611f69.svg)](https://www.bitovi.com/community/slack?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Join our Discourse](https://img.shields.io/discourse/https/forums.bitovi.com/posts.svg)](https://forums.bitovi.com/?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/canjs/${moduleName}/blob/master/${license})
[![npm version](https://badge.fury.io/js/${moduleName}.svg)](https://www.npmjs.com/package/${moduleName})
[![Travis build status](https://travis-ci.org/canjs/${moduleName}.svg?branch=master)](https://travis-ci.org/canjs/${moduleName})
[![AppVeyor build status](https://ci.appveyor.com/api/projects/status/github/canjs/${moduleName}?branch=master&svg=true)](https://ci.appveyor.com/project/matthewp/${moduleName})
[![Coverage status](https://coveralls.io/repos/github/canjs/${moduleName}/badge.svg?branch=master)](https://coveralls.io/github/canjs/${moduleName}?branch=master)
[![Greenkeeper badge](https://badges.greenkeeper.io/canjs/${moduleName}.svg)](https://greenkeeper.io/)

${desc}

## Documentation

Read the [${moduleName} API docs on CanJS.com](https://canjs.com/doc/${moduleName}.html).

## Changelog

See the [latest releases on GitHub](https://github.com/canjs/${moduleName}/releases).

## Contributing

The [contribution guide](https://github.com/canjs/${moduleName}/blob/master/CONTRIBUTING.md) has information on getting help, reporting bugs, developing locally, and more.

## License

[MIT](https://github.com/canjs/${moduleName}/blob/master/${license})
`;

}

function getMDFileByName(directory, name){
	return new Promise((resolve, reject) => {
		fs.readdir(directory, (err, files) => {
			if(err) return reject(err);
			var fileName = files.find(item => {
				item = item.toLowerCase();
				return item.startsWith(name) && (item.endsWith('md') || item.endsWith('markdown')) || item === name;
			});
			resolve(fileName ? path.join(directory, fileName) : null);
		});
	});
}
