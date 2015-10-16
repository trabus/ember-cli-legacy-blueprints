'use strict';

var EOL                = require('os').EOL;
var setupTestHooks     = require('ember-cli-blueprint-test-helpers/lib/helpers/setup');
var BlueprintHelpers   = require('ember-cli-blueprint-test-helpers/lib/helpers/blueprint-helper');
var generateAndDestroy = BlueprintHelpers.generateAndDestroy;

describe('Acceptance: ember generate and destroy initializer-addon', function() {
  setupTestHooks(this, {timeout: 1000});

  it('initializer-addon foo', function() {
    // pass any additional command line options in the arguments array
    return generateAndDestroy(['initializer-addon', 'foo'], {
      // define files to assert, and their contents
      target: 'addon',
      files: [
        { 
          file: 'app/initializer/foo.js', 
          contents: ['foo']
        }
      ]
    });
  });

});