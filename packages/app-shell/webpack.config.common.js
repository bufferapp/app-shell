const path = require('path');

module.exports = {
  entry: './src/exports/main.js',
  output: {
    filename: './[name].js',
    clean: true,
  },
   module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use: {
          loader: "babel-loader",
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};
