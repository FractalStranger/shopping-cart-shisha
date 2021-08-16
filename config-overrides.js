module.exports = function override(config, env) {
  config.optimization = {
    splitChunks: {
      cacheGroups: {
        default: false,
      },
    },
  }
  config.output = {
    ...config.output,
    filename: 'static/js/shopping-cart.module.js',
    // chunkFilename: "static/js/shopping-cart.module.js",
  }

  config.plugins.map((plugin, i) => {
    if (
      plugin.options &&
      plugin.options.filename &&
      plugin.options.filename.includes('static/css')
    ) {
      config.plugins[i].options = {
        ...config.plugins[i].options,
        filename: 'static/css/shopping-cart.module.css',
      }
    }
  })
  return config
}
