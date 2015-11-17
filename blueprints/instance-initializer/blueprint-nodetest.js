'use strict';

var EOL                = require('os').EOL;
var setupTestHooks     = require('ember-cli-blueprint-test-helpers/lib/helpers/setup');
var BlueprintHelpers   = require('ember-cli-blueprint-test-helpers/lib/helpers/blueprint-helper');
var generateAndDestroy = BlueprintHelpers.generateAndDestroy;

describe('Acceptance: ember generate and destroy instance-initializer', function() {
  setupTestHooks(this);
  
  it('instance-initializer foo', function() {
    return generateAndDestroy(['instance-initializer', 'foo'], {
      files: [
        {
          file: 'app/instance-initializers/foo.js',
          contains: "export function initialize(/* appInstance */) {" + EOL +
                  "  // appInstance.registry.injection('route', 'foo', 'service:foo');" + EOL +
                  "}" + EOL +
                  "" + EOL+
                  "export default {" + EOL +
                  "  name: 'foo'," + EOL +
                  "  initialize: initialize" + EOL +
                  "};"
        },
        {
          file: 'tests/unit/instance-initializers/foo-test.js',
          contains: "import { initialize } from '../../../instance-initializers/foo';"
        }
      ]
    });
  });

  it('instance-initializer foo/bar', function() {
    return generateAndDestroy(['instance-initializer', 'foo/bar'], {
      files: [
        {
          file: 'app/instance-initializers/foo/bar.js',
          contains: "export function initialize(/* appInstance */) {" + EOL +
                  "  // appInstance.registry.injection('route', 'foo', 'service:foo');" + EOL +
                  "}" + EOL +
                  "" + EOL+
                  "export default {" + EOL +
                  "  name: 'foo/bar'," + EOL +
                  "  initialize: initialize" + EOL +
                  "};"
        },
        {
          file: 'tests/unit/instance-initializers/foo/bar-test.js',
          contains: "import { initialize } from '../../../../instance-initializers/foo/bar';"
        }
      ]
    });
  });
  
  it('in-addon instance-initializer foo', function() {
    return generateAndDestroy(['instance-initializer', 'foo'], {
      target: 'addon',
      files: [
        {
          file: 'addon/instance-initializers/foo.js', 
          contains: "export function initialize(/* appInstance */) {" + EOL +
                    "  // appInstance.registry.injection('route', 'foo', 'service:foo');" + EOL +
                    "}" + EOL +
                    "" + EOL+
                    "export default {" + EOL +
                    "  name: 'foo'," + EOL +
                    "  initialize: initialize" + EOL +
                    "};"
        },
        {
          file: 'app/instance-initializers/foo.js', 
          contains: [
            "export { default, initialize } from 'my-addon/instance-initializers/foo';"
          ]
        },
        {
          file: 'tests/unit/instance-initializers/foo-test.js'
        }
      ]
    });
  });

  it('in-addon instance-initializer foo/bar', function() {
    return generateAndDestroy(['instance-initializer', 'foo/bar'], {
      target: 'addon',
      files: [
        {
          file: 'addon/instance-initializers/foo/bar.js', 
          contains: "export function initialize(/* appInstance */) {" + EOL +
                    "  // appInstance.registry.injection('route', 'foo', 'service:foo');" + EOL +
                    "}" + EOL +
                    "" + EOL+
                    "export default {" + EOL +
                    "  name: 'foo/bar'," + EOL +
                    "  initialize: initialize" + EOL +
                    "};"
        },
        {
          file: 'app/instance-initializers/foo/bar.js', 
          contains: [
            "export { default, initialize } from 'my-addon/instance-initializers/foo/bar';"
          ]
        },
        {
          file: 'tests/unit/instance-initializers/foo/bar-test.js'
        }
      ]
    });
  });
  
  it('in-repo-addon instance-initializer foo', function() {
    return generateAndDestroy(['instance-initializer', 'foo', '--in-repo-addon=my-addon'], {
      target: 'inRepoAddon',
      files: [
        {
          file: 'lib/my-addon/addon/instance-initializers/foo.js', 
          contains: "export function initialize(/* appInstance */) {" + EOL +
                    "  // appInstance.registry.injection('route', 'foo', 'service:foo');" + EOL +
                    "}" + EOL +
                    "" + EOL+
                    "export default {" + EOL +
                    "  name: 'foo'," + EOL +
                    "  initialize: initialize" + EOL +
                    "};"
        },
        {
          file: 'lib/my-addon/app/instance-initializers/foo.js', 
          contains: [
            "export { default, initialize } from 'my-addon/instance-initializers/foo';"
          ]
        },
        {
          file: 'tests/unit/instance-initializers/foo-test.js'
        }
      ]
    });
  });

  it('in-repo-addon instance-initializer foo/bar', function() {
    return generateAndDestroy(['instance-initializer', 'foo/bar', '--in-repo-addon=my-addon'], {
      target: 'inRepoAddon',
      files: [
        {
          file: 'lib/my-addon/addon/instance-initializers/foo/bar.js', 
          contains: "export function initialize(/* appInstance */) {" + EOL +
                    "  // appInstance.registry.injection('route', 'foo', 'service:foo');" + EOL +
                    "}" + EOL +
                    "" + EOL+
                    "export default {" + EOL +
                    "  name: 'foo/bar'," + EOL +
                    "  initialize: initialize" + EOL +
                    "};"
        },
        {
          file: 'lib/my-addon/app/instance-initializers/foo/bar.js', 
          contains: [
            "export { default, initialize } from 'my-addon/instance-initializers/foo/bar';"
          ]
        },
        {
          file: 'tests/unit/instance-initializers/foo/bar-test.js'
        }
      ]
    });
  });

});
