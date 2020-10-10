const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');

const app = express();
const port = process.env['REACT_APP_PORT'];
const config = require('./webpack.config.js');
const compiler = webpack(config);

const middleware = webpackMiddleware(compiler, {
  publicPath: config.output.publicPath,
  serverSideRender: false,
  watchOptions: {
    ignored: /.*/
  }
});

app.use(middleware);

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

app.listen(port, () => {
  console.log(
    'Launching app... http://localhost:' + port + '\n'
  );
});

try { pjs.register(app, middleware); } catch (error) { }
