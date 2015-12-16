'use strict';

var EOL                = require('os').EOL;
var setupTestHooks     = require('ember-cli-blueprint-test-helpers/lib/helpers/setup');
var BlueprintHelpers   = require('ember-cli-blueprint-test-helpers/lib/helpers/blueprint-helper');
var generateAndDestroy = BlueprintHelpers.generateAndDestroy;

describe('Acceptance: ember generate and destroy view', function() {
  setupTestHooks(this);
  
  it('view foo', function() {
    return generateAndDestroy(['view', 'foo'], {
      files: [
        {
          file: 'app/views/foo.js',
          contains: [
            "import Ember from 'ember';",
            "export default Ember.View.extend({" + EOL + "})"
          ]
        },
        {
          file: 'tests/unit/views/foo-test.js',
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('view:foo'"
          ]
        }
      ]
    });
  });

  it('view foo/bar', function() {
    return generateAndDestroy(['view', 'foo/bar'], {
      files: [
        {
          file: 'app/views/foo/bar.js',
          contains: [
            "import Ember from 'ember';",
            "export default Ember.View.extend({" + EOL + "})"
          ]
        },
        {
          file: 'tests/unit/views/foo/bar-test.js',
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('view:foo/bar'"
          ]
        }
      ]
    });
  });
  
  it('in-addon view foo', function() {
    return generateAndDestroy(['view', 'foo'], {
      target: 'addon',
      files: [
        {
          file: 'addon/views/foo.js',
          contains: [
            "import Ember from 'ember';",
            "export default Ember.View.extend({" + EOL + "})"
          ]
        },
        {
          file: 'app/views/foo.js',
          contains: [
            "export { default } from 'my-addon/views/foo';"
          ]
        },
        {
          file: 'tests/unit/views/foo-test.js',
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('view:foo'"
          ]
        }
      ]
    });
  });

  it('in-addon view foo/bar', function() {
    return generateAndDestroy(['view', 'foo/bar'], {
      target: 'addon',
      files: [
        {
          file: 'addon/views/foo/bar.js',
          contains: [
            "import Ember from 'ember';",
            "export default Ember.View.extend({" + EOL + "})"
          ]
        },
        {
          file: 'app/views/foo/bar.js',
          contains: [
            "export { default } from 'my-addon/views/foo/bar';"
          ]
        },
        {
          file: 'tests/unit/views/foo/bar-test.js',
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('view:foo/bar'"
          ]
        }
      ]
    });
  });
  
  it('dummy view foo', function() {
    return generateAndDestroy(['view', 'foo', '--dummy'], {
      target: 'addon',
      files: [
        {
          file: 'tests/dummy/app/views/foo.js',
          contains: [
            "import Ember from 'ember';",
            "export default Ember.View.extend({" + EOL + "})"
          ]
        },
        {
          file: 'app/views/foo.js',
          exists: false
        },
        {
          file: 'tests/unit/views/foo-test.js',
          exists: false
        }
      ]
    });
  });

  it('dummy view foo/bar', function() {
    return generateAndDestroy(['view', 'foo/bar', '--dummy'], {
      target: 'addon',
      files: [
        {
          file: 'tests/dummy/app/views/foo/bar.js',
          contains: [
            "import Ember from 'ember';",
            "export default Ember.View.extend({" + EOL + "})"
          ]
        },
        {
          file: 'app/views/foo/bar.js',
          exists: false
        },
        {
          file: 'tests/unit/views/foo/bar-test.js',
          exists: false
        }
      ]
    });
  });
  
  it('in-repo-addon view foo', function() {
    return generateAndDestroy(['view', 'foo', '--in-repo-addon=my-addon'], {
      target: 'inRepoAddon',
      files: [
        {
          file: 'lib/my-addon/addon/views/foo.js',
          contains: [
            "import Ember from 'ember';",
            "export default Ember.View.extend({" + EOL + "})"
          ]
        },
        {
          file: 'lib/my-addon/app/views/foo.js',
          contains: [
            "export { default } from 'my-addon/views/foo';"
          ]
        },
        {
          file: 'tests/unit/views/foo-test.js',
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('view:foo'"
          ]
        }
      ]
    });
  });

  it('in-repo-addon view foo/bar', function() {
    return generateAndDestroy(['view', 'foo/bar', '--in-repo-addon=my-addon'], {
      target: 'inRepoAddon',
      files: [
        {
          file: 'lib/my-addon/addon/views/foo/bar.js',
          contains: [
            "import Ember from 'ember';",
            "export default Ember.View.extend({" + EOL + "})"
          ]
        },
        {
          file: 'lib/my-addon/app/views/foo/bar.js',
          contains: [
            "export { default } from 'my-addon/views/foo/bar';"
          ]
        },
        {
          file: 'tests/unit/views/foo/bar-test.js',
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('view:foo/bar'"
          ]
        }
      ]
    });
  });

/**
* Pod tests
*
*/

  it('view foo --pod', function() {
    return generateAndDestroy(['view', 'foo', '--pod'], {
      files: [
        {
          file: 'app/foo/view.js',
          contains: [
            "import Ember from 'ember';",
            "export default Ember.View.extend({" + EOL + "})"
          ]
        },
        {
          file: 'tests/unit/foo/view-test.js',
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('view:foo'"
          ]
        }
      ]
    });
  });

  it('view foo --pod podModulePrefix', function() {
    return generateAndDestroy(['view', 'foo', '--pod'], {
      podModulePrefix: true,
      files: [
        {
          file: 'app/pods/foo/view.js',
          contains: [
            "import Ember from 'ember';",
            "export default Ember.View.extend({" + EOL + "})"
          ]
        },
        {
          file: 'tests/unit/pods/foo/view-test.js',
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('view:foo'"
          ]
        }
      ]
    });
  });

  it('view foo/bar --pod', function() {
    return generateAndDestroy(['view', 'foo/bar', '--pod'], {
      files: [
        {
          file: 'app/foo/bar/view.js',
          contains: [
            "import Ember from 'ember';",
            "export default Ember.View.extend({" + EOL + "})"
          ]
        },
        {
          file: 'tests/unit/foo/bar/view-test.js',
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('view:foo/bar'"
          ]
        }
      ]
    });
  });

  it('view foo/bar --pod podModulePrefix', function() {
    return generateAndDestroy(['view', 'foo/bar', '--pod'], {
      podModulePrefix: true,
      files: [
        {
          file: 'app/pods/foo/bar/view.js',
          contains: [
            "import Ember from 'ember';",
            "export default Ember.View.extend({" + EOL + "})"
          ]
        },
        {
          file: 'tests/unit/pods/foo/bar/view-test.js',
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('view:foo/bar'"
          ]
        }
      ]
    });
  });

});