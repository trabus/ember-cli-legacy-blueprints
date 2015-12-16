'use strict';

var EOL                = require('os').EOL;
var setupTestHooks     = require('ember-cli-blueprint-test-helpers/lib/helpers/setup');
var BlueprintHelpers   = require('ember-cli-blueprint-test-helpers/lib/helpers/blueprint-helper');
var generateAndDestroy = BlueprintHelpers.generateAndDestroy;
var generate           = BlueprintHelpers.generate;

describe('Acceptance: ember generate and destroy resource', function() {
  setupTestHooks(this);
  
  it('resource foos', function() {
    return generateAndDestroy(['resource', 'foos'], {
      files: [
        {
          file: 'app/router.js',
          contains: 'this.route(\'foos\');'
        },
        {
          file: 'app/models/foo.js',
          contains: 'export default DS.Model.extend'
        },
        {
          file: 'app/routes/foos.js',
          contains: 'export default Ember.Route.extend({' + EOL + '});'
        },
        {
          file: 'app/templates/foos.hbs',
          contains: '{{outlet}}'
        },
        {
          file: 'tests/unit/models/foo-test.js',
          contains: "moduleForModel('foo'"
        },
        {
          file: 'tests/unit/routes/foos-test.js',
          contains: "moduleFor('route:foos'"
        }
      ]
    });
  });

  it('resource without entity name does not throw exception', function() {
    return generate(['resource'], {
      throws: {
        message: /The `ember generate <entity-name>` command requires an entity name to be specified. For more details, use `ember help`./,
        type: 'SilentError'
      }
    });

  });

  it('resource foos with --path', function() {
    return generateAndDestroy(['resource', 'foos', '--path=app/foos'], {
      files: [
        {
          file: 'app/router.js',
          contains: [
            'this.route(\'foos\', {',
            'path: \'app/foos\'',
            '});'
          ]
        }
      ]
    });
  });
  
  it('in-addon resource foos', function() {
    return generateAndDestroy(['resource', 'foos'], {
      target: 'addon',
      throws: {
        message: /blueprint does not support generating inside addons./,
        type: 'SilentError'
      }
    });
  });
  
  it('dummy resource foos', function() {
    return generateAndDestroy(['resource', 'foos', '--dummy'], {
      target: 'addon',
      throws: {
        message: /blueprint does not support generating inside addons./,
        type: 'SilentError'
      }
    });
  });
  
  it('in-repo-addon resource foos', function() {
    return generateAndDestroy(['resource', 'foos', '--in-repo-addon=my-addon'], {
      throw: {
        message: /blueprint does not support generating inside addons./,
        type: 'SilentError'
      }
    });
  });
/**
* Pod tests
*
*/

  it('resource foos --pod', function() {
    return generate(['resource', 'foos', '--pod'], {
      files: [
        {
          file: 'app/router.js',
          contains: 'this.route(\'foos\');'
        },
        {
          file: 'app/foo/model.js',
          contains: 'export default DS.Model.extend'
        },
        {
          file: 'app/foos/route.js',
          contains: 'export default Ember.Route.extend({' + EOL + '});'
        },
        {
          file: 'app/foos/template.hbs',
          contains: '{{outlet}}'
        },
        {
          file: 'tests/unit/foo/model-test.js',
          contains: "moduleForModel('foo'"
        },
        {
          file: 'tests/unit/foos/route-test.js',
          contains: "moduleFor('route:foos'"
        }
      ]
    });
  });

  it('resource foos --pod with --path', function() {
    return generateAndDestroy(['resource', 'foos', '--pod', '--path=app/foos'], {
      files: [
        {
          file: 'app/router.js',
          contains: [
            'this.route(\'foos\', {',
            'path: \'app/foos\'',
            '});'
          ]
        }
      ]
    });
  });

  it('resource foos --pod podModulePrefix', function() {
    return generateAndDestroy(['resource', 'foos', '--pod'], {
      podModulePrefix: true,
      files: [
        {
          file: 'app/router.js',
          contains: 'this.route(\'foos\');'
        },
        {
          file: 'app/pods/foo/model.js',
          contains: 'export default DS.Model.extend'
        },
        {
          file: 'app/pods/foos/route.js',
          contains: 'export default Ember.Route.extend({' + EOL + '});'
        },
        {
          file: 'app/pods/foos/template.hbs',
          contains: '{{outlet}}'
        },
        {
          file: 'tests/unit/pods/foo/model-test.js',
          contains: "moduleForModel('foo'"
        },
        {
          file: 'tests/unit/pods/foos/route-test.js',
          contains: "moduleFor('route:foos'"
        }
      ]
    });
  });

});