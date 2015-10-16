'use strict';

var EOL                = require('os').EOL;
var setupTestHooks     = require('ember-cli-blueprint-test-helpers/lib/helpers/setup');
var BlueprintHelpers   = require('ember-cli-blueprint-test-helpers/lib/helpers/blueprint-helper');
var generateAndDestroy = BlueprintHelpers.generateAndDestroy;

describe('Acceptance: ember generate and destroy component-addon', function() {
  setupTestHooks(this);
  
  it('component-addon foo-bar', function() {
    // pass any additional command line options in the arguments array
    return generateAndDestroy(['component-addon', 'foo-bar'], {
      target: 'addon',
      // define files to assert, and their contents
      files: [
        { file: 'app/component/foo-bar.js', contents: ['foo']}
      ]
    });
  });

});