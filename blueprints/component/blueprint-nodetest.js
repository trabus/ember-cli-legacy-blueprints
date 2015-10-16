'use strict';

var setupTestHooks     = require('ember-cli-blueprint-test-helpers/lib/helpers/setup');
var BlueprintHelpers   = require('ember-cli-blueprint-test-helpers/lib/helpers/blueprint-helper');
var generateAndDestroy = BlueprintHelpers.generateAndDestroy;
var EOL                = require('os').EOL;

describe('Acceptance: ember generate component', function() {
  setupTestHooks(this);

  it('component x-foo', function() {
    return generateAndDestroy(['component', 'x-foo'], {
      files:[
        {
          file: 'app/components/x-foo.js', 
          contains: [
            "import Ember from 'ember';",
            "export default Ember.Component.extend({",
            "});"
          ]
        },
        {
          file: 'app/templates/components/x-foo.hbs', 
          contains: "{{yield}}"
        },
        {
          file: 'tests/integration/components/x-foo-test.js',
          contains: [
            "import { moduleForComponent, test } from 'ember-qunit';",
            "import hbs from 'htmlbars-inline-precompile';",
            "moduleForComponent('x-foo'",
            "integration: true",
            "{{x-foo}}",
            "{{#x-foo}}"
          ]
        }
      ]
    });
  });

  it('component foo/x-foo', function() {
    return generateAndDestroy(['component', 'foo/x-foo'], {
      files: [
        {
          file: 'app/components/foo/x-foo.js', 
          contains: [
            "import Ember from 'ember';",
            "export default Ember.Component.extend({",
            "});"
          ]
        },
        {
          file: 'app/templates/components/foo/x-foo.hbs',
          contains: "{{yield}}"
        },
        {
          file: 'tests/integration/components/foo/x-foo-test.js',
          contains: [
            "import { moduleForComponent, test } from 'ember-qunit';",
            "import hbs from 'htmlbars-inline-precompile';",
            "moduleForComponent('foo/x-foo'",
            "integration: true",
            "{{foo/x-foo}}",
            "{{#foo/x-foo}}"
          ]
        }
      ]
    });
  });

  it('component x-foo ignores --path option', function() {
    return generateAndDestroy(['component', 'x-foo', '--path', 'foo'], {
      files: [
        {
          file: 'app/components/x-foo.js',
          contains: [
            "import Ember from 'ember';",
            "export default Ember.Component.extend({",
            "});"
          ]
        },
        {
          file: 'app/templates/components/x-foo.hbs',
          contains: "{{yield}}"
        },
        {
          file: 'tests/integration/components/x-foo-test.js',
          contains: [
            "import { moduleForComponent, test } from 'ember-qunit';",
            "import hbs from 'htmlbars-inline-precompile';",
            "moduleForComponent('x-foo'",
            "integration: true",
            "{{x-foo}}",
            "{{#x-foo}}"
          ]
        }
      ]
    });
  });

  it('in-addon component x-foo', function() {
    return generateAndDestroy(['component', 'x-foo'], {
      target: 'addon',
      files: [
        {
          file:'addon/components/x-foo.js',
          contains: [
            "import Ember from 'ember';",
            "import layout from '../templates/components/x-foo';",
            "export default Ember.Component.extend({",
            "layout: layout",
            "});"
          ]
        },
        {
          file:'addon/templates/components/x-foo.hbs',
          contains: "{{yield}}"
        },
        {
          file:'app/components/x-foo.js',
          contains: [
            "export { default } from 'my-addon/components/x-foo';"
          ]
        },
        {
          file:'tests/integration/components/x-foo-test.js',
          contains: [
            "import { moduleForComponent, test } from 'ember-qunit';",
            "import hbs from 'htmlbars-inline-precompile';",
            "moduleForComponent('x-foo'",
            "integration: true",
            "{{x-foo}}",
            "{{#x-foo}}"
          ]
        }
      ]
    });
  });

  it('in-addon component-test x-foo', function() {
    return generateAndDestroy(['component-test', 'x-foo'], {
      target: 'addon',
      files: [
        {
          file:'tests/integration/components/x-foo-test.js',
          contains: [
            "import { moduleForComponent, test } from 'ember-qunit';",
            "import hbs from 'htmlbars-inline-precompile';",
            "moduleForComponent('x-foo'",
            "integration: true",
            "{{x-foo}}",
            "{{#x-foo}}"
          ]
        },
        {
          file: 'app/component-test/x-foo.js',
          exists: false
        }
      ]
    });
  });

  it('in-addon component-test x-foo --unit', function() {
    return generateAndDestroy(['component-test', 'x-foo', '--unit'], {
      target: 'addon',
      files: [
        {
          file:'tests/unit/components/x-foo-test.js',
          contains: [
            "import { moduleForComponent, test } from 'ember-qunit';",
            "moduleForComponent('x-foo'",
            "unit: true"
          ]
        },
        {
          file: 'app/component-test/x-foo.js',
          exists: false
        }
      ]
    });
  });

  it('in-addon component nested/x-foo', function() {
    return generateAndDestroy(['component', 'nested/x-foo'], {
      target: 'addon',
      files: [
        {
          file:'addon/components/nested/x-foo.js',
          contains: [
            "import Ember from 'ember';",
            "import layout from '../../templates/components/nested/x-foo';",
            "export default Ember.Component.extend({",
            "layout: layout",
            "});"
          ]
        },
        {
          file:'addon/templates/components/nested/x-foo.hbs',
          contains: "{{yield}}"
        },
        {
          file:'app/components/nested/x-foo.js',
          contains: [
            "export { default } from 'my-addon/components/nested/x-foo';"
          ]
        },
        {
          file:'tests/integration/components/nested/x-foo-test.js',
          contains: [
            "import { moduleForComponent, test } from 'ember-qunit';",
            "import hbs from 'htmlbars-inline-precompile';",
            "moduleForComponent('nested/x-foo'",
            "integration: true",
            "{{nested/x-foo}}",
            "{{#nested/x-foo}}"
          ]
        }
      ]
    });
  });
  
});