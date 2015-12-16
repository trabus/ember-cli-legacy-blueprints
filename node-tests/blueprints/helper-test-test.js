'use strict';

var EOL                = require('os').EOL;
var setupTestHooks     = require('ember-cli-blueprint-test-helpers/lib/helpers/setup');
var BlueprintHelpers   = require('ember-cli-blueprint-test-helpers/lib/helpers/blueprint-helper');
var generateAndDestroy = BlueprintHelpers.generateAndDestroy;

describe('Acceptance: ember generate and destroy helper-test', function() {
  setupTestHooks(this);
  
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
  
  it('in-addon helper-test foo-bar', function() {
    return generateAndDestroy(['helper-test', 'foo-bar'], {
      target: 'addon',
      files: [
        {
          file: 'tests/unit/helpers/foo-bar-test.js',
          contains: "import { fooBar } from '../../../helpers/foo-bar';"
        }
      ]
    });
  });

});