const webpack = require('webpack');
const config = require("../webpack.config.js");

var compiler = webpack(config);
compiler.run((err, stats) => {
    if (err) {
        return reject(err);
    }
})