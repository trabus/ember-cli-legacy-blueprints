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
          file: 'app/adapters/foo.js',
          contains: [
            "import ApplicationAdapter from \'./application\';",
            "export default ApplicationAdapter.extend({" + EOL + "});"
          ]
        },
        {
          file: 'tests/unit/adapters/foo-test.js',
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
      throws: {
        message: /Adapters cannot extend from themself/,
        type: 'SilentError'
      }
    });
  });

  it('adapter foo cannot extend from --base-class=foo', function() {
    return generateAndDestroy(['adapter', 'foo', '--base-class=foo'], {
      throws: {
        message: /Adapters cannot extend from themself/,
        type: 'SilentError'
      }
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
          skipInit: true,
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
          skipInit: true,
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
  
  it('in-addon adapter application', function() {
    return generateAndDestroy(['adapter', 'application'], {
      target: 'addon',
      files: [
        {
          file: 'addon/adapters/application.js',
          contains: [
            "import DS from \'ember-data\';",
            "export default DS.RESTAdapter.extend({" + EOL + "});"
          ]
        },
        {
          file: 'app/adapters/application.js',
          contains: [
            "export { default } from 'my-addon/adapters/application';"
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

  it('in-addon adapter foo', function() {
    return generateAndDestroy(['adapter', 'foo'], {
      target: 'addon',
      files: [
        {
          file: 'addon/adapters/foo.js',
          contains: [
            "import DS from \'ember-data\';",
            "export default DS.RESTAdapter.extend({" + EOL + "});"
          ]
        },
        {
          file: 'app/adapters/foo.js',
          contains: [
            "export { default } from 'my-addon/adapters/foo';"
          ]
        },
        {
          file: 'tests/unit/adapters/foo-test.js',
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('adapter:foo'"
          ]
        }
      ]
    });
  });

  it('in-addon adapter foo/bar (with base class foo)', function() {
    return generateAndDestroy(['adapter', 'foo/bar', '--base-class=foo'], {
      target: 'addon',
      files: [
        {
          file: 'addon/adapters/foo/bar.js',
          contains: [
            "import FooAdapter from \'../foo\';",
            "export default FooAdapter.extend({" + EOL + "});"
          ]
        },
        {
          file: 'app/adapters/foo/bar.js',
          contains: [
            "export { default } from 'my-addon/adapters/foo/bar';"
          ]
        },
        {
          file: 'tests/unit/adapters/foo/bar-test.js',
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('adapter:foo/bar'"
          ]
        }
      ]
    });
  });
  
  it('in-repo-addon adapter application', function() {
    return generateAndDestroy(['adapter', 'application', '--in-repo-addon=my-addon'], {
      target: 'inRepoAddon',
      files: [
        {
          file: 'lib/my-addon/addon/adapters/application.js',
          contains: [
            "import DS from \'ember-data\';",
            "export default DS.RESTAdapter.extend({" + EOL + "});"
          ]
        }, 
        {
          file: 'lib/my-addon/app/adapters/application.js',
          contains: [
            "export { default } from 'my-addon/adapters/application';"
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

  it('in-repo-addon adapter foo', function() {
    return generateAndDestroy(['adapter', 'foo', '--in-repo-addon=my-addon'], {
      target: 'inRepoAddon',
      files: [
        {
          file: 'lib/my-addon/addon/adapters/foo.js',
          contains: [
            "import DS from \'ember-data\';",
            "export default DS.RESTAdapter.extend({" + EOL + "});"
          ]
        }, 
        {
          file: 'lib/my-addon/app/adapters/foo.js',
          contains: [
            "export { default } from 'my-addon/adapters/foo';"
          ]
        }, 
        {
          file: 'tests/unit/adapters/foo-test.js',
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('adapter:foo'"
          ]
        }
      ]
    });
  });

  it('in-repo-addon adapter foo/bar (with base class foo)', function() {
    return generateAndDestroy(['adapter', 'foo/bar', '--in-repo-addon=my-addon', '--base-class=foo'], {
      target: 'inRepoAddon',
      files: [
        {
          file: 'lib/my-addon/addon/adapters/foo/bar.js',
          contains: [
            "import FooAdapter from \'../foo\';",
            "export default FooAdapter.extend({" + EOL + "});"
          ]
        }, 
        {
          file: 'lib/my-addon/app/adapters/foo/bar.js',
          contains: [
            "export { default } from 'my-addon/adapters/foo/bar';"
          ]
        }, 
        {
          file: 'tests/unit/adapters/foo/bar-test.js',
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('adapter:foo/bar'"
          ]
        }
      ]
    });
  });

/**
* Pod tests
*
*/
  it('adapter application --pod', function() {
    return generateAndDestroy(['adapter', 'application', '--pod'], {
      files: [
        {
          file: 'app/application/adapter.js',
          contains: [
            "import DS from \'ember-data\';",
            "export default DS.RESTAdapter.extend({" + EOL + "});"
          ]
        },
        {
          file: 'tests/unit/application/adapter-test.js',
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('adapter:application'"
          ]
        }
      ]
    });
  });

  it('adapter foo --pod', function() {
    return generateAndDestroy(['adapter', 'foo', '--pod'], {
      files: [
        {
          file: 'app/foo/adapter.js',
          contains: [
            "import ApplicationAdapter from \'./application\';",
            "export default ApplicationAdapter.extend({" + EOL + "});"
          ]
        },
        {
          file: 'tests/unit/foo/adapter-test.js',
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('adapter:foo'"
          ]
        }
      ]
    });
  });

  it('adapter foo --pod podModulePrefix', function() {
    return generateAndDestroy(['adapter', 'foo', '--pod'], {
      podModulePrefix: true,
      files: [
        {
          file: 'app/pods/foo/adapter.js',
          contains: [
            "import ApplicationAdapter from \'./application\';",
            "export default ApplicationAdapter.extend({" + EOL + "});"
          ]
        },
        {
          file: 'tests/unit/pods/foo/adapter-test.js',
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('adapter:foo'"
          ]
        }
      ]
    });
  });

  it('adapter foo/bar --pod', function() {
    return generateAndDestroy(['adapter', 'foo/bar', '--pod'], {
      files: [
        {
          file: 'app/foo/bar/adapter.js',
          contains: [
            "import ApplicationAdapter from \'../application\';",
            "export default ApplicationAdapter.extend({" + EOL + "});"
          ]
        }
      ]
    });
  });

  it('adapter foo/bar --pod podModulePrefix', function() {
    return generateAndDestroy(['adapter', 'foo/bar', '--pod'], {
      podModulePrefix: true,
      files: [
        {
          file: 'app/pods/foo/bar/adapter.js',
          contains: [
            "import ApplicationAdapter from \'../application\';",
            "export default ApplicationAdapter.extend({" + EOL + "});"
          ]
        }
      ]
    });
  });

  it('adapter application cannot extend from --base-class=application', function() {
    return generateAndDestroy(['adapter', 'application', '--base-class=application', '--pod'], {
      throws: {
        message: /Adapters cannot extend from themself/,
        type: 'SilentError'
      }
    });
  });

  it('adapter foo cannot extend from --base-class=foo', function() {
    return generateAndDestroy(['adapter', 'foo', '--base-class=foo', '--pod'], {
      throws: {
        message: /Adapters cannot extend from themself/,
        type: 'SilentError'
      }
    });
  });

  it('adapter --pod extends from --base-class=bar', function() {
    return generateAndDestroy(['adapter', 'foo', '--base-class=bar', '--pod'], {
      files: [
        {
          file: 'app/foo/adapter.js',
          contains: [
            "import BarAdapter from './bar';",
            "export default BarAdapter.extend({" + EOL + "});"
          ]
        }
      ]
    });
  });

  it('adapter --pod extends from --base-class=foo/bar', function() {
    return generateAndDestroy(['adapter', 'foo/baz', '--base-class=foo/bar', '--pod'], {
      files: [
        {
          file: 'app/foo/baz/adapter.js',
          contains: [
            "import FooBarAdapter from '../foo/bar';",
            "export default FooBarAdapter.extend({" + EOL + "});"
          ]
        }
      ]
    });
  });

  it('adapter --pod extends from application adapter if present', function() {
    return generateAndDestroy(['adapter', 'application'], {
      afterGenerate: function() {
        return generateAndDestroy(['adapter', 'foo', '--pod'], {
          skipInit: true,
          files: [
            {
              file: 'app/foo/adapter.js',
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

  it('adapter --pod favors  --base-class over  application', function() {
    return generateAndDestroy(['adapter', 'application'], {
      afterGenerate: function() {
        return generateAndDestroy(['adapter', 'foo', '--base-class=bar', '--pod'], {
          skipInit: true,
          files: [
            {
              file: 'app/foo/adapter.js',
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
