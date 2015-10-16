'use strict';

var EOL                = require('os').EOL;
var setupTestHooks     = require('ember-cli-blueprint-test-helpers/lib/helpers/setup');
var BlueprintHelpers   = require('ember-cli-blueprint-test-helpers/lib/helpers/blueprint-helper');
var generateAndDestroy = BlueprintHelpers.generateAndDestroy;

describe('Acceptance: ember generate and destroy view', function() {
  setupTestHooks(this);
  
  it('view foo', function() {
    return generateAndDestroy(['view', 'foo'], {
      files: [
        {
          file: 'app/views/foo.js',
          contains: [
            "import Ember from 'ember';",
            "export default Ember.View.extend({" + EOL + "})"
          ]
        },
        {
          file: 'tests/unit/views/foo-test.js',
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('view:foo'"
          ]
        }
      ]
    });
  });

  it('view foo/bar', function() {
    return generateAndDestroy(['view', 'foo/bar'], {
      files: [
        {
          file: 'app/views/foo/bar.js',
          contains: [
            "import Ember from 'ember';",
            "export default Ember.View.extend({" + EOL + "})"
          ]
        },
        {
          file: 'tests/unit/views/foo/bar-test.js',
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('view:foo/bar'"
          ]
        }
      ]
    });
  });
  
  it('in-addon view foo', function() {
    return generateAndDestroy(['view', 'foo'], {
      files: [
        {
          file: 'addon/views/foo.js',
          contains: [
            "import Ember from 'ember';",
            "export default Ember.View.extend({" + EOL + "})"
          ]
        },
        {
          file: 'app/views/foo.js',
          contains: [
            "export { default } from 'my-addon/views/foo';"
          ]
        },
        {
          file: 'tests/unit/views/foo-test.js',
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('view:foo'"
          ]
        }
      ]
    });
  });

  it('in-addon view foo/bar', function() {
    return generateAndDestroy(['view', 'foo/bar'], {
      files: [
        {
          file: 'addon/views/foo/bar.js',
          contains: [
            "import Ember from 'ember';",
            "export default Ember.View.extend({" + EOL + "})"
          ]
        },
        {
          file: 'app/views/foo/bar.js',
          contains: [
            "export { default } from 'my-addon/views/foo/bar';"
          ]
        },
        {
          file: 'tests/unit/views/foo/bar-test.js',
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('view:foo/bar'"
          ]
        }
      ]
    });
  });

});