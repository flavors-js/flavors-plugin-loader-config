'use strict';

const
  assert = require('assert'),
  getOptions = require('../getOptions');

describe('loader', () => {
  it('overrides plugin options', () => {
    assert.deepEqual(getOptions({ configDirName: 'config' }, { configDirName: 'pluginConfig' }), { configDirName: 'config' });
  });
  it('chains transforms', () => {
    assert.deepEqual(getOptions({ transform: _ => ({ value3: _.value2 + 1 }) }, { transform: _ => ({ value2: _.value1 + 1 }) }).transform({ value1: 1 }), { value3: 3 });
  });
  it('overrides plugin transform', () => {
    assert.deepEqual(getOptions({ overrideTransform: true, transform: _ => ({ value3: _.value2 + 1 }) }, { transform: _ => ({ value2: _.value1 + 1 }) }).transform({ value1: 1, value2: 1 }), { value3: 2 });
  });
  it('prepends plugin transformers', () => {
    assert.deepEqual(getOptions({ loaders: [() => 1]}, { loaders: [() => 2]}).loaders.map(_ => _()), [2, 1]);
  });
  it('overrides plugin loaders', () => {
    assert.deepEqual(getOptions({ loaders: [() => 1], overrideLoaders: true}, { loaders: [() => 2]}).loaders.map(_ => _()), [1]);
  });
});
