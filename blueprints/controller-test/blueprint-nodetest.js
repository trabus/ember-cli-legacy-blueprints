'use strict';

var EOL                = require('os').EOL;
var setupTestHooks     = require('ember-cli-blueprint-test-helpers/lib/helpers/setup');
var BlueprintHelpers   = require('ember-cli-blueprint-test-helpers/lib/helpers/blueprint-helper');
var generateAndDestroy = BlueprintHelpers.generateAndDestroy;

describe('Acceptance: ember generate and destroy controller-test', function() {
  setupTestHooks(this);
  
  it('controller-test foo', function() {
    return generateAndDestroy(['controller-test', 'foo'], {
      files: [
        {
          file: 'tests/unit/controllers/foo-test.js', 
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('controller:foo'"
          ]
        },
      ]
    });
  });

});