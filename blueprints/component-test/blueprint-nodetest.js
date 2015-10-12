'use strict';

var EOL                = require('os').EOL;
var tmpenv             = require('ember-cli-blueprint-test-helpers/lib/helpers/tmp-env');
var setupTestHooks     = require('ember-cli-blueprint-test-helpers/lib/helpers/setup');
var BlueprintHelpers   = require('ember-cli-blueprint-test-helpers/lib/helpers/blueprint-helper');
var generateAndDestroy = BlueprintHelpers.generateAndDestroy;

describe('Acceptance: ember generate and destroy component-test', function() {
  setupTestHooks(this, 20000, tmpenv);

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

});