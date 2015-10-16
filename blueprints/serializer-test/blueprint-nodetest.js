'use strict';

var EOL                = require('os').EOL;
var setupTestHooks     = require('ember-cli-blueprint-test-helpers/lib/helpers/setup');
var BlueprintHelpers   = require('ember-cli-blueprint-test-helpers/lib/helpers/blueprint-helper');
var generateAndDestroy = BlueprintHelpers.generateAndDestroy;

describe('Acceptance: ember generate and destroy serializer-test', function() {
  setupTestHooks(this);
  
  it('serializer-test foo', function() {
    return generateAndDestroy(['serializer-test', 'foo'], {
      files: [
        {
          file: 'tests/unit/serializers/foo-test.js',
          contains: [
            "import { moduleForModel, test } from 'ember-qunit';",
          ]
        }
      ]
    });
  });

});