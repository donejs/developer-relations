const assert = require("assert");
const supermod = require("./index");

const canAjaxContents = `'use strict';

var Global = require("can-globals/global/global");
var param = require("can-param");

/**
 * @module {function} can-ajax can-ajax
 * @parent can-infrastructure
 *
 * Make an asynchronous HTTP (AJAX) request.
 *
 * @signature \`ajax( ajaxOptions )\``;

const canAjaxResults = `'use strict';

var Global = require("can-globals/global/global");
var param = require("can-param");

/**
 * @module {function} can-ajax can-ajax
 * @parent can-js-utilities
 * @collection can-infrastructure
 *
 * Make an asynchronous HTTP (AJAX) request.
 *
 * @signature \`ajax( ajaxOptions )\``;

const canComponentContents = `@module {constructor} can-component can-component
@test can/component/test.html
@parent can-core
@link ../docco/component/component.html docco`;

const canComponentResults = `@module {constructor} can-component can-component
@test can/component/test.html
@parent can-views
@collection can-core
@link ../docco/component/component.html docco`;

describe("updateFileContents function", function() {
  it("can update docs in comments", function() {
    const results = supermod.updateFileContents(canComponentContents, 'can-component');
    assert.deepStrictEqual(results, canComponentResults);
  });
  it("can update docs in markdown", function() {
    const results = supermod.updateFileContents(canAjaxContents, 'can-ajax');
    assert.deepStrictEqual(results, canAjaxResults);
  });
});
