const path = require('path');

module.exports = async ({ config }) => {
  // Add an alias for `react-native` to use `react-native-web`
  config.resolve.alias = {
    ...(config.resolve.alias || {}),
    'react-native$': 'react-native-web',
  };

  // Add support for `.web.js` extensions (for libraries like `react-native-web`)
  config.resolve.extensions = [
    '.web.js',
    '.web.ts',
    '.web.tsx',
    ...config.resolve.extensions,
  ];

  return config;
};