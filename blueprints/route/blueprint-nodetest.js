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
var destroy = BlueprintHelpers.destroy;


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
      target: 'addon',
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
      target: 'addon',
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
  
  it('dummy route foo', function() {
    return generateAndDestroy(['route', 'foo', '--dummy'], {
      target: 'addon',
      files: [
        {
          file: 'tests/dummy/app/routes/foo.js',
          contains: [
            "import Ember from 'ember';",
            "export default Ember.Route.extend({" + EOL + "});"
          ]
        },
        {
          file: 'app/routes/foo.js',
          exists: false
        },
        {
          file: 'tests/dummy/app/templates/foo.hbs',
          contains: '{{outlet}}'
        },
        {
          file: 'tests/dummy/app/router.js',
          contains: "this.route('foo');"
        },
        {
          file: 'app/templates/foo.js',
          exists: false
        },
        {
          file: 'tests/unit/routes/foo-test.js',
          exists: false
        }
      ]
    });
  });

  it('dummy route foo/bar', function() {
    return generateAndDestroy(['route', 'foo/bar', '--dummy'], {
      target: 'addon',
      files: [
        {
          file: 'tests/dummy/app/routes/foo/bar.js',
          contains: [
            "import Ember from 'ember';",
            "export default Ember.Route.extend({" + EOL + "});"
          ]
        },
        {
          file: 'app/routes/foo/bar.js',
          exists: false
        },
        {
          file: 'tests/dummy/app/templates/foo/bar.hbs',
          contains: '{{outlet}}'
        },
        {
          file: 'tests/dummy/app/router.js',
          contains: [
            "this.route('foo', function() {",
            "this.route('bar');",
          ]
        },
        {
          file: 'tests/unit/routes/foo/bar-test.js',
          exists: false
        }
      ]
    });
  });
  
  it('in-repo-addon route foo', function() {
    return generateAndDestroy(['route', 'foo', '--in-repo-addon=my-addon'], {
      target: 'inRepoAddon',
      files: [
        {
          file: 'lib/my-addon/addon/routes/foo.js',
          contains: [
            "import Ember from 'ember';",
            "export default Ember.Route.extend({" + EOL + "});"
          ]
        },
        {
          file: 'lib/my-addon/app/routes/foo.js',
          contains: "export { default } from 'my-addon/routes/foo';"
        },
        {
          file: 'lib/my-addon/addon/templates/foo.hbs',
          contains: '{{outlet}}'
        },
        {
          file: 'lib/my-addon/app/templates/foo.js',
          contains: "export { default } from 'my-addon/templates/foo';"
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

  it('in-repo-addon route foo/bar', function() {
    return generateAndDestroy(['route', 'foo/bar', '--in-repo-addon=my-addon'], {
      target: 'inRepoAddon',
      files: [
        {
          file: 'lib/my-addon/addon/routes/foo/bar.js',
          contains: [
            "import Ember from 'ember';",
            "export default Ember.Route.extend({" + EOL + "});"
          ]
        },
        {
          file: 'lib/my-addon/app/routes/foo/bar.js',
          contains: "export { default } from 'my-addon/routes/foo/bar';"
        },
        {
          file: 'lib/my-addon/addon/templates/foo/bar.hbs',
          contains: '{{outlet}}'
        },
        {
          file: 'lib/my-addon/app/templates/foo/bar.js',
          contains: "export { default } from 'my-addon/templates/foo/bar';"
        },
        {
          file: 'tests/unit/routes/foo/bar-test.js',
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('route:foo/bar'"
          ]
        }
      ]
    });
  });

/**
* Pod tests
*
*/

  it('in-addon route foo --pod', function() {
    return generateAndDestroy(['route', 'foo', '--pod'], {
      target: 'addon',
      files: [
        {
          file: 'addon/foo/route.js',
          contains: [
            "import Ember from 'ember';",
            "export default Ember.Route.extend({" + EOL + "});"
          ]
        },
        {
          file: 'addon/foo/template.hbs',
          contains: "{{outlet}}"
        },
        {
          file: 'app/foo/route.js',
          contains: [
            "export { default } from 'my-addon/foo/route';"
          ]
        },
        {
          file: 'app/foo/template.js',
          contains: [
            "export { default } from 'my-addon/foo/template';"
          ]
        },
        {
          file: 'tests/unit/foo/route-test.js',
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('route:foo'"
          ]
        }
      ]
    });
  });

  
  it('route foo --pod', function() {
    return generateAndDestroy(['route', 'foo', '--pod'], {
      files: [
        {
          file: 'app/router.js',
          contains: 'this.route(\'foo\')'
        },
        {
          file: 'app/foo/route.js',
          contains: [
            "import Ember from 'ember';",
            "export default Ember.Route.extend({" + EOL + "});"
          ]
        },
        {
          file: 'app/foo/template.hbs',
          contains: '{{outlet}}'
        },
        {
          file: 'tests/unit/foo/route-test.js',
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('route:foo'"
          ]
        }
      ]
    });
  });

  it('route foo --pod with --path', function() {
    return generateAndDestroy(['route', 'foo', '--pod', '--path=:foo_id/show'], {
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


  it('route foo --pod podModulePrefix', function() {
    return generateAndDestroy(['route', 'foo', '--pod'], {
      podModulePrefix: true,
      files: [
        {
          file: 'app/router.js',
          contains: 'this.route(\'foo\')'
        },
        {
          file: 'app/pods/foo/route.js',
          contains: [
            "import Ember from 'ember';",
            "export default Ember.Route.extend({" + EOL + "});"
          ]
        },
        {
          file: 'app/pods/foo/template.hbs',
          contains: '{{outlet}}'
        },
        {
          file: 'tests/unit/pods/foo/route-test.js',
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('route:foo'"
          ]
        }
      ]
    });
  });

  it('route index --pod', function() {
    return generateAndDestroy(['route', 'index', '--pod'], {
      files: [
        {
          file: 'app/router.js',
          doesNotContain: "this.route('index');"
        }
      ]
    });
  });

  it('route application --pod', function() {
    // need to run `initApp` manually here instead of using `generate` helper
    // because we need to remove the templates/application.hbs file to prevent
    // a prompt (due to a conflict)
    return destroy(['template', 'application'], {
      afterDestroy: function() {
        return generateAndDestroy(['route', 'application', '--pod'], {
          files: [
            {
              file: 'app/router.js',
              doesNotContain: "this.route('application');"
            }
          ]
        });
      }
    });
  });

  it('route basic --pod isn\'t added to router', function() {
    return generateAndDestroy(['route', 'basic', '--pod'], {
      files: [
        {
          file: 'app/router.js',
          doesNotContain: "this.route('basic');"
        },
        {
          file: 'app/basic/route.js'
        }
      ]
    });
  });

});