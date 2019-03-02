const assert = require("assert");
const supermod = require("./index");

const before = `
[![Join the chat at https://gitter.im/canjs/canjs](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/canjs/canjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
`;

const after = `
[![Join our Slack](https://img.shields.io/badge/slack-join%20chat-611f69.svg)](https://www.bitovi.com/community/slack?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Join our Discourse](https://img.shields.io/discourse/https/forums.bitovi.com/posts.svg)](https://forums.bitovi.com/?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
`;

describe("replaceGitterBadgeInText function", function() {
  it("replaces gitter badge", function() {
    const results = supermod.replaceGitterBadgeInText(before);
    assert.deepStrictEqual(results, after);
  });
});
