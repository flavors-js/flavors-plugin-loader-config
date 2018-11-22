'use strict';

const
  assert = require('assert'),
  getOptions = require('../getOptions');

describe('loader', () => {
  it('overrides plugin options', () => {
    assert.deepEqual(getOptions({configDirName: 'config'}, {configDirName: 'pluginConfig'}), {configDirName: 'config'});
  });
  it('chains transforms', () => {
    assert.deepEqual(getOptions({transform: _ => ({value3: _.value2 + 1})}, {transform: _ => ({value2: _.value1 + 1})}).transform({value1: 1}), {value3: 3});
  });
  it('overrides plugin transform', () => {
    assert.deepEqual(getOptions({
      overrideTransform: true,
      transform: _ => ({value3: _.value2 + 1})
    }, {transform: _ => ({value2: _.value1 + 1})}).transform({value1: 1, value2: 1}), {value3: 2});
  });
  it('prepends plugin transformers', () => {
    assert.deepEqual(getOptions({loaders: [() => 1]}, {loaders: [() => 2]}).loaders.map(_ => _()), [2, 1]);
  });
  it('overrides plugin loaders', () => {
    assert.deepEqual(getOptions({
      loaders: [() => 1],
      overrideLoaders: true
    }, {loaders: [() => 2]}).loaders.map(_ => _()), [1]);
  });
  it('chains merges', () => {
    assert.deepEqual(getOptions({merge: (x, y) => ({a: x, b: y, c: 3, d: 4})}, {
      merge: (x, y) => ({
        c: x,
        d: y
      })
    }).merge(1, 2), {a: 1, b: 2, c: 1, d: 2});
  });
  it('uses default merge', () => {
    assert.deepEqual(getOptions({}, {
      merge: (x, y) => ({
        d: x,
        e: y
      })
    }).merge({a: 1, b: 2}, {a: 3, c: 4}), {a: 3, b: 2, c: 4, d: {a: 1, b: 2}, e: {a: 3, c: 4}});
  });
});
