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
            '  deserialize(serialized) {' + EOL +
            '    return serialized;' + EOL +
            '  },' + EOL +
            EOL +
            '  serialize(deserialized) {' + EOL +
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
            '  deserialize(serialized) {' + EOL +
            '    return serialized;' + EOL +
            '  },' + EOL +
            '' + EOL +
            '  serialize(deserialized) {' + EOL +
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
  
  it('in-addon transform foo', function() {
    return generateAndDestroy(['transform', 'foo'], {
      target: 'addon',
      files: [
        {
          file: 'addon/transforms/foo.js',
          contains: [
            "import DS from 'ember-data';",
            'export default DS.Transform.extend({' + EOL +
            '  deserialize(serialized) {' + EOL +
            '    return serialized;' + EOL +
            '  },' + EOL +
            EOL +
            '  serialize(deserialized) {' + EOL +
            '    return deserialized;' + EOL +
            '  }' + EOL +
            '});'
          ]
        },
        {
          file: 'app/transforms/foo.js',
          contains: [
            "export { default } from 'my-addon/transforms/foo';"
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

  it('in-addon transform foo/bar', function() {
    return generateAndDestroy(['transform', 'foo/bar'], {
      target: 'addon',
      files: [
        {
          file: 'addon/transforms/foo/bar.js',
          contains: [
            "import DS from 'ember-data';",
            'export default DS.Transform.extend({' + EOL +
            '  deserialize(serialized) {' + EOL +
            '    return serialized;' + EOL +
            '  },' + EOL +
            '' + EOL +
            '  serialize(deserialized) {' + EOL +
            '    return deserialized;' + EOL +
            '  }' + EOL +
            '});'
          ]
        },
        {
          file: 'app/transforms/foo/bar.js',
          contains: [
            "export { default } from 'my-addon/transforms/foo/bar';"
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
/**
* Pod tests
*
*/

  it('transform foo --pod', function() {
    return generateAndDestroy(['transform', 'foo', '--pod'], {
      files: [
        {
          file: 'app/foo/transform.js',
          contains: [
            "import DS from 'ember-data';",
            'export default DS.Transform.extend({' + EOL +
            '  deserialize(serialized) {' + EOL +
            '    return serialized;' + EOL +
            '  },' + EOL +
            EOL +
            '  serialize(deserialized) {' + EOL +
            '    return deserialized;' + EOL +
            '  }' + EOL +
            '});'
          ]
        },
        {
          file: 'tests/unit/foo/transform-test.js',
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('transform:foo'"
          ]
        }
      ]
    });
  });

  it('transform foo --pod podModulePrefix', function() {
    return generateAndDestroy(['transform', 'foo', '--pod'], {
      podModulePrefix: true,
      files: [
        {
          file: 'app/pods/foo/transform.js',
          contains: [
            "import DS from 'ember-data';",
            'export default DS.Transform.extend({' + EOL +
            '  deserialize(serialized) {' + EOL +
            '    return serialized;' + EOL +
            '  },' + EOL +
            EOL +
            '  serialize(deserialized) {' + EOL +
            '    return deserialized;' + EOL +
            '  }' + EOL +
            '});'
          ]
        },
        {
          file: 'tests/unit/pods/foo/transform-test.js',
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('transform:foo'"
          ]
        }
      ]
    });
  });

  it('transform foo/bar --pod', function() {
    return generateAndDestroy(['transform', 'foo/bar', '--pod'], {
      files: [
        {
          file: 'app/foo/bar/transform.js',
          contains: [
            "import DS from 'ember-data';",
            'export default DS.Transform.extend({' + EOL +
            '  deserialize(serialized) {' + EOL +
            '    return serialized;' + EOL +
            '  },' + EOL +
            '' + EOL +
            '  serialize(deserialized) {' + EOL +
            '    return deserialized;' + EOL +
            '  }' + EOL +
            '});'
          ]
        },
        {
          file: 'tests/unit/foo/bar/transform-test.js',
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('transform:foo/bar'"
          ]
        }
      ]
    });
  });

  it('transform foo/bar --pod podModulePrefix', function() {
    return generateAndDestroy(['transform', 'foo/bar', '--pod'], {
      podModulePrefix: true,
      files: [
        {
          file: 'app/pods/foo/bar/transform.js',
          contains: [
            "import DS from 'ember-data';",
            'export default DS.Transform.extend({' + EOL +
            '  deserialize(serialized) {' + EOL +
            '    return serialized;' + EOL +
            '  },' + EOL +
            '' + EOL +
            '  serialize(deserialized) {' + EOL +
            '    return deserialized;' + EOL +
            '  }' + EOL +
            '});'
          ]
        },
        {
          file: 'tests/unit/pods/foo/bar/transform-test.js',
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('transform:foo/bar'"
          ]
        }
      ]
    });
  });

});