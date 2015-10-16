'use strict';

var EOL                = require('os').EOL;
var fs                 = require('fs-extra');
var path               = require('path');
var Promise            = require('ember-cli/lib/ext/promise');
var remove             = Promise.denodeify(fs.remove);
var setupTestHooks     = require('ember-cli-blueprint-test-helpers/lib/helpers/setup');
var initProject        = require('ember-cli-blueprint-test-helpers/lib/helpers/project-init');
var BlueprintHelpers   = require('ember-cli-blueprint-test-helpers/lib/helpers/blueprint-helper');
var generateAndDestroy = BlueprintHelpers.generateAndDestroy;


describe('Acceptance: ember generate and destroy route', function() {
  setupTestHooks(this);
  
  it('route foo', function() {
    return generateAndDestroy(['route', 'foo'], {
      files: [
        {
          file: 'app/router.js',
          contains: 'this.route(\'foo\')'
        },
        {
          file: 'app/routes/foo.js',
          contains: [
            "import Ember from 'ember';",
            "export default Ember.Route.extend({" + EOL + "});"
          ]
        },
        {
          file: 'app/templates/foo.hbs',
          contains: '{{outlet}}'
        },
        {
          file: 'tests/unit/routes/foo-test.js',
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('route:foo'"
          ]
        }
      ]
    });
  });

    it('route foo with --skip-router', function() {
    return generateAndDestroy(['route', 'foo', '--skip-router'], {
      files: [
        {
          file: 'app/router.js',
          doesNotContain: 'this.route(\'foo\')'
        },
        {
          file: 'app/routes/foo.js',
          contains: [
            "import Ember from 'ember';",
            "export default Ember.Route.extend({" + EOL + "});"
          ]
        },
        {
          file: 'app/templates/foo.hbs',
          contains: '{{outlet}}'
        },
        {
          file: 'tests/unit/routes/foo-test.js',
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('route:foo'"
          ]
        }
      ]
    });
  });

  it('route foo with --path', function() {
    return generateAndDestroy(['route', 'foo', '--path=:foo_id/show'], {
      files: [
        {
          file: 'app/router.js',
          contains: [
            'this.route(\'foo\', {',
            'path: \':foo_id/show\'',
            '});'
          ]
        }
      ]
    });
  });

  it('route index', function() {
    return generateAndDestroy(['route', 'index'], {
      files: [
        {
          file: 'app/router.js',
          doesNotContain: "this.route('index');"
        }
      ]
    });
  });

  it('route application', function() {
    return generateAndDestroy(['route', 'foo'], {
      afterGenerate: function(){
        return remove(path.join('app', 'templates', 'application.hbs'))
          .then(function() {
            return generateAndDestroy(['route', 'application'], {
              skipInit: true,
              files: [
                {
                  file: 'app/router.js',
                  doesNotContain: "this.route('application');"
                }
              ]
            });
        });
      }
    });
  });

  it('route basic isn\'t added to router', function() {
    return generateAndDestroy(['route', 'basic'], {
      files: [
        {
          file: 'app/router.js',
          doesNotContain: "this.route('basic');"
        },
        {
          file: 'app/routes/basic.js'
        }
      ]
    });
  });
  it('in-addon route foo', function() {
    return generateAndDestroy(['route', 'foo'], {
      files: [
        {
          file: 'addon/routes/foo.js',
          contains: [
            "import Ember from 'ember';",
            "export default Ember.Route.extend({" + EOL + "});"
          ]
        },
        {
          file: 'app/routes/foo.js',
          contains: [
            "export { default } from 'my-addon/routes/foo';"
          ]
        },
        {
          file: 'addon/templates/foo.hbs',
          contains: '{{outlet}}'
        },
        {
          file: 'app/templates/foo.js',
          contains: "export { default } from 'my-addon/templates/foo';"
        },
        {
          file: 'tests/unit/routes/foo-test.js',
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('route:foo'"
          ]
        },
        {
          file: 'tests/dummy/app/router.js',
          doesNotContain: "this.route('foo');"
        }
      ]
    });
  });

  it('in-addon route foo/bar', function() {
    return generateAndDestroy(['route', 'foo/bar'], {
      files: [
        {
          file: 'addon/routes/foo/bar.js',
          contains: [
            "import Ember from 'ember';",
            "export default Ember.Route.extend({" + EOL + "});"
          ]
        },
        {
          file: 'app/routes/foo/bar.js',
          contains: "export { default } from 'my-addon/routes/foo/bar';"
        },
        {
          file: 'app/templates/foo/bar.js',
          contains: "export { default } from 'my-addon/templates/foo/bar';"
        },
        {
          file: 'tests/unit/routes/foo/bar-test.js',
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('route:foo/bar'"
          ]
        },
        {
          file: 'tests/dummy/app/router.js',
          doesNotContain:  "this.route('bar');"
        }
      ]
    });
  });

});