'use strict';

var EOL                = require('os').EOL;
var setupTestHooks     = require('ember-cli-blueprint-test-helpers/lib/helpers/setup');
var BlueprintHelpers   = require('ember-cli-blueprint-test-helpers/lib/helpers/blueprint-helper');
var generateAndDestroy = BlueprintHelpers.generateAndDestroy;

describe('Acceptance: ember generate and destroy initializer', function() {
  setupTestHooks(this);
  
  it('initializer foo', function() {
    return generateAndDestroy(['initializer', 'foo'], {
      files: [
        {
          file:'app/initializers/foo.js',
          contains: "export function initialize(/* application */) {" + EOL +
                    "  // application.inject('route', 'foo', 'service:foo');" + EOL +
                    "}" + EOL +
                    "" + EOL+
                    "export default {" + EOL +
                    "  name: 'foo'," + EOL +
                    "  initialize: initialize" + EOL +
                    "};"
        },
        {
          file:'tests/unit/initializers/foo-test.js',
          contains: "import FooInitializer from '../../../initializers/foo';"
        }
      ]
    });
  });

  it('initializer foo/bar', function() {
    return generateAndDestroy(['initializer', 'foo/bar'], {
      files: [
        {
          file:'app/initializers/foo/bar.js',
          contains: "export function initialize(/* application */) {" + EOL +
                    "  // application.inject('route', 'foo', 'service:foo');" + EOL +
                    "}" + EOL +
                    "" + EOL+
                    "export default {" + EOL +
                    "  name: 'foo/bar'," + EOL +
                    "  initialize: initialize" + EOL +
                    "};"
        },
        {
          file:'tests/unit/initializers/foo/bar-test.js',
          contains: "import FooBarInitializer from '../../../../initializers/foo/bar';"
        }
      ]
    });
  });
  
  it('in-addon initializer foo', function() {
    return generateAndDestroy(['initializer', 'foo'], {
      target: 'addon',
      files: [
        {
          file: 'addon/initializers/foo.js',
          contains: "export function initialize(/* application */) {" + EOL +
                    "  // application.inject('route', 'foo', 'service:foo');" + EOL +
                    "}" + EOL +
                    "" + EOL+
                    "export default {" + EOL +
                    "  name: 'foo'," + EOL +
                    "  initialize: initialize" + EOL +
                    "};"
        },
        {
          file: 'app/initializers/foo.js',
          contains: [
            "export { default, initialize } from 'my-addon/initializers/foo';"
          ]
        },
        {
          file: 'tests/unit/initializers/foo-test.js'
        }
      ]
    });
  });

  it('in-addon initializer foo/bar', function() {
    return generateAndDestroy(['initializer', 'foo/bar'], {
      target: 'addon',
      files: [
        {
          file: 'addon/initializers/foo/bar.js',
          contains: "export function initialize(/* application */) {" + EOL +
                    "  // application.inject('route', 'foo', 'service:foo');" + EOL +
                    "}" + EOL +
                    "" + EOL+
                    "export default {" + EOL +
                    "  name: 'foo/bar'," + EOL +
                    "  initialize: initialize" + EOL +
                    "};"
        },
        {
          file: 'app/initializers/foo/bar.js',
          contains: [
            "export { default, initialize } from 'my-addon/initializers/foo/bar';"
          ]
        },
        {
          file: 'tests/unit/initializers/foo/bar-test.js'
        }
      ]
    });
  });
  
  it('dummy initializer foo', function() {
    return generateAndDestroy(['initializer', 'foo', '--dummy'], {
      target: 'addon',
      files: [
        {
          file: 'tests/dummy/app/initializers/foo.js',
          contains: "export function initialize(/* application */) {" + EOL +
                    "  // application.inject('route', 'foo', 'service:foo');" + EOL +
                    "}" + EOL +
                    "" + EOL+
                    "export default {" + EOL +
                    "  name: 'foo'," + EOL +
                    "  initialize: initialize" + EOL +
                    "};"
        },
        {
          file: 'app/initializers/foo.js',
          exists: false
        },
        {
          file: 'tests/unit/initializers/foo-test.js',
          exists: false
        }
      ]
    });
  });

  it('dummy initializer foo/bar', function() {
    return generateAndDestroy(['initializer', 'foo/bar', '--dummy'], {
      target: 'addon',
      files: [
        {
          file: 'tests/dummy/app/initializers/foo/bar.js',
          contains: "export function initialize(/* application */) {" + EOL +
                    "  // application.inject('route', 'foo', 'service:foo');" + EOL +
                    "}" + EOL +
                    "" + EOL+
                    "export default {" + EOL +
                    "  name: 'foo/bar'," + EOL +
                    "  initialize: initialize" + EOL +
                    "};"
        },
        {  
          file: 'app/initializers/foo/bar.js',
          exists: false
        },
        {
          file: 'tests/unit/initializers/foo/bar-test.js',
          exists: false
        }
      ]
    });
  });
  
  it('in-repo-addon initializer foo', function() {
    return generateAndDestroy(['initializer', 'foo', '--in-repo-addon=my-addon'], {
      target: 'inRepoAddon',
      files: [
        {
          file: 'lib/my-addon/addon/initializers/foo.js',
          contains: "export function initialize(/* application */) {" + EOL +
                    "  // application.inject('route', 'foo', 'service:foo');" + EOL +
                    "}" + EOL +
                    "" + EOL+
                    "export default {" + EOL +
                    "  name: 'foo'," + EOL +
                    "  initialize: initialize" + EOL +
                    "};"
        },
        {
          file: 'lib/my-addon/app/initializers/foo.js',
          contains: [
            "export { default, initialize } from 'my-addon/initializers/foo';"
          ]
        },
        {
          file: 'tests/unit/initializers/foo-test.js'
        }
      ]
    });
  });

  it('in-repo-addon initializer foo/bar', function() {
    return generateAndDestroy(['initializer', 'foo/bar', '--in-repo-addon=my-addon'], {
      target: 'inRepoAddon',
      files: [
        {
          file: 'lib/my-addon/addon/initializers/foo/bar.js',
          contains: "export function initialize(/* application */) {" + EOL +
                    "  // application.inject('route', 'foo', 'service:foo');" + EOL +
                    "}" + EOL +
                    "" + EOL+
                    "export default {" + EOL +
                    "  name: 'foo/bar'," + EOL +
                    "  initialize: initialize" + EOL +
                    "};"
        },
        {
          file: 'lib/my-addon/app/initializers/foo/bar.js',
          contains: [
            "export { default, initialize } from 'my-addon/initializers/foo/bar';"
          ]
        },
        {
          file: 'tests/unit/initializers/foo/bar-test.js'
        }
      ]
    });
  });

/**
* Pod tests
*
*/
  it('initializer foo --pod', function() {
    return generateAndDestroy(['initializer', 'foo', '--pod'], {
      files: [
        {
          file: 'app/initializers/foo.js', 
          contains: "export function initialize(/* application */) {" + EOL +
                    "  // application.inject('route', 'foo', 'service:foo');" + EOL +
                    "}" + EOL +
                    "" + EOL+
                    "export default {" + EOL +
                    "  name: 'foo'," + EOL +
                    "  initialize: initialize" + EOL +
                    "};"
        }
      ]
    });
  });
  
  it('initializer foo --pod podModulePrefix', function() {
    return generateAndDestroy(['initializer', 'foo', '--pod'], {
      podModulePrefix: true,
      files: [
        {
          file: 'app/initializers/foo.js', 
          contains: "export function initialize(/* application */) {" + EOL +
                    "  // application.inject('route', 'foo', 'service:foo');" + EOL +
                    "}" + EOL +
                    "" + EOL+
                    "export default {" + EOL +
                    "  name: 'foo'," + EOL +
                    "  initialize: initialize" + EOL +
                    "};"
        }
      ]
    });
  });

  it('initializer foo/bar --pod', function() {
    return generateAndDestroy(['initializer', 'foo/bar', '--pod'], {
      files: [
        {
          file: 'app/initializers/foo/bar.js',
          contains: "export function initialize(/* application */) {" + EOL +
                    "  // application.inject('route', 'foo', 'service:foo');" + EOL +
                    "}" + EOL +
                    "" + EOL+
                    "export default {" + EOL +
                    "  name: 'foo/bar'," + EOL +
                    "  initialize: initialize" + EOL +
                    "};"
        }
      ]
    });
  });
  
  
  it('initializer foo/bar --pod podModulePrefix', function() {
    return generateAndDestroy(['initializer', 'foo/bar', '--pod'], {
      podModulePrefix: true,
      files: [
        {
          file: 'app/initializers/foo/bar.js',
          contains: "export function initialize(/* application */) {" + EOL +
                    "  // application.inject('route', 'foo', 'service:foo');" + EOL +
                    "}" + EOL +
                    "" + EOL+
                    "export default {" + EOL +
                    "  name: 'foo/bar'," + EOL +
                    "  initialize: initialize" + EOL +
                    "};"
        }
      ]
    });
  });

});