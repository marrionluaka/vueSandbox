const path = require('path')
const rootPath = path.resolve(__dirname, '../')

module.exports = async ({ config }) => {
  config.module.rules.push({
    test: /\.pug$/,
    loader: 'pug-plain-loader',
  })

  config.module.rules.push({
    test: /\.styl(us)?$/,
    use: ['style-loader', 'vue-style-loader', {
      loader: 'css-loader',
      options: {
        sourceMap: true,
        importLoaders: 2,
        onlyLocals: false
      }
    },
    {
      loader: 'stylus-loader',
      options: {
        sourceMap: true,
        import: [
          `${rootPath}/assets/styl/_variables.styl`
        ]
      }
    }
    ],
    include: rootPath
  })

  return config
}