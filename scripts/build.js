const webpack = require('webpack');
const config = require("../webpack.config.js");

var compiler = webpack(config);
compiler.run((err, stats) => {
    if (err) {
        console.log(err)
    }
})