'use strict';

var EOL                = require('os').EOL;
var tmpenv             = require('ember-cli-blueprint-test-helpers/lib/helpers/tmp-env');
var setupTestHooks     = require('ember-cli-blueprint-test-helpers/lib/helpers/setup');
var BlueprintHelpers   = require('ember-cli-blueprint-test-helpers/lib/helpers/blueprint-helper');
var generateAndDestroy = BlueprintHelpers.generateAndDestroy;

describe('Acceptance: ember generate and destroy helper', function() {
  setupTestHooks(this, 20000, tmpenv);

  it('helper foo/bar-baz', function() {
    return generateAndDestroy(['helper', 'foo/bar-baz'], {
      files: [
        {
          file: 'app/helpers/foo/bar-baz.js',
          contains: "import Ember from 'ember';" + EOL + EOL +
                    "export function fooBarBaz(params/*, hash*/) {" + EOL +
                    "  return params;" + EOL +
                    "}" + EOL + EOL +
                    "export default Ember.Helper.helper(fooBarBaz);"
        },
        {
          file: 'tests/unit/helpers/foo/bar-baz-test.js',
          contains: "import { fooBarBaz } from '../../../../helpers/foo/bar-baz';"
        }
      ]
    });
  });

});