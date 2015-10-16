'use strict';

var EOL                = require('os').EOL;
var setupTestHooks     = require('ember-cli-blueprint-test-helpers/lib/helpers/setup');
var BlueprintHelpers   = require('ember-cli-blueprint-test-helpers/lib/helpers/blueprint-helper');
var generateAndDestroy = BlueprintHelpers.generateAndDestroy;

describe('Acceptance: ember generate and destroy transform', function() {
  setupTestHooks(this);
  
  it('transform foo', function() {
    return generateAndDestroy(['transform', 'foo'], {
      files: [
        {
          file: 'app/transforms/foo.js',
          contains: [
            "import DS from 'ember-data';",
            'export default DS.Transform.extend({' + EOL +
            '  deserialize: function(serialized) {' + EOL +
            '    return serialized;' + EOL +
            '  },' + EOL +
            EOL +
            '  serialize: function(deserialized) {' + EOL +
            '    return deserialized;' + EOL +
            '  }' + EOL +
            '});'
          ]
        },
        {
          file: 'tests/unit/transforms/foo-test.js',
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('transform:foo'"
          ]
        }
      ]
    });
  });

  it('transform foo/bar', function() {
    return generateAndDestroy(['transform', 'foo/bar'], {
      files: [
        {
          file: 'app/transforms/foo/bar.js',
          contains: [
            "import DS from 'ember-data';",
            'export default DS.Transform.extend({' + EOL +
            '  deserialize: function(serialized) {' + EOL +
            '    return serialized;' + EOL +
            '  },' + EOL +
            '' + EOL +
            '  serialize: function(deserialized) {' + EOL +
            '    return deserialized;' + EOL +
            '  }' + EOL +
            '});'
          ]
        },
        {
          file: 'tests/unit/transforms/foo/bar-test.js',
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('transform:foo/bar'"
          ]
        }
      ]
    });
  });

});