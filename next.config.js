const webpack = require('webpack');
require('dotenv').config();

console.log('Using next config', process.env.NODE_ENV);
const nextSettings = {
    webpack: (config) => {
        config.plugins.push(new webpack.EnvironmentPlugin(process.env));
        return config;
    },
    publicRuntimeConfig: {
        // Will only be available on the server side
        apiHost: process.env.API_HOST,
    },
};
module.exports = nextSettings;
