'use strict';

var EOL                = require('os').EOL;
var setupTestHooks     = require('ember-cli-blueprint-test-helpers/lib/helpers/setup');
var BlueprintHelpers   = require('ember-cli-blueprint-test-helpers/lib/helpers/blueprint-helper');
var generateAndDestroy = BlueprintHelpers.generateAndDestroy;

describe('Acceptance: ember generate and destroy adapter-test', function() {
  setupTestHooks(this);
  
  it('adapter-test foo', function() {
    return generateAndDestroy(['adapter-test', 'foo'], {
      files: [
        {
          file:'tests/unit/adapters/foo-test.js',
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('adapter:foo'"
          ]
        }
      ]
    });
  });
  
  it('in-addon adapter-test foo', function() {
    return generateAndDestroy(['adapter-test', 'foo'], {
      target: 'addon',
      files: [
        {
          file: 'tests/unit/adapters/foo-test.js',
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('adapter:foo'"
          ]
        },
        {
          file: 'app/adapter-test/foo.js',
          exists: false
        }
      ]
    });
  });
  
});