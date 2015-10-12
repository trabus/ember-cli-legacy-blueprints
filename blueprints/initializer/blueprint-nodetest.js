'use strict';

var EOL                = require('os').EOL;
var tmpenv             = require('ember-cli-blueprint-test-helpers/lib/helpers/tmp-env');
var setupTestHooks     = require('ember-cli-blueprint-test-helpers/lib/helpers/setup');
var BlueprintHelpers   = require('ember-cli-blueprint-test-helpers/lib/helpers/blueprint-helper');
var generateAndDestroy = BlueprintHelpers.generateAndDestroy;

describe('Acceptance: ember generate and destroy initializer', function() {
  setupTestHooks(this, 20000, tmpenv);
  
  it('initializer foo', function() {
    return generateAndDestroy(['initializer', 'foo'], {
      files: [
        {
          file:'app/initializers/foo.js',
          contains: "export function initialize(/* application */) {" + EOL +
                    "  // application.inject('route', 'foo', 'service:foo');" + EOL +
                    "}" + EOL +
                    "" + EOL+
                    "export default {" + EOL +
                    "  name: 'foo'," + EOL +
                    "  initialize: initialize" + EOL +
                    "};"
        },
        {
          file:'tests/unit/initializers/foo-test.js',
          contains: "import FooInitializer from '../../../initializers/foo';"
        }
      ]
    });
  });

  it('initializer foo/bar', function() {
    return generateAndDestroy(['initializer', 'foo/bar'], {
      files: [
        {
          file:'app/initializers/foo/bar.js',
          contains: "export function initialize(/* application */) {" + EOL +
                    "  // application.inject('route', 'foo', 'service:foo');" + EOL +
                    "}" + EOL +
                    "" + EOL+
                    "export default {" + EOL +
                    "  name: 'foo/bar'," + EOL +
                    "  initialize: initialize" + EOL +
                    "};"
        },
        {
          file:'tests/unit/initializers/foo/bar-test.js',
          contains: "import FooBarInitializer from '../../../../initializers/foo/bar';"
        }
      ]
    });
  });
});