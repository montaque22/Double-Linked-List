const path                  = require('path');
const ClosureCompilerPlugin = require('webpack-closure-compiler');
const plugins               = [];
const isProduction          = process.argv.includes('-p');
const uglify                = new ClosureCompilerPlugin();
const devBuildOption        = isProduction ? '' : 'source-map';

plugins.push(uglify);

module.exports = {
    entry: ['./doubleLinkList.js'],
    output: {
        libraryTarget: "umd",
        filename: isProduction ? 'doublelinkedlist.min.js' : 'doublelinkedlist.js',
        path: path.resolve(__dirname,'dist')
    },
    devtool: devBuildOption,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    },
    plugins: isProduction ? plugins : []

};
