'use strict';

module.exports = (options, pluginOptions) => {
  pluginOptions = pluginOptions || {};
  let loaders = options.loaders;
  if (!options.overrideLoaders && pluginOptions.loaders) {
    loaders = [...pluginOptions.loaders, ...(loaders || [])];
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
  const result = Object.assign({}, pluginOptions, options);
  if (loaders) {
    result.loaders = loaders;
  }
  if (transform) {
    result.transform = transform;
  }
  return result;
};
