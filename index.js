'use strict';

module.exports = options => rawPlugin => ({
  config: require('flavors')(options.configName, require('./getOptions')(options, typeof rawPlugin === 'object' ? rawPlugin.options : undefined))
});
