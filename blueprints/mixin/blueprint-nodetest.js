'use strict';

var EOL                = require('os').EOL;
var tmpenv             = require('ember-cli-blueprint-test-helpers/lib/helpers/tmp-env');
var setupTestHooks     = require('ember-cli-blueprint-test-helpers/lib/helpers/setup');
var BlueprintHelpers   = require('ember-cli-blueprint-test-helpers/lib/helpers/blueprint-helper');
var generateAndDestroy = BlueprintHelpers.generateAndDestroy;

describe('Acceptance: ember generate and destroy mixin', function() {
  setupTestHooks(this, 20000, tmpenv);
  
  it('mixin foo', function() {
    return generateAndDestroy(['mixin', 'foo'], {
      files: [
        {
          file: 'app/mixins/foo.js',
          contains: [
            "import Ember from 'ember';",
            'export default Ember.Mixin.create({' + EOL + '});'
          ]
        },
        {
          file: 'tests/unit/mixins/foo-test.js',
          contains: [
            "import FooMixin from '../../../mixins/foo';"
          ]
        }
      ]
    });
  });

  it('mixin foo/bar', function() {
    return generateAndDestroy(['mixin', 'foo/bar'], {
      files: [
        {
          file: 'app/mixins/foo/bar.js',
          contains: [
            "import Ember from 'ember';",
            'export default Ember.Mixin.create({' + EOL + '});'
          ]
        },
        {
          file: 'tests/unit/mixins/foo/bar-test.js',
          contains: [
            "import FooBarMixin from '../../../mixins/foo/bar';"
          ]
        }
      ]
    });
  });

  it('mixin foo/bar/baz', function() {
    return generateAndDestroy(['mixin', 'foo/bar/baz'], {
      files: [
        {
          file: 'tests/unit/mixins/foo/bar/baz-test.js',
          contains: [
            "import FooBarBazMixin from '../../../mixins/foo/bar/baz';"
          ]
        }
      ]
    });
  });

});