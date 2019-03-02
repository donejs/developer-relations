var fs = require('fs');
var path = require('path');

module.exports = {
	getOptions: function () {
		return [];
	},

	replaceGitterBadgeInText,

	run: function (directory, opts) {
		return Promise.all([
			getMDFileByName(directory, 'readme')
		]).then(([readme]) => {
			return new Promise(function (resolve, reject) {
				if (!readme) {
					readme = path.join(directory, 'README.md');
					return resolve('');
				}
				fs.readFile(readme, {encoding: 'utf8'}, function (error, text) {
					error ? reject(error) : resolve(text);
				});
			}).then(function (text) {
				var readme = replaceGitterBadgeInText(text);
				if (readme === text) {
					console.error('README is already updated.');
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

function replaceGitterBadgeInText(text) {
	return text.replace(
		'[![Join the chat at https://gitter.im/canjs/canjs](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/canjs/canjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)',
		`[![Join our Slack](https://img.shields.io/badge/slack-join%20chat-611f69.svg)](https://www.bitovi.com/community/slack?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Join our Discourse](https://img.shields.io/discourse/https/forums.bitovi.com/posts.svg)](https://forums.bitovi.com/?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)`
	);
}
