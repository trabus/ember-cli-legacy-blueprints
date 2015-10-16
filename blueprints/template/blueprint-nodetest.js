'use strict';

var EOL                = require('os').EOL;
var setupTestHooks     = require('ember-cli-blueprint-test-helpers/lib/helpers/setup');
var BlueprintHelpers   = require('ember-cli-blueprint-test-helpers/lib/helpers/blueprint-helper');
var generateAndDestroy = BlueprintHelpers.generateAndDestroy;

describe('Acceptance: ember generate and destroy template', function() {
  setupTestHooks(this);
  
  it('template foo', function() {
    return generateAndDestroy(['template', 'foo'], {
      files: [
        {
          file: 'app/templates/foo.hbs',
          contains: ''
        }
      ]
    });
  });
  
  it('in-addon template foo', function() {
    return generateAndDestroy(['template', 'foo'], {
      files: [
        {
          file: 'addon/templates/foo.hbs',
          contains: ''
        }
      ]
    });
  });

  it('in-addon template foo/bar', function() {
    return generateAndDestroy(['template', 'foo/bar'], {
      files: [
        {
          file: 'addon/templates/foo/bar.hbs',
          contains: ''
        }
      ]
    });
  });
});