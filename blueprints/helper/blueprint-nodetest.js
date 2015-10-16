'use strict';

var EOL                = require('os').EOL;
var setupTestHooks     = require('ember-cli-blueprint-test-helpers/lib/helpers/setup');
var BlueprintHelpers   = require('ember-cli-blueprint-test-helpers/lib/helpers/blueprint-helper');
var generateAndDestroy = BlueprintHelpers.generateAndDestroy;

describe('Acceptance: ember generate and destroy helper', function() {
  setupTestHooks(this);

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
  
  it('in-addon helper foo-bar', function() {
    return generateAndDestroy(['helper', 'foo-bar'], {
      target: 'addon',
      files: [
        {
          file: 'addon/helpers/foo-bar.js',
          contains: "import Ember from 'ember';" + EOL + EOL +
                    "export function fooBar(params/*, hash*/) {" + EOL +
                    "  return params;" + EOL +
                    "}" +  EOL + EOL +
                    "export default Ember.Helper.helper(fooBar);"
        },
        {
          file: 'app/helpers/foo-bar.js',
          contains: [
            "export { default, fooBar } from 'my-addon/helpers/foo-bar';"
          ]
        },
        {
          file: 'tests/unit/helpers/foo-bar-test.js',
          contains: "import { fooBar } from '../../../helpers/foo-bar';"
        }
      ]
    });
  });

  it('in-addon helper foo/bar-baz', function() {
    return generateAndDestroy(['helper', 'foo/bar-baz'], {
      target: 'addon',
      files: [
        {
          file: 'addon/helpers/foo/bar-baz.js',
          contains: "import Ember from 'ember';" + EOL + EOL +
                    "export function fooBarBaz(params/*, hash*/) {" + EOL +
                    "  return params;" + EOL +
                    "}" + EOL + EOL +
                    "export default Ember.Helper.helper(fooBarBaz);"
        },
        {
          file: 'app/helpers/foo/bar-baz.js',
          contains: [
            "export { default, fooBarBaz } from 'my-addon/helpers/foo/bar-baz';"
          ]
        },
        {
          file: 'tests/unit/helpers/foo/bar-baz-test.js',
          contains: "import { fooBarBaz } from '../../../../helpers/foo/bar-baz';"
        }
      ]
    });
  });

});