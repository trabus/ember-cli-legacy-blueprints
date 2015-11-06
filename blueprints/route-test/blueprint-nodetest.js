'use strict';

var EOL                = require('os').EOL;
var setupTestHooks     = require('ember-cli-blueprint-test-helpers/lib/helpers/setup');
var BlueprintHelpers   = require('ember-cli-blueprint-test-helpers/lib/helpers/blueprint-helper');
var generateAndDestroy = BlueprintHelpers.generateAndDestroy;

describe('Acceptance: ember generate and destroy route-test', function() {
  setupTestHooks(this);
  
  it('route-test foo', function() {
    return generateAndDestroy(['route-test', 'foo'], {
      files: [
        {
          file: 'tests/unit/routes/foo-test.js',
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('route:foo'"
          ]
        }
      ]
    });
  });
  
  it('in-addon route-test foo', function() {
    return generateAndDestroy(['route-test', 'foo'], {
      target: 'addon',
      files: [
        {
          file: 'tests/unit/routes/foo-test.js',
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('route:foo'"
          ]
        },
        {
          file: 'app/route-test/foo.js',
          exists: false
        }
      ]
    });
  });
  
  
  it('dummy route-test foo', function() {
    return generateAndDestroy(['route-test', 'foo'], {
      target: 'addon',
      files: [
        {
          file: 'tests/unit/routes/foo-test.js',
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('route:foo'"
          ]
        },
        {
          file: 'app/route-test/foo.js',
          exists: false
        }
      ]
    });
  });
});