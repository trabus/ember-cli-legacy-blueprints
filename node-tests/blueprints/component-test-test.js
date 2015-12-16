'use strict';

var EOL                = require('os').EOL;
var setupTestHooks     = require('ember-cli-blueprint-test-helpers/lib/helpers/setup');
var BlueprintHelpers   = require('ember-cli-blueprint-test-helpers/lib/helpers/blueprint-helper');
var generateAndDestroy = BlueprintHelpers.generateAndDestroy;

describe('Acceptance: ember generate and destroy component-test', function() {
  setupTestHooks(this);

  it('component-test x-foo', function() {
    return generateAndDestroy(['component-test', 'x-foo'], {
      files: [
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

  it('component-test x-foo --unit', function() {
    return generateAndDestroy(['component-test', 'x-foo', '--unit'], {
      files: [
        {
          file: 'tests/unit/components/x-foo-test.js',
          contains: [
            "import { moduleForComponent, test } from 'ember-qunit';",
            "moduleForComponent('x-foo'",
            "unit: true"
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
  
  it('dummy component-test x-foo', function() {
    return generateAndDestroy(['component-test', 'x-foo', '--dummy'], {
      target: 'addon',
      files: [
        {
          file: 'tests/integration/components/x-foo-test.js',
          contains: [
            "import { moduleForComponent, test } from 'ember-qunit';",
            "import hbs from 'htmlbars-inline-precompile';",
            "moduleForComponent('x-foo'"
          ]
        },
        {
          file: 'app/component-test/x-foo.js',
          exists: false
        }
      ]
    });
  });

});