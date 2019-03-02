const assert = require("assert");
const supermod = require("./index");

const canFragmentContents = `# can-fragment

[![Build Status](https://travis-ci.org/canjs/can-fragment.svg?branch=master)](https://travis-ci.org/canjs/can-fragment)

Create document fragments from lots of things

## Usage

### ES6 use

With StealJS, you can import this module directly in a template that is autorendered:

\`\`\`js
import plugin from 'can-fragment';
\`\`\`

### CommonJS use

Use \`require\` to load \`can-fragment\` and everything else
needed to create a template that uses \`can-fragment\`:

\`\`\`js
var plugin = require("can-fragment");
\`\`\`

### Standalone use

Load the \`global\` version of the plugin:

\`\`\`html
<script src='./node_modules/can-fragment/dist/global/can-fragment.js'></script>
\`\`\`
`;

const canFragmentResults = `# can-fragment

[![Join our Slack](https://img.shields.io/badge/slack-join%20chat-611f69.svg)](https://www.bitovi.com/community/slack?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Join our Discourse](https://img.shields.io/discourse/https/forums.bitovi.com/posts.svg)](https://forums.bitovi.com/?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/canjs/can-fragment/blob/master/LICENSE)
[![npm version](https://badge.fury.io/js/can-fragment.svg)](https://www.npmjs.com/package/can-fragment)
[![Travis build status](https://travis-ci.org/canjs/can-fragment.svg?branch=master)](https://travis-ci.org/canjs/can-fragment)
[![AppVeyor build status](https://ci.appveyor.com/api/projects/status/github/canjs/can-fragment?branch=master&svg=true)](https://ci.appveyor.com/project/matthewp/can-fragment)
[![Coverage status](https://coveralls.io/repos/github/canjs/can-fragment/badge.svg?branch=master)](https://coveralls.io/github/canjs/can-fragment?branch=master)
[![Greenkeeper badge](https://badges.greenkeeper.io/canjs/can-fragment.svg)](https://greenkeeper.io/)

Create document fragments from lots of things

## Documentation

Read the [can-fragment API docs on CanJS.com](https://canjs.com/doc/can-fragment.html).

## Changelog

See the [latest releases on GitHub](https://github.com/canjs/can-fragment/releases).

## Contributing

The [contribution guide](https://github.com/canjs/can-fragment/blob/master/CONTRIBUTING.md) has information on getting help, reporting bugs, developing locally, and more.

## License

[MIT](https://github.com/canjs/can-fragment/blob/master/LICENSE)
`;

describe("getReadme function", function() {
  it("updates default readmes", function() {
    const results = supermod.getReadme({name: 'can-fragment', description: 'Create a fragment from lots of stuff'}, canFragmentContents, 'LICENSE');
    assert.deepStrictEqual(results, canFragmentResults);
  });
});
