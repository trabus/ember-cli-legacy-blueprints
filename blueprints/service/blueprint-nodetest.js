'use strict';

var EOL                = require('os').EOL;
var setupTestHooks     = require('ember-cli-blueprint-test-helpers/lib/helpers/setup');
var BlueprintHelpers   = require('ember-cli-blueprint-test-helpers/lib/helpers/blueprint-helper');
var generateAndDestroy = BlueprintHelpers.generateAndDestroy;

describe('Acceptance: ember generate and destroy service', function() {
  setupTestHooks(this);
  
  it('service foo', function() {
    return generateAndDestroy(['service', 'foo'], {
      files: [
        {
          file: 'app/services/foo.js',
          contains: [
            "import Ember from 'ember';",
            'export default Ember.Service.extend({' + EOL + '});'
          ]
        },
        {
          file: 'tests/unit/services/foo-test.js',
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('service:foo'"
          ]
        }
      ]
    });
  });

  it('service foo/bar', function() {
    return generateAndDestroy(['service', 'foo/bar'], {
      files: [
        {
          file: 'app/services/foo/bar.js',
          contains: [
            "import Ember from 'ember';",
            'export default Ember.Service.extend({' + EOL + '});'
          ]
        },
        {
          file: 'tests/unit/services/foo/bar-test.js',
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('service:foo/bar'"
          ]
        }
      ]
    });
  });

});