'use strict';

var EOL                = require('os').EOL;
var setupTestHooks     = require('ember-cli-blueprint-test-helpers/lib/helpers/setup');
var BlueprintHelpers   = require('ember-cli-blueprint-test-helpers/lib/helpers/blueprint-helper');
var generateAndDestroy = BlueprintHelpers.generateAndDestroy;

describe('Acceptance: ember generate and destroy model', function() {
  setupTestHooks(this, {timeout: 1000});
  
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
  
});