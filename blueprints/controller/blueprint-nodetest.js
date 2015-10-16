'use strict';

var EOL                = require('os').EOL;
var setupTestHooks     = require('ember-cli-blueprint-test-helpers/lib/helpers/setup');
var BlueprintHelpers   = require('ember-cli-blueprint-test-helpers/lib/helpers/blueprint-helper');
var generateAndDestroy = BlueprintHelpers.generateAndDestroy;

describe('Acceptance: ember generate and destroy controller', function() {
  setupTestHooks(this);

  it('controller foo', function() {
    return generateAndDestroy(['controller', 'foo'], {
      files: [
        {
          file: 'app/controllers/foo.js', 
          contains: [
            "import Ember from 'ember';",
            "export default Ember.Controller.extend({" + EOL + "});"
          ]
        },
        {
          file: 'tests/unit/controllers/foo-test.js', 
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('controller:foo'"
          ]
        },
      ]
    });
  });

  it('controller foo/bar', function() {
    return generateAndDestroy(['controller', 'foo/bar'], {
      files: [
        {
          file: 'app/controllers/foo/bar.js', 
          contains: [
            "import Ember from 'ember';",
            "export default Ember.Controller.extend({" + EOL + "});"
          ]
        },
        {
          file: 'tests/unit/controllers/foo/bar-test.js', 
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('controller:foo/bar'"
          ]
        }
      ]
    });
  });
  
  it('in-addon controller foo', function() {
    return generateAndDestroy(['controller', 'foo'], {
        target: 'addon',
        files: [
          {
            file: 'addon/controllers/foo.js',
            contains: [
              "import Ember from 'ember';",
              "export default Ember.Controller.extend({" + EOL + "});"
            ]
          },
          {
            file: 'app/controllers/foo.js',
            contains: [
              "export { default } from 'my-addon/controllers/foo';"
            ]
          },
          {
            file: 'tests/unit/controllers/foo-test.js',
            contains: [
              "import { moduleFor, test } from 'ember-qunit';",
              "moduleFor('controller:foo'"
            ]
          }
        ]
    });
  });

  it('in-addon controller foo/bar', function() {
    return generateAndDestroy(['controller', 'foo/bar'], {
      target: 'addon',
      files: [
        {
          file: 'addon/controllers/foo/bar.js',
          contains: [
            "import Ember from 'ember';",
            "export default Ember.Controller.extend({" + EOL + "});"
          ]
        },
        {
          file: 'app/controllers/foo/bar.js',
          contains: [
            "export { default } from 'my-addon/controllers/foo/bar';"
          ]
        },
        {
          file: 'tests/unit/controllers/foo/bar-test.js',
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('controller:foo/bar'"
          ]
        }
      ]
    });
  });

});