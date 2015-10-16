'use strict';

var EOL                = require('os').EOL;
var setupTestHooks     = require('ember-cli-blueprint-test-helpers/lib/helpers/setup');
var BlueprintHelpers   = require('ember-cli-blueprint-test-helpers/lib/helpers/blueprint-helper');
var generateAndDestroy = BlueprintHelpers.generateAndDestroy;

describe('Acceptance: ember generate and destroy mixin-test', function() {
  setupTestHooks(this);
  
  it('mixin-test foo', function() {
    return generateAndDestroy(['mixin-test', 'foo'], {
      files: [
        {
          file: 'tests/unit/mixins/foo-test.js',
          contains: [
            "import FooMixin from '../../../mixins/foo';"
          ]
        }
      ]
    });
  });

});