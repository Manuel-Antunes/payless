/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['@payless/ui']);
const withImages = require('next-images');
const relay = require('./relay.config');

module.exports = {
  reactStrictMode: true,
  compiler: {
    relay,
  },
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      // Ensures no server modules are included on the client.
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /lib\/server/,
        }),
      );
    }

    return config;
  },
  ...withTM({
    esModule: true,
  }),
  ...withImages(),
};
