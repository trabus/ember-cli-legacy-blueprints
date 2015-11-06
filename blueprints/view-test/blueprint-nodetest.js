'use strict';

var EOL                = require('os').EOL;
var setupTestHooks     = require('ember-cli-blueprint-test-helpers/lib/helpers/setup');
var BlueprintHelpers   = require('ember-cli-blueprint-test-helpers/lib/helpers/blueprint-helper');
var generateAndDestroy = BlueprintHelpers.generateAndDestroy;

describe('Acceptance: ember generate and destroy view-test', function() {
  setupTestHooks(this);
  
  it('view-test foo', function() {
    return generateAndDestroy(['view-test', 'foo'], {
      files: [
        {
          file: 'tests/unit/views/foo-test.js',
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('view:foo'"
          ]
        }
      ]
    });
  });
  
  it('in-addon view-test foo', function() {
    return generateAndDestroy(['view-test', 'foo'], {
      target: 'addon',
      files: [
        {
          file: 'tests/unit/views/foo-test.js',
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('view:foo'"
          ]
        }
      ]
    });
  });
  
});