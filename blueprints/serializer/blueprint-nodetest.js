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
  it('in-addon serializer foo', function() {
    return generateAndDestroy(['serializer', 'foo'], {
      target: 'addon',
      files: [
        {
          file: 'addon/serializers/foo.js',
          contains: [
            "import DS from 'ember-data';",
            'export default DS.RESTSerializer.extend({' + EOL + '});'
          ]
        },
        {
          file: 'app/serializers/foo.js',
          contains: [
            "export { default } from 'my-addon/serializers/foo';"
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

  it('in-addon serializer foo/bar', function() {
    return generateAndDestroy(['serializer', 'foo/bar'], {
      target: 'addon',
      files: [
        {
          file: 'addon/serializers/foo/bar.js',
          contains: [
            "import DS from 'ember-data';",
            'export default DS.RESTSerializer.extend({' + EOL + '});'
          ]
        },
        {
          file: 'app/serializers/foo/bar.js',
          contains: [
            "export { default } from 'my-addon/serializers/foo/bar';"
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
  
/**
* Pod tests
*
*/
  it('serializer foo --pod', function() {
    return generateAndDestroy(['serializer', 'foo', '--pod'], {
      files: [
        {
          file: 'app/foo/serializer.js',
          contains: [
            "import DS from 'ember-data';",
            'export default DS.RESTSerializer.extend({' + EOL + '});'
          ]
        },
        {
          file: 'tests/unit/foo/serializer-test.js',
          contains: [
            "import { moduleForModel, test } from 'ember-qunit';",
          ]
        }
      ]
    });
  });

  it('serializer foo --pod podModulePrefix', function() {
    return generateAndDestroy(['serializer', 'foo', '--pod'], {
      podModulePrefix: true,
      files: [
        {
          file: 'app/pods/foo/serializer.js',
          contains: [
            "import DS from 'ember-data';",
            'export default DS.RESTSerializer.extend({' + EOL + '});'
          ]
        },
        {
          file: 'tests/unit/pods/foo/serializer-test.js',
          contains: [
            "import { moduleForModel, test } from 'ember-qunit';",
          ]
        }
      ]
    });
  });

  it('serializer foo/bar --pod', function() {
    return generateAndDestroy(['serializer', 'foo/bar', '--pod'], {
      files: [
        {
          file: 'app/foo/bar/serializer.js',
          contains: [
            "import DS from 'ember-data';",
            'export default DS.RESTSerializer.extend({' + EOL + '});'
          ]
        }, 
        {
          file: 'tests/unit/foo/bar/serializer-test.js',
          contains: [
            "import { moduleForModel, test } from 'ember-qunit';",
            "moduleForModel('foo/bar'"
          ]
        }
      ]
    });
  });

  it('serializer foo/bar --pod podModulePrefix', function() {
    return generateAndDestroy(['serializer', 'foo/bar', '--pod'], {
      podModulePrefix: true,
      files: [
        {
          file: 'app/pods/foo/bar/serializer.js',
          contains: [
            "import DS from 'ember-data';",
            'export default DS.RESTSerializer.extend({' + EOL + '});'
          ]
        },
        {
          file: 'tests/unit/pods/foo/bar/serializer-test.js',
          contains: [
            "import { moduleForModel, test } from 'ember-qunit';",
            "moduleForModel('foo/bar'"
          ]
        }
      ]
    });
  });

});