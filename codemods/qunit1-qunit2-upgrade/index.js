var exec = require('child_process').exec;


module.exports = {
	getOptions: function () {
		return [];
	},
	run: function (directory) {
		console.log("Running ...");

		return new Promise((resolve, reject) => {
			exec(`find . -type f -name '*-test.js' -exec sed -i '' 's/beforeEach:/beforeEachToReplace:/; s/afterEach:/afterEachToReplace:/'  {} +`, {
				cwd: directory
			}, (error, stdout, stderr) => {
				error ? reject(error) : resolve();
			});
		}).then(() => {
			return new Promise((resolve, reject) => {
				exec(`find . -type f -name '*_test.js' -exec sed -i '' 's/beforeEach:/beforeEachToReplace:/; s/afterEach:/afterEachToReplace:/'  {} +`, {
					cwd: directory
				}, (error, stdout, stderr) => {
					error ? reject(error) : resolve();
				});
			});
		}).then(() => {
			return new Promise((resolve, reject) => {
				exec(`find . -type f -name 'test.js' -exec sed -i '' 's/beforeEach:/beforeEachToReplace:/; s/afterEach:/afterEachToReplace:/'  {} +`, {
					cwd: directory
				}, (error, stdout, stderr) => {
					error ? reject(error) : resolve();
				});
			});
		}).then(() => {
			return new Promise((resolve, reject) => {
				exec('qunit-migrate "**/*-test.js" -w --no-jscs', {
					cwd: directory
				}, (error, stdout, stderr) => {
					error ? reject(error) : resolve();
				});
			});
		}).then(() => {
			return new Promise((resolve, reject) => {
				exec('qunit-migrate "**/*_test.js" -w --no-jscs', {
					cwd: directory
				}, (error, stdout, stderr) => {
					error ? reject(error) : resolve();
				});
			});
		}).then(() => {
			return new Promise((resolve, reject) => {
				exec('qunit-migrate "**/test-*.js" -w --no-jscs', {
					cwd: directory
				}, (error, stdout, stderr) => {
					error ? reject(error) : resolve();
				});
			});
		}).then(() => {
			return new Promise((resolve, reject) => {
				exec(`find . -type f -name '*-test.js' -exec sed -i '' 's/QUnit.deepEqual/assert.deepEqual/; s/QUnit.equal/assert.equal/; s/QUnit.notDeepEqual/assert.notDeepEqual/; s/QUnit.notEqual/assert.notEqual/; s/QUnit.notPropEqual/assert.notPropEqual/; s/QUnit.notStrictEqual/assert.notStrictEqual/; s/QUnit.ok/assert.ok/; s/QUnit.notOk/assert.notOk/; s/QUnit.propEqual/assert.propEqual/; s/QUnit.strictEqual/assert.strictEqual/; s/QUnit.throws/assert.throws/; s/stop()/var done = assert.async()/; s/QUnit.start()/done()/; s/start()/done()/;s/QUnit.done/done/;s/QUnit.stop()/var done = assert.async()/' {} +`, {
					cwd: directory
				}, (error, stdout, stderr) => {
					error ? reject(error) : resolve();
				});
			});
		}).then(() => {
			return new Promise((resolve, reject) => {
				exec(`find . -type f -name '*_test.js' -exec sed -i '' 's/QUnit.deepEqual/assert.deepEqual/; s/QUnit.equal/assert.equal/; s/QUnit.notDeepEqual/assert.notDeepEqual/; s/QUnit.notEqual/assert.notEqual/; s/QUnit.notPropEqual/assert.notPropEqual/; s/QUnit.notStrictEqual/assert.notStrictEqual/; s/QUnit.ok/assert.ok/; s/QUnit.notOk/assert.notOk/; s/QUnit.propEqual/assert.propEqual/; s/QUnit.strictEqual/assert.strictEqual/; s/QUnit.throws/assert.throws/; s/stop()/var done = assert.async()/; s/QUnit.start()/done()/; s/start()/done()/;s/QUnit.done/done/;s/QUnit.stop()/var done = assert.async()/' {} +`, {
					cwd: directory
				}, (error, stdout, stderr) => {
					error ? reject(error) : resolve();
				});
			});
		}).then(() => {
			return new Promise((resolve, reject) => {
				exec(`find . -type f -name 'test.js' -exec sed -i '' 's/QUnit.deepEqual/assert.deepEqual/; s/QUnit.equal/assert.equal/; s/QUnit.notDeepEqual/assert.notDeepEqual/; s/QUnit.notEqual/assert.notEqual/; s/QUnit.notPropEqual/assert.notPropEqual/; s/QUnit.notStrictEqual/assert.notStrictEqual/; s/QUnit.ok/assert.ok/; s/QUnit.notOk/assert.notOk/; s/QUnit.propEqual/assert.propEqual/; s/QUnit.strictEqual/assert.strictEqual/; s/QUnit.throws/assert.throws/; s/stop()/var done = assert.async()/; s/QUnit.start()/done()/; s/start()/done()/;s/QUnit.done/done/;s/QUnit.stop()/var done = assert.async()/' {} +`, {
					cwd: directory
				}, (error, stdout, stderr) => {
					error ? reject(error) : resolve();
				});
			});
		}).then(() => {
			return new Promise((resolve, reject) => {
				exec(`find . -type f -name 'test-*.js' -exec sed -i '' 's/QUnit.deepEqual/assert.deepEqual/; s/QUnit.equal/assert.equal/; s/QUnit.notDeepEqual/assert.notDeepEqual/; s/QUnit.notEqual/assert.notEqual/; s/QUnit.notPropEqual/assert.notPropEqual/; s/QUnit.notStrictEqual/assert.notStrictEqual/; s/QUnit.ok/assert.ok/; s/QUnit.notOk/assert.notOk/; s/QUnit.propEqual/assert.propEqual/; s/QUnit.strictEqual/assert.strictEqual/; s/QUnit.throws/assert.throws/; s/stop()/var done = assert.async()/; s/QUnit.start()/done()/; s/start()/done()/;s/QUnit.done/done/;s/QUnit.stop()/var done = assert.async()/' {} +`, {
					cwd: directory
				}, (error, stdout, stderr) => {
					error ? reject(error) : resolve();
				});
			});
		}).then(() => {
			return new Promise((resolve, reject) => {
				exec(`find . -type f -name '*-test.js' -exec sed -i '' 's/QUnit.log = dev.log/log = dev.log/; s/dev.log = QUnit.log/dev.log = log/; s/QUnit.done/done/' {} +`, {
					cwd: directory
				}, (error, stdout, stderr) => {
					error ? reject(error) : resolve();
				});
			});
		}).then(() => {
			return new Promise((resolve, reject) => {
				exec(`find . -type f -name '*_test.js' -exec sed -i '' 's/QUnit.log = dev.log/log = dev.log/; s/dev.log = QUnit.log/dev.log = log/; s/QUnit.done/done/' {} +`, {
					cwd: directory
				}, (error, stdout, stderr) => {
					error ? reject(error) : resolve();
				});
			});
		}).then(() => {
			return new Promise((resolve, reject) => {
				exec(`find . -type f -name 'test.js' -exec sed -i '' 's/QUnit.log = dev.log/log = dev.log/; s/dev.log = QUnit.log/dev.log = log/; s/QUnit.done/done/' {} +`, {
					cwd: directory
				}, (error, stdout, stderr) => {
					error ? reject(error) : resolve();
				});
			});
		}).then(() => {
			return new Promise((resolve, reject) => {
				exec(`find . -type f -name 'test-*.js' -exec sed -i '' 's/QUnit.log = dev.log/log = dev.log/; s/dev.log = QUnit.log/dev.log = log/; s/QUnit.done/done/' {} +`, {
					cwd: directory
				}, (error, stdout, stderr) => {
					error ? reject(error) : resolve();
				});
			});
		}).then(() => {
			return new Promise((resolve, reject) => {
				exec(`find . -type f -name '*-test.js' -exec sed -i '' 's/QUnit.var done = assert.async()/var done = assert.async()/' {} +`, {
					cwd: directory
				}, (error, stdout, stderr) => {
					error ? reject(error) : resolve();
				});
			});
		}).then(() => {
			return new Promise((resolve, reject) => {
				exec(`find . -type f -name '*_test.js' -exec sed -i '' 's/QUnit.var done = assert.async()/var done = assert.async()/' {} +`, {
					cwd: directory
				}, (error, stdout, stderr) => {
					error ? reject(error) : resolve();
				});
			});
		}).then(() => {
			return new Promise((resolve, reject) => {
				exec(`find . -type f -name 'test.js' -exec sed -i '' 's/QUnit.var done = assert.async()/var done = assert.async()/' {} +`, {
					cwd: directory
				}, (error, stdout, stderr) => {
					error ? reject(error) : resolve();
				});
			});
		}).then(() => {
			return new Promise((resolve, reject) => {
				exec(`find . -type f -name 'test-*.js' -exec sed -i '' 's/QUnit.var done = assert.async()/var done = assert.async()/' {} +`, {
					cwd: directory
				}, (error, stdout, stderr) => {
					error ? reject(error) : resolve();
				});
			});
		}).then(() => {
			return new Promise((resolve, reject) => {
				exec(`find . -name package.json -exec sed -i ''  's/"steal-qunit": "[^"]*"/"steal-qunit": "^2.0.0"/' {} +`, {
					cwd: directory
				}, function (error, stdout, stderr) {
					error ? reject(error) : resolve();
				});
			});
		}).then(() => {
			return new Promise((resolve, reject) => {
				exec("find . -type f -name '*-test.js' -exec sed -i ''  's/\\(canTestHelpers.*\\)function[[:blank:]]*()/\\1function(assert)/' {} +", {
					cwd: directory
				}, function (error, stdout, stderr) {
					error ? reject(error) : resolve();
				});
			});
		}).then(() => {
			return new Promise((resolve, reject) => {
				exec("find . -type f -name '*_test.js' -exec sed -i ''  's/\\(canTestHelpers.*\\)function[[:blank:]]*()/\\1function(assert)/' {} +", {
					cwd: directory
				}, function (error, stdout, stderr) {
					error ? reject(error) : resolve();
				});
			});
		}).then(() => {
			return new Promise((resolve, reject) => {
				exec("find . -type f -name 'test.js' -exec sed -i ''  's/\\(canTestHelpers.*\\)function[[:blank:]]*()/\\1function(assert)/' {} +", {
					cwd: directory
				}, function (error, stdout, stderr) {
					error ? reject(error) : resolve();
				});
			});
		}).then(() => {
			return new Promise((resolve, reject) => {
				exec("find . -type f -name 'test-*.js' -exec sed -i ''  's/\\(canTestHelpers.*\\)function[[:blank:]]*()/\\1function(assert)/' {} +", {
					cwd: directory
				}, function (error, stdout, stderr) {
					error ? reject(error) : resolve();
				});
			});
		}).then(() => {
			return new Promise((resolve, reject) => {
				exec(`find . -type f -name '*-test.js' -exec sed -i ''  's/[.]done/.start/' {} +`, {
					cwd: directory
				}, function (error, stdout, stderr) {
					error ? reject(error) : resolve();
				});
			});
		}).then(() => {
			return new Promise((resolve, reject) => {
				exec(`find . -type f -name '*_test.js' -exec sed -i ''  's/[.]done/.start/' {} +`, {
					cwd: directory
				}, function (error, stdout, stderr) {
					error ? reject(error) : resolve();
				});
			});
		}).then(() => {
			return new Promise((resolve, reject) => {
				exec(`find . -type f -name 'test.js' -exec sed -i ''  's/[.]done/.start/' {} +`, {
					cwd: directory
				}, function (error, stdout, stderr) {
					error ? reject(error) : resolve();
				});
			});
		}).then(() => {
			return new Promise((resolve, reject) => {
				exec(`find . -type f -name 'test-*.js' -exec sed -i ''  's/[.]done/.start/' {} +`, {
					cwd: directory
				}, function (error, stdout, stderr) {
					error ? reject(error) : resolve();
				});
			});
		}).then(() => {
			return new Promise((resolve, reject) => {
				exec(`find . -type f -name '*-test.js' -exec sed -i ''  's/[.]var done = assert.async/.stop/' {} +`, {
					cwd: directory
				}, function (error, stdout, stderr) {
					error ? reject(error) : resolve();
				});
			});
		}).then(() => {
			return new Promise((resolve, reject) => {
				exec(`find . -type f -name '*_test.js' -exec sed -i ''  's/[.]var done = assert.async/.stop/' {} +`, {
					cwd: directory
				}, function (error, stdout, stderr) {
					error ? reject(error) : resolve();
				});
			});
		}).then(() => {
			return new Promise((resolve, reject) => {
				exec(`find . -type f -name 'test.js' -exec sed -i ''  's/[.]var done = assert.async/.stop/' {} +`, {
					cwd: directory
				}, function (error, stdout, stderr) {
					error ? reject(error) : resolve();
				});
			});
		}).then(() => {
			return new Promise((resolve, reject) => {
				exec(`find . -type f -name 'test-*.js' -exec sed -i ''  's/[.]var done = assert.async/.stop/' {} +`, {
					cwd: directory
				}, function (error, stdout, stderr) {
					error ? reject(error) : resolve();
				});
			});
		}).then(() => {
			return new Promise((resolve, reject) => {
				exec("find . -type f -name '*-test.js' -exec sed -i ''  's/\\(testIfRealDocument.*\\)function[[:blank:]]*()/\\1function(assert)/' {} +", {
					cwd: directory
				}, function (error, stdout, stderr) {
					error ? reject(error) : resolve();
				});
			});
		}).then(() => {
			return new Promise((resolve, reject) => {
				exec("find . -type f -name '*_test.js' -exec sed -i ''  's/\\(testIfRealDocument.*\\)function[[:blank:]]*()/\\1function(assert)/' {} +", {
					cwd: directory
				}, function (error, stdout, stderr) {
					error ? reject(error) : resolve();
				});
			});
		}).then(() => {
			return new Promise((resolve, reject) => {
				exec("find . -type f -name 'test.js' -exec sed -i ''  's/\\(testIfRealDocument.*\\)function[[:blank:]]*()/\\1function(assert)/' {} +", {
					cwd: directory
				}, function (error, stdout, stderr) {
					error ? reject(error) : resolve();
				});
			});
		}).then(() => {
			return new Promise((resolve, reject) => {
				exec("find . -type f -name 'test-*.js' -exec sed -i ''  's/\\(testIfRealDocument.*\\)function[[:blank:]]*()/\\1function(assert)/' {} +", {
					cwd: directory
				}, function (error, stdout, stderr) {
					error ? reject(error) : resolve();
				});
			});
		}).then(() => {
			return new Promise((resolve, reject) => {
				exec(`find . -type f -name '*-test.js' -exec sed -i '' 's/beforeEachToReplace:/beforeEach:/; s/afterEachToReplace:/afterEach:/'  {} +`, {
					cwd: directory
				}, (error, stdout, stderr) => {
					error ? reject(error) : resolve();
				});
			});
		}).then(() => {
			return new Promise((resolve, reject) => {
				exec(`find . -type f -name '*_test.js' -exec sed -i '' 's/beforeEachToReplace:/beforeEach:/; s/afterEachToReplace:/afterEach:/'  {} +`, {
					cwd: directory
				}, (error, stdout, stderr) => {
					error ? reject(error) : resolve();
				});
			});
		}).then(() => {
			return new Promise((resolve, reject) => {
				exec(`find . -type f -name 'test.js' -exec sed -i '' 's/beforeEachToReplace:/beforeEach:/; s/afterEachToReplace:/afterEach:/'  {} +`, {
					cwd: directory
				}, (error, stdout, stderr) => {
					error ? reject(error) : resolve();
				});
			});
		}).then(() => {
			return new Promise((resolve, reject) => {
				exec(`find . -type f -name 'test-*.js' -exec sed -i '' 's/beforeEachToReplace:/beforeEach:/; s/afterEachToReplace:/afterEach:/'  {} +`, {
					cwd: directory
				}, (error, stdout, stderr) => {
					error ? reject(error) : resolve();
				});
			});
		}).then(() => {
			return new Promise((resolve, reject) => {
				exec("find . -type f -name '*-test.js' -exec sed -i ''  's/\\(testHelpers.*\\)function[[:blank:]]*()/\\1function (assert)/g' {} +", {
					cwd: directory
				}, function (error, stdout, stderr) {
					error ? reject(error) : resolve();
				});
			});
		}).then(() => {
			return new Promise((resolve, reject) => {
				exec("find . -type f -name '*_test.js' -exec sed -i ''  's/\\(testHelpers.*\\)function[[:blank:]]*()/\\1function (assert)/g' {} +", {
					cwd: directory
				}, function (error, stdout, stderr) {
					error ? reject(error) : resolve();
				});
			});
		}).then(() => {
			return new Promise((resolve, reject) => {
				exec("find . -type f -name 'test.js' -exec sed -i ''  's/\\(testHelpers.*\\)function[[:blank:]]*()/\\1function (assert)/g' {} +", {
					cwd: directory
				}, function (error, stdout, stderr) {
					error ? reject(error) : resolve();
				});
			});
		}).then(() => {
			return new Promise((resolve, reject) => {
				exec("find . -type f -name 'test-*.js' -exec sed -i ''  's/\\(testHelpers.*\\)function[[:blank:]]*()/\\1function (assert)/g' {} +", {
					cwd: directory
				}, function (error, stdout, stderr) {
					error ? reject(error) : resolve();
				});
			});
		}).then(() => {
			return new Promise((resolve, reject) => {
				exec(`find . -type f -name '*-test.js' -exec sed -i '' 's/var QUnit.log/var log/' {} +`, {
					cwd: directory
				}, (error, stdout, stderr) => {
					error ? reject(error) : resolve();
				});
			});
		}).then(() => {
			return new Promise((resolve, reject) => {
				exec(`find . -type f -name '*_test.js' -exec sed -i '' 's/var QUnit.log/var log/' {} +`, {
					cwd: directory
				}, (error, stdout, stderr) => {
					error ? reject(error) : resolve();
				});
			});
		}).then(() => {
			return new Promise((resolve, reject) => {
				exec(`find . -type f -name 'test.js' -exec sed -i '' 's/var QUnit.log/var log/' {} +`, {
					cwd: directory
				}, (error, stdout, stderr) => {
					error ? reject(error) : resolve();
				});
			});
		}).then(() => {
			return new Promise((resolve, reject) => {
				exec(`find . -type f -name 'test-*.js' -exec sed -i '' 's/var QUnit.log/var log/' {} +`, {
					cwd: directory
				}, (error, stdout, stderr) => {
					error ? reject(error) : resolve();
				});
			});
		});
	}
};