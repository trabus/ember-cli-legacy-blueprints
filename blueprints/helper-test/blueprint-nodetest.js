'use strict';

var EOL                = require('os').EOL;
var tmpenv             = require('ember-cli-blueprint-test-helpers/lib/helpers/tmp-env');
var setupTestHooks     = require('ember-cli-blueprint-test-helpers/lib/helpers/setup');
var BlueprintHelpers   = require('ember-cli-blueprint-test-helpers/lib/helpers/blueprint-helper');
var generateAndDestroy = BlueprintHelpers.generateAndDestroy;

describe('Acceptance: ember generate and destroy helper-test', function() {
  setupTestHooks(this, 20000, tmpenv);
  
  it('helper-test foo/bar-baz', function() {
    return generateAndDestroy(['helper-test', 'foo/bar-baz'], {
      files: [
        {
          file: 'tests/unit/helpers/foo/bar-baz-test.js',
          contains: "import { fooBarBaz } from '../../../../helpers/foo/bar-baz';"
        }
      ]
    });
  });

});