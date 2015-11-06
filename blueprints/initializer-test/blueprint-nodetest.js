'use strict';

var EOL                = require('os').EOL;
var setupTestHooks     = require('ember-cli-blueprint-test-helpers/lib/helpers/setup');
var BlueprintHelpers   = require('ember-cli-blueprint-test-helpers/lib/helpers/blueprint-helper');
var generateAndDestroy = BlueprintHelpers.generateAndDestroy;

describe('Acceptance: ember generate and destroy initializer-test', function() {
  setupTestHooks(this);
  
  it('initializer-test foo', function() {
    return generateAndDestroy(['initializer-test', 'foo'], {
      files: [
        {
          file: 'tests/unit/initializers/foo-test.js',
          contains: [
            "import FooInitializer from '../../../initializers/foo';",
            "module('Unit | Initializer | foo'",
            "var application;",
            "FooInitializer.initialize(application);"
          ]
        }
      ]
    });
  });
  
  it('in-addon initializer-test foo', function() {
    return generateAndDestroy(['initializer-test', 'foo'], {
      target: 'addon',
      files: [
        {
          file: 'tests/unit/initializers/foo-test.js',
          contains: [
            "import FooInitializer from '../../../initializers/foo';",
            "module('Unit | Initializer | foo'",
            "var application;",
            "FooInitializer.initialize(application);"
          ]
        }
      ]
    });
  });

});