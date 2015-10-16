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

});