'use strict';

var setupTestHooks     = require('ember-cli-blueprint-test-helpers/lib/helpers/setup');
var BlueprintHelpers   = require('ember-cli-blueprint-test-helpers/lib/helpers/blueprint-helper');
var generateAndDestroy = BlueprintHelpers.generateAndDestroy;
var EOL                = require('os').EOL;
var tmpenv             = require('ember-cli-blueprint-test-helpers/lib/helpers/tmp-env');

describe('Acceptance: ember generate component', function() {
  setupTestHooks(this, 20000, tmpenv);
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

});