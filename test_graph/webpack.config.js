const path = require('path');

module.exports = {
  mode: "development", // could be "production" as well
  entry: './js/script.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        include: path.resolve(__dirname, 'js'),
        loader: 'babel-loader'
      }
    ]
  }
};
