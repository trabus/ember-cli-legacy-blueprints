'use strict';

var EOL                = require('os').EOL;
var setupTestHooks     = require('ember-cli-blueprint-test-helpers/lib/helpers/setup');
var BlueprintHelpers   = require('ember-cli-blueprint-test-helpers/lib/helpers/blueprint-helper');
var generateAndDestroy = BlueprintHelpers.generateAndDestroy;

describe('Acceptance: ember generate and destroy transform-test', function() {
  setupTestHooks(this);
  
  it('transform-test foo', function() {
    return generateAndDestroy(['transform-test', 'foo'], {
      files: [
        {
          file: 'tests/unit/transforms/foo-test.js',
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('transform:foo'"
          ]
        }
      ]
    });
  });

});