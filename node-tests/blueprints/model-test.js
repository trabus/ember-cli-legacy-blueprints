'use strict';

var EOL                = require('os').EOL;
var setupTestHooks     = require('ember-cli-blueprint-test-helpers/lib/helpers/setup');
var BlueprintHelpers   = require('ember-cli-blueprint-test-helpers/lib/helpers/blueprint-helper');
var generateAndDestroy = BlueprintHelpers.generateAndDestroy;

describe('Acceptance: ember generate and destroy model', function() {
  setupTestHooks(this);
/**
* Basic Generate and Destroy tests
*
*/  
  it('model foo', function() {
    return generateAndDestroy(['model', 'foo'], {
      files: [
        {
          file: 'app/models/foo.js',
          contains: [
            "import DS from 'ember-data';",
            "export default DS.Model.extend"
          ]
        },
        {
          file: 'tests/unit/models/foo-test.js',
          contains: [
            "import { moduleForModel, test } from 'ember-qunit';",
            "moduleForModel('foo'",
            "needs: []"
          ]
        }
      ]
    });
  });

  it('model foo with attributes', function() {
    return generateAndDestroy([
      'model',
      'foo',
      'noType',
      'firstName:string',
      'created_at:date',
      'is-published:boolean',
      'rating:number',
      'bars:has-many',
      'baz:belongs-to',
      'echo:hasMany',
      'bravo:belongs_to',
      'foo-names:has-many',
      'barName:has-many',
      'bazName:belongs-to',
      'test-name:belongs-to',
      'metricData:custom-transform',
      'echoName:hasMany',
      'bravoName:belongs_to'
    ], {
      files: [
        {
          file: 'app/models/foo.js',
          contains: [
            "noType: DS.attr()",
            "firstName: DS.attr('string')",
            "createdAt: DS.attr('date')",
            "isPublished: DS.attr('boolean')",
            "rating: DS.attr('number')",
            "bars: DS.hasMany('bar')",
            "baz: DS.belongsTo('baz')",
            "echos: DS.hasMany('echo')",
            "bravo: DS.belongsTo('bravo')",
            "fooNames: DS.hasMany('foo-name')",
            "barNames: DS.hasMany('bar-name')",
            "bazName: DS.belongsTo('baz-name')",
            "testName: DS.belongsTo('test-name')",
            "metricData: DS.attr('custom-transform')",
            "echoNames: DS.hasMany('echo-name')",
            "bravoName: DS.belongsTo('bravo-name')"
          ]
        },
        {
          file: 'tests/unit/models/foo-test.js',
          contains: [
            "needs: [",
            "'model:bar',",
            "'model:baz',",
            "'model:echo',",
            "'model:bravo',",
            "'model:foo-name',",
            "'model:bar-name',",
            "'model:baz-name',",
            "'model:echo-name',",
            "'model:test-name',",
            "'model:bravo-name'",
            "]"
          ]
        }
      ]
    });
  });

  it('model foo/bar', function() {
    return generateAndDestroy(['model', 'foo/bar'], {
      files: [
        {
          file: 'app/models/foo/bar.js',
          contains: [
            "import DS from 'ember-data';",
            "export default DS.Model.extend"
          ]
        },
        {
          file: 'tests/unit/models/foo/bar-test.js',
          contains: [
            "import { moduleForModel, test } from 'ember-qunit';",
            "moduleForModel('foo/bar'"
          ]
        }
      ]
    });
  });
  
  it('in-addon model foo', function() {
    return generateAndDestroy(['model', 'foo'], {
      target: 'addon',
      files: [
        {
          file: 'addon/models/foo.js',
          contains: [
            "import DS from 'ember-data';",
            "export default DS.Model.extend"
          ]
        },
        {
          file: 'app/models/foo.js',
          contains: [
            "export { default } from 'my-addon/models/foo';"
          ]
        },
        {
          file: 'tests/unit/models/foo-test.js',
          contains: [
            "import { moduleForModel, test } from 'ember-qunit';",
            "moduleForModel('foo'"
          ]
        }
      ]
    });
  });

  it('in-addon model foo with attributes', function() {
    return generateAndDestroy([
      'model',
      'foo',
      'noType',
      'firstName:string',
      'created_at:date',
      'is-published:boolean',
      'rating:number',
      'bars:has-many',
      'baz:belongs-to',
      'echo:hasMany',
      'bravo:belongs_to',
      'foo-names:has-many',
      'barName:has-many',
      'bazName:belongs-to',
      'test-name:belongs-to',
      'echoName:hasMany',
      'bravoName:belongs_to'
    ], {
      target: 'addon',
      files: [
        {
          file: 'addon/models/foo.js',
          contains: [
            "noType: DS.attr()",
            "firstName: DS.attr('string')",
            "createdAt: DS.attr('date')",
            "isPublished: DS.attr('boolean')",
            "rating: DS.attr('number')",
            "bars: DS.hasMany('bar')",
            "baz: DS.belongsTo('baz')",
            "echos: DS.hasMany('echo')",
            "bravo: DS.belongsTo('bravo')",
            "fooNames: DS.hasMany('foo-name')",
            "barNames: DS.hasMany('bar-name')",
            "bazName: DS.belongsTo('baz-name')",
            "testName: DS.belongsTo('test-name')",
            "echoNames: DS.hasMany('echo-name')",
            "bravoName: DS.belongsTo('bravo-name')"
          ]
        },
        {
          file: 'app/models/foo.js',
          contains: [
            "export { default } from 'my-addon/models/foo';"
          ]
        },
        {
          file: 'tests/unit/models/foo-test.js',
          contains: [
            "needs: [",
            "'model:bar',",
            "'model:baz',",
            "'model:echo',",
            "'model:bravo',",
            "'model:foo-name',",
            "'model:bar-name',",
            "'model:baz-name',",
            "'model:echo-name',",
            "'model:test-name',",
            "'model:bravo-name'",
            "]"
          ]
        }
      ]
    });
  });

  it('in-addon model foo/bar', function() {
    return generateAndDestroy(['model', 'foo/bar'], {
      target: 'addon',
      files: [
        {
          file: 'addon/models/foo/bar.js',
          contains: [
            "import DS from 'ember-data';",
            "export default DS.Model.extend"
          ]
        },
        {
          file: 'app/models/foo/bar.js',
          contains: [
            "export { default } from 'my-addon/models/foo/bar';"
          ]
        },
        {
          file: 'tests/unit/models/foo/bar-test.js',
          contains: [
            "import { moduleForModel, test } from 'ember-qunit';",
            "moduleForModel('foo/bar'"
          ]
        }
      ]
    });
  });

  it('in-addon model-test foo', function() {
    return generateAndDestroy(['model-test', 'foo'], {
      target: 'addon',
      files: [
        {
          file: 'tests/unit/models/foo-test.js',
          contains: [
            "import { moduleForModel, test } from 'ember-qunit';",
            "moduleForModel('foo'"
          ]
        },
        {
          file: 'app/model-test/foo.js',
          exists: false
        }
      ]
    });
  });
  
  it('dummy model foo', function() {
    return generateAndDestroy(['model', 'foo', '--dummy'], {
      target: 'addon',
      files: [
        {
          file: 'tests/dummy/app/models/foo.js',
          contains: [
            "import DS from 'ember-data';",
            "export default DS.Model.extend"
          ]
        },
        {
          file: 'app/models/foo.js',
          exists: false
        },
        {
          file: 'tests/unit/models/foo-test.js',
          exists: false
        }
      ]
    });
  });

  it('dummy model foo with attributes', function() {
    return generateAndDestroy([
      'model',
      'foo',
      'noType',
      'firstName:string',
      'created_at:date',
      'is-published:boolean',
      'rating:number',
      'bars:has-many',
      'baz:belongs-to',
      'echo:hasMany',
      'bravo:belongs_to',
      'foo-names:has-many',
      'barName:has-many',
      'bazName:belongs-to',
      'test-name:belongs-to',
      'echoName:hasMany',
      'bravoName:belongs_to',
      '--dummy'
    ], {
      target: 'addon',
      files: [
        {
          file: 'tests/dummy/app/models/foo.js',
          contains: [
            "noType: DS.attr()",
            "firstName: DS.attr('string')",
            "createdAt: DS.attr('date')",
            "isPublished: DS.attr('boolean')",
            "rating: DS.attr('number')",
            "bars: DS.hasMany('bar')",
            "baz: DS.belongsTo('baz')",
            "echos: DS.hasMany('echo')",
            "bravo: DS.belongsTo('bravo')",
            "fooNames: DS.hasMany('foo-name')",
            "barNames: DS.hasMany('bar-name')",
            "bazName: DS.belongsTo('baz-name')",
            "testName: DS.belongsTo('test-name')",
            "echoNames: DS.hasMany('echo-name')",
            "bravoName: DS.belongsTo('bravo-name')"
          ]
        },
        {
          file: 'app/models/foo.js',
          exists: false
        },
        {
          file: 'tests/unit/models/foo-test.js',
          exists: false
        }
      ]
    });
  });

  it('dummy model foo/bar', function() {
    return generateAndDestroy(['model', 'foo/bar', '--dummy'], {
      target: 'addon',
      files: [
        {
          file: 'tests/dummy/app/models/foo/bar.js',
          contains: [
            "import DS from 'ember-data';",
            "export default DS.Model.extend"
          ]
        },
        {
          file: 'app/models/foo/bar.js',
          exists: false
        },
        {
          file: 'tests/unit/models/foo/bar-test.js',
          exists: false
        }
      ]
    });
  });
  
  
  it('in-repo-addon model foo', function() {
    return generateAndDestroy(['model', 'foo', '--in-repo-addon=my-addon'], {
      target: 'inRepoAddon',
      files: [
        {
          file: 'lib/my-addon/addon/models/foo.js',
          contains: [
            "import DS from 'ember-data';",
            "export default DS.Model.extend"
          ]
        },
        {
          file: 'lib/my-addon/app/models/foo.js',
          contains: [
            "export { default } from 'my-addon/models/foo';"
          ]
        },
        {
          file: 'tests/unit/models/foo-test.js',
          contains: [
            "import { moduleForModel, test } from 'ember-qunit';",
            "moduleForModel('foo'"
          ]
        }
      ]
    });
  });

  it('in-repo-addon model foo with attributes', function() {
    return generateAndDestroy([
      'model',
      'foo',
      'noType',
      'firstName:string',
      'created_at:date',
      'is-published:boolean',
      'rating:number',
      'bars:has-many',
      'baz:belongs-to',
      'echo:hasMany',
      'bravo:belongs_to',
      'foo-names:has-many',
      'barName:has-many',
      'bazName:belongs-to',
      'test-name:belongs-to',
      'echoName:hasMany',
      'bravoName:belongs_to',
      '--in-repo-addon=my-addon'
    ], {
      target: 'inRepoAddon',
      files: [
        {
          file: 'lib/my-addon/addon/models/foo.js',
          contains: [
            "noType: DS.attr()",
            "firstName: DS.attr('string')",
            "createdAt: DS.attr('date')",
            "isPublished: DS.attr('boolean')",
            "rating: DS.attr('number')",
            "bars: DS.hasMany('bar')",
            "baz: DS.belongsTo('baz')",
            "echos: DS.hasMany('echo')",
            "bravo: DS.belongsTo('bravo')",
            "fooNames: DS.hasMany('foo-name')",
            "barNames: DS.hasMany('bar-name')",
            "bazName: DS.belongsTo('baz-name')",
            "testName: DS.belongsTo('test-name')",
            "echoNames: DS.hasMany('echo-name')",
            "bravoName: DS.belongsTo('bravo-name')"
          ]
        },
        {
          file: 'lib/my-addon/app/models/foo.js',
          contains: [
            "export { default } from 'my-addon/models/foo';"
          ]
        },
        {
          file: 'tests/unit/models/foo-test.js',
          contains: [
            "needs: [",
            "'model:bar',",
            "'model:baz',",
            "'model:echo',",
            "'model:bravo',",
            "'model:foo-name',",
            "'model:bar-name',",
            "'model:baz-name',",
            "'model:echo-name',",
            "'model:test-name',",
            "'model:bravo-name'",
            "]"
          ]
        }
      ]
    });
  });

  it('in-repo-addon model foo/bar', function() {
    return generateAndDestroy(['model', 'foo/bar', '--in-repo-addon=my-addon'], {
      target: 'inRepoAddon',
      files: [
        {
          file: 'lib/my-addon/addon/models/foo/bar.js',
          contains: [
            "import DS from 'ember-data';",
            "export default DS.Model.extend"
          ]
        },
        {
          file: 'lib/my-addon/app/models/foo/bar.js',
          contains: [
            "export { default } from 'my-addon/models/foo/bar';"
          ]
        },
        {
          file: 'tests/unit/models/foo/bar-test.js',
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

  it('model foo --pod', function() {
    return generateAndDestroy(['model', 'foo', '--pod'], {
      files: [
        {
          file: 'app/foo/model.js',
          contains: [
            "import DS from 'ember-data';",
            "export default DS.Model.extend"
          ]
        },
        {
          file: 'tests/unit/foo/model-test.js',
          contains: [
            "import { moduleForModel, test } from 'ember-qunit';",
            "moduleForModel('foo'"
          ]
        }
      ]
    });
  });

  it('model foo --pod podModulePrefix', function() {
    return generateAndDestroy(['model', 'foo', '--pod'], {
      podModulePrefix: true,
      files: [
        {
          file: 'app/pods/foo/model.js',
          contains: [
            "import DS from 'ember-data';",
            "export default DS.Model.extend"
          ]
        },
        {
          file: 'tests/unit/pods/foo/model-test.js',
          contains: [
            "import { moduleForModel, test } from 'ember-qunit';",
            "moduleForModel('foo'"
          ]
        }
      ]
    });
  });

  it('model foo --pod with attributes', function() {
    return generateAndDestroy([
      'model',
      'foo',
      'noType',
      'firstName:string',
      'created_at:date',
      'is-published:boolean',
      'rating:number',
      'bars:has-many',
      'baz:belongs-to',
      'echo:hasMany',
      'bravo:belongs_to',
      '--pod'
    ], {
      files: [
        {
          file: 'app/foo/model.js',
          contains: [
            "noType: DS.attr()",
            "firstName: DS.attr('string')",
            "createdAt: DS.attr('date')",
            "isPublished: DS.attr('boolean')",
            "rating: DS.attr('number')",
            "bars: DS.hasMany('bar')",
            "baz: DS.belongsTo('baz')",
            "echos: DS.hasMany('echo')",
            "bravo: DS.belongsTo('bravo')"
          ]
        },
        {
          file: 'tests/unit/foo/model-test.js',
          contains: "needs: ['model:bar', 'model:baz', 'model:echo', 'model:bravo']"
        }
      ]
    });
  });

  it('model foo/bar --pod', function() {
    return generateAndDestroy(['model', 'foo/bar', '--pod'], {
      files: [
        {
          file: 'app/foo/bar/model.js',
          contains: [
            "import DS from 'ember-data';",
            "export default DS.Model.extend"
          ]
        },
        {
          file: 'tests/unit/foo/bar/model-test.js',
          contains: [
            "import { moduleForModel, test } from 'ember-qunit';",
            "moduleForModel('foo/bar'"
          ]
        }
      ]
    });
  });

  it('model foo/bar --pod podModulePrefix', function() {
    return generateAndDestroy(['model', 'foo/bar', '--pod'], {
      podModulePrefix: true,
      files: [
        {
          file: 'app/pods/foo/bar/model.js',
          contains: [
            "import DS from 'ember-data';",
            "export default DS.Model.extend"
          ]
        },
        {
          file: 'tests/unit/pods/foo/bar/model-test.js',
          contains: [
            "import { moduleForModel, test } from 'ember-qunit';",
            "moduleForModel('foo/bar'"
          ]
        }
      ]
    });
  });

});