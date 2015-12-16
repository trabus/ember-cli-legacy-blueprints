'use strict';

var EOL                = require('os').EOL;
var setupTestHooks     = require('ember-cli-blueprint-test-helpers/lib/helpers/setup');
var BlueprintHelpers   = require('ember-cli-blueprint-test-helpers/lib/helpers/blueprint-helper');
var generateAndDestroy = BlueprintHelpers.generateAndDestroy;

describe('Acceptance: ember generate and destroy model-test', function() {
  setupTestHooks(this);
  
  it('model-test foo', function() {
    return generateAndDestroy(['model-test', 'foo'], {
      files: [
        {
          file:'tests/unit/models/foo-test.js',
          contains: [
            "import { moduleForModel, test } from 'ember-qunit';",
            "moduleForModel('foo'",
            "needs: []"
          ]
        }
      ]
    });
  });
  
  it('in-addon model-test foo', function() {
    return generateAndDestroy(['model-test', 'foo'], {
      target: 'addon',
      files: [
        {
          file: 'tests/unit/models/foo-test.js',
          contains: [
            "import { moduleForModel, test } from 'ember-qunit';",
            "moduleForModel('foo'"
          ]
        }
      ]
    });
  });
  
  it('dummy model-test foo', function() {
    return generateAndDestroy(['model-test', 'foo', '--dummy'], {
      target: 'addon',
      files: [
        {
          file: 'tests/unit/models/foo-test.js',
          contains: [
            "import { moduleForModel, test } from 'ember-qunit';",
            "moduleForModel('foo'"
          ]
        },
        {
          file: 'app/model-test/foo.js',
          exists: false
        }
      ]
    });
  });
  
});