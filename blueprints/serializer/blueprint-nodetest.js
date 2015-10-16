'use strict';

var EOL                = require('os').EOL;
var setupTestHooks     = require('ember-cli-blueprint-test-helpers/lib/helpers/setup');
var BlueprintHelpers   = require('ember-cli-blueprint-test-helpers/lib/helpers/blueprint-helper');
var generateAndDestroy = BlueprintHelpers.generateAndDestroy;

describe('Acceptance: ember generate and destroy serializer', function() {
  setupTestHooks(this);
  
  it('serializer foo', function() {
    return generateAndDestroy(['serializer', 'foo'], {
      files: [
        {
          file: 'app/serializers/foo.js',
          contains: [
            "import DS from 'ember-data';",
            'export default DS.RESTSerializer.extend({' + EOL + '});'
          ]
        },
        {
          file: 'tests/unit/serializers/foo-test.js',
          contains: [
            "import { moduleForModel, test } from 'ember-qunit';",
          ]
        }
      ]
    });
  });

  it('serializer foo/bar', function() {
    return generateAndDestroy(['serializer', 'foo/bar'], {
      files: [
        {
          file: 'app/serializers/foo/bar.js',
          contains: [
            "import DS from 'ember-data';",
            'export default DS.RESTSerializer.extend({' + EOL + '});'
          ]
        },
        {
          file: 'tests/unit/serializers/foo/bar-test.js',
          contains: [
            "import { moduleForModel, test } from 'ember-qunit';",
            "moduleForModel('foo/bar'"
          ]
        }
      ]
    });
  });

});