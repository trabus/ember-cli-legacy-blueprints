'use strict';

var EOL                = require('os').EOL;
var setupTestHooks     = require('ember-cli-blueprint-test-helpers/lib/helpers/setup');
var BlueprintHelpers   = require('ember-cli-blueprint-test-helpers/lib/helpers/blueprint-helper');
var generateAndDestroy = BlueprintHelpers.generateAndDestroy;

describe('Acceptance: ember generate and destroy util-test', function() {
  setupTestHooks(this);
  
  it('util-test foo-bar', function() {
    return generateAndDestroy(['util-test', 'foo-bar'], {
      files: [
        {
          file: 'tests/unit/utils/foo-bar-test.js',
          contains: [
            "import fooBar from '../../../utils/foo-bar';"
          ]
        }
      ]
    });
  });
  
  it('in-addon util-test foo-bar', function() {
    return generateAndDestroy(['util-test', 'foo-bar'], {
      target: 'addon',
      files: [
        {
          file: 'tests/unit/utils/foo-bar-test.js',
          contains: [
            "import fooBar from '../../../utils/foo-bar';"
          ]
        }
      ]
    });
  });
  
});