'use strict';

var EOL                = require('os').EOL;
var setupTestHooks     = require('ember-cli-blueprint-test-helpers/lib/helpers/setup');
var BlueprintHelpers   = require('ember-cli-blueprint-test-helpers/lib/helpers/blueprint-helper');
var generateAndDestroy = BlueprintHelpers.generateAndDestroy;

describe('Acceptance: ember generate and destroy util', function() {
  setupTestHooks(this);
  
  it('util foo-bar', function() {
    return generateAndDestroy(['util', 'foo-bar'], {
      files: [
        {
          file: 'app/utils/foo-bar.js',
          contains: 'export default function fooBar() {' + EOL +
                    '  return true;' + EOL +
                    '}'
        },
        {
          file: 'tests/unit/utils/foo-bar-test.js',
          contains: [
            "import fooBar from '../../../utils/foo-bar';"
          ]
        }
      ]
    });
  });

  it('util foo-bar/baz', function() {
    return generateAndDestroy(['util', 'foo/bar-baz'], {
      files: [
        {
          file: 'app/utils/foo/bar-baz.js',
          contains: 'export default function fooBarBaz() {' + EOL +
                    '  return true;' + EOL +
                    '}'
        },
        {
          file: 'tests/unit/utils/foo/bar-baz-test.js',
          contains: [
            "import fooBarBaz from '../../../utils/foo/bar-baz';"
          ]
        }
      ]
    });
  });
  
  it('in-addon util foo-bar', function() {
    return generateAndDestroy(['util', 'foo-bar'], {
      target: 'addon',
      files: [
        {
          file: 'addon/utils/foo-bar.js',
          contains: 'export default function fooBar() {' + EOL +
                    '  return true;' + EOL +
                    '}'
        },
        {
          file: 'app/utils/foo-bar.js',
          contains: [
            "export { default } from 'my-addon/utils/foo-bar';"
          ]
        },
        {
          file: 'tests/unit/utils/foo-bar-test.js',
          contains: [
            "import fooBar from '../../../utils/foo-bar';"
          ]
        }
      ]
    });
  });

  it('in-addon util foo-bar/baz', function() {
    return generateAndDestroy(['util', 'foo/bar-baz'], {
      target: 'addon',
      files: [
        {
          file: 'addon/utils/foo/bar-baz.js',
          contains: 'export default function fooBarBaz() {' + EOL +
                    '  return true;' + EOL +
                    '}'
        },
        {
          file: 'app/utils/foo/bar-baz.js',
          contains: [
            "export { default } from 'my-addon/utils/foo/bar-baz';"
          ]
        },
        {
          file: 'tests/unit/utils/foo/bar-baz-test.js',
          contains: [
            "import fooBarBaz from '../../../utils/foo/bar-baz';"
          ]
        }
      ]
    });
  });
/**
* Pod tests
*
*/

  it('util foo-bar --pod', function() {
    return generateAndDestroy(['util', 'foo-bar', '--pod'], {
      files: [
        {
          file: 'app/utils/foo-bar.js',
          contains: 'export default function fooBar() {' + EOL +
                    '  return true;' + EOL +
                    '}'
        },
        {
          file: 'tests/unit/utils/foo-bar-test.js',
          contains: [
            "import fooBar from '../../../utils/foo-bar';"
          ]
        }
      ]
    });
  });
  
  it('util foo-bar --pod podModulePrefix', function() {
    return generateAndDestroy(['util', 'foo-bar', '--pod'], {
      podModulePrefix: true,
      files: [
        {
          file: 'app/utils/foo-bar.js',
          contains: 'export default function fooBar() {' + EOL +
                    '  return true;' + EOL +
                    '}'
        },
        {
          file: 'tests/unit/utils/foo-bar-test.js',
          contains: [
            "import fooBar from '../../../utils/foo-bar';"
          ]
        }
      ]
    });
  });

  it('util foo-bar/baz --pod', function() {
    return generateAndDestroy(['util', 'foo/bar-baz', '--pod'], {
      files: [
        {
          file: 'app/utils/foo/bar-baz.js',
          contains: 'export default function fooBarBaz() {' + EOL +
                    '  return true;' + EOL +
                    '}'
        },
        {
          file: 'tests/unit/utils/foo/bar-baz-test.js',
          contains: [
            "import fooBarBaz from '../../../utils/foo/bar-baz';"
          ]
        }
      ]
    });
  });

});