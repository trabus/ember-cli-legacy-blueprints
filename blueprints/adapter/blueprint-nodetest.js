'use strict';

var EOL                = require('os').EOL;
var setupTestHooks     = require('ember-cli-blueprint-test-helpers/lib/helpers/setup');
var BlueprintHelpers   = require('ember-cli-blueprint-test-helpers/lib/helpers/blueprint-helper');
var generateAndDestroy = BlueprintHelpers.generateAndDestroy;

describe('Acceptance: ember generate and destroy adapter', function() {
  setupTestHooks(this);
  
  it('adapter application', function() {
    return generateAndDestroy(['adapter', 'application'], {
      files: [
        {
          file:'app/adapters/application.js',
          contains: [
            "import DS from \'ember-data\';",
            "export default DS.RESTAdapter.extend({" + EOL + "});"
          ]
        },
        {
          file: 'tests/unit/adapters/application-test.js',
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('adapter:application'"
          ]
        }
      ]
    });
  });
  
  it('adapter foo', function() {
    return generateAndDestroy(['adapter', 'foo'], {
      files: [
        {
          files: 'app/adapters/foo.js',
          contains: [
            "import ApplicationAdapter from \'./application\';",
            "export default ApplicationAdapter.extend({" + EOL + "});"
          ]
        },
        {
          file:'tests/unit/adapters/foo-test.js',
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('adapter:foo'"
          ]
        }
      ]
    });
  });

  it('adapter foo/bar', function() {
    return generateAndDestroy(['adapter', 'foo/bar'], {
      files: [
        {
          file: 'app/adapters/foo/bar.js',
          contains: [
            "import ApplicationAdapter from \'../application\';",
            "export default ApplicationAdapter.extend({" + EOL + "});"
          ]
        }
      ]
    });
  });

  it('adapter foo/bar/baz', function() {
    return generateAndDestroy(['adapter', 'foo/bar/baz'], {
      files: [
        {
          file: 'app/adapters/foo/bar/baz.js',
          contains: [
            "import ApplicationAdapter from \'../../application\';",
            "export default ApplicationAdapter.extend({" + EOL + "});"
          ]
        }
      ]
    });
  });

  it('adapter application cannot extend from --base-class=application', function() {
    return generateAndDestroy(['adapter', 'application', '--base-class=application'], {
      throws: /Adapters cannot extend from themself/
    });
  });

  it('adapter foo cannot extend from --base-class=foo', function() {
    return generateAndDestroy(['adapter', 'foo', '--base-class=foo'], {
      throws: /Adapters cannot extend from themself/
    });
  });

  it('adapter extends from --base-class=bar', function() {
    return generateAndDestroy(['adapter', 'foo', '--base-class=bar'], {
      files: [
        {
          file: 'app/adapters/foo.js',
          contains: [
            "import BarAdapter from './bar';",
            "export default BarAdapter.extend({" + EOL + "});"
          ]
        }
      ]
    });
  });

  it('adapter extends from --base-class=foo/bar', function() {
    return generateAndDestroy(['adapter', 'foo/baz', '--base-class=foo/bar'], {
      files: [
        {
          file: 'app/adapters/foo/baz.js',
          contains: [
            "import FooBarAdapter from '../foo/bar';",
            "export default FooBarAdapter.extend({" + EOL + "});"
          ]
        }
      ]
    });
  });
  
  it('adapter extends from application adapter if present', function() {
    return generateAndDestroy(['adapter', 'application'], {
      afterGenerate: function() {
        return generateAndDestroy(['adapter', 'foo'], {
          files: [
            {
              file:'app/adapters/foo.js',
              contains: [
                "import ApplicationAdapter from './application';",
                "export default ApplicationAdapter.extend({" + EOL + "});"
              ]
            }
          ]
        });
      }
    });
  });

  it('adapter favors  --base-class over  application', function() {
    return generateAndDestroy(['adapter', 'application'], {
      afterGenerate: function() {
        return generateAndDestroy(['adapter', 'foo', '--base-class=bar'], {
          files: [
            {
              file: 'app/adapters/foo.js',
              contains: [
                "import BarAdapter from './bar';",
                "export default BarAdapter.extend({" + EOL + "});"
              ]
            }
          ]
        });
      }
    });
  });
});
