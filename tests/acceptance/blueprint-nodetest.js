'use strict';

var expect           = require('chai').expect;
var assertFile       = require('ember-cli-internal-test-helpers/lib/helpers/assert-file');
var EOL              = require('os').EOL;
var setupTestHooks   = require('ember-cli-blueprint-test-helpers/lib/helpers/setup');
var BlueprintHelpers = require('ember-cli-blueprint-test-helpers/lib/helpers/blueprint-helper');
var generate            = BlueprintHelpers.generate;
var destroy             = BlueprintHelpers.destroy;
var generateAndDestroy  = BlueprintHelpers.generateAndDestroy;
describe('Acceptance: legacy-blueprints', function() {
  setupTestHooks(this);
  it('setup', function(){
    return generate(['controller', 'foo'], {
      assertions: [true]
    });
  });
  
  it('.ember-cli usePods setting generates in pod structure without --pod flag', function() {
    return generateAndDestroy(['controller', 'foo'], {
      usePods: true,
      files: [
        {
          file: 'app/foo/controller.js',
          contains: [
            "import Ember from 'ember';",
            "export default Ember.Controller.extend({" + EOL + "});"
          ]
        }, 
        {
          file: 'tests/unit/foo/controller-test.js',
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('controller:foo'"
          ]
        }
      ]
    });
  });
  
  it('controller foo', function() {
    return generateAndDestroy(['controller', 'foo'], {
      target: 'app',
      beforeGenerate: function(result) {
        console.log('beforeGenerate:',result);
        return;
      },
      afterGenerate: function(result) {
        console.log('afterGenerate:',result);
        return;
      },
      beforeDestroy: function(result) {
        console.log('beforeDestroy:', result);
        return;
      },
      afterDestroy: function(result) {
        console.log('afterDestroy:',result);
        return;
      },
      files: [
        { file: 'app/controllers/foo.js', 
          contains: [
            "import Ember from 'ember';",
            "export default Ember.Controller.extend({" + EOL + "});"
          ]
        },
        { file: 'tests/unit/controllers/foo-test.js',
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('controller:foo'"
          ]
        }
      ]
    });
  });
  
  it('in-repo-addon controller foo', function() {
    return generateAndDestroy(['controller', 'foo'], {
      target:'inRepoAddon',
      files:[
        {
          file: 'lib/my-addon/addon/controllers/foo.js', 
          contains: [
            "import Ember from 'ember';",
            "export default Ember.Controller.extend({" + EOL + "});"
          ]
        },
        {
          file: 'lib/my-addon/app/controllers/foo.js', 
          contains: [
            "export { default } from 'my-addon/controllers/foo';"
          ]
        },
        {
          file:'tests/unit/controllers/foo-test.js',
          contains: [
            "import { moduleFor, test } from 'ember-qunit';",
            "moduleFor('controller:foo'"
          ]
        }
      ]
    });
  });
});