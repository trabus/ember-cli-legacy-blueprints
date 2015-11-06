'use strict';

var EOL                = require('os').EOL;
var setupTestHooks     = require('ember-cli-blueprint-test-helpers/lib/helpers/setup');
var BlueprintHelpers   = require('ember-cli-blueprint-test-helpers/lib/helpers/blueprint-helper');
var generateAndDestroy = BlueprintHelpers.generateAndDestroy;

describe('Acceptance: ember generate and destroy service-test', function() {
  setupTestHooks(this);
  
  it('service-test foo', function() {
    return generateAndDestroy(['service-test', 'foo'], {
      files: [
        {
          file: 'tests/unit/services/foo-test.js',
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('service:foo'"
          ]
        }
      ]
    });
  });
  
  it('in-addon service-test foo', function() {
    return generateAndDestroy(['service-test', 'foo'], {
      target: 'addon',
      files: [
        {
          file: 'tests/unit/services/foo-test.js',
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('service:foo'"
          ]
        },
        {
          file: 'app/service-test/foo.js',
          exists: false 
        }
      ]
    });
  });

});