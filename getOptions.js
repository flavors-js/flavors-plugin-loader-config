'use strict';

const deepmerge = require('deepmerge');

module.exports = (options, pluginOptions) => {
  pluginOptions = pluginOptions || {};
  const result = deepmerge(pluginOptions, options);

  let loaders = options.loaders;
  if (!options.overrideLoaders && pluginOptions.loaders) {
    loaders = [...pluginOptions.loaders, ...(loaders || [])];
  }
  if (loaders) {
    result.loaders = loaders;
  }

  let transform = options.transform;
  if (!options.overrideTransform && pluginOptions.transform) {
    if (transform) {
      const transform2 = transform, transform1 = pluginOptions.transform;
      transform = (config, info) => transform2(transform1(config, info), info);
    } else {
      transform = pluginOptions.transform;
    }
  }
  if (transform) {
    result.transform = transform;
  }

  let merge = options.merge;
  if (pluginOptions.merge) {
    if (!merge) {
      merge = require('flavors').defaultOptions.merge;
    }
    const merge2 = merge, merge1 = pluginOptions.merge;
    merge = (x, y) => deepmerge(merge2(x, y), merge1(x, y), {arrayMerge: (d, s) => s});
  }
  if (merge) {
    result.merge = merge;
  }

  return result;
};
