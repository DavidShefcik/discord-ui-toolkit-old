const path = require("path");

module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
  ],
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'discord-ui-toolkit': path.resolve(__dirname, '../src/index'),
      '@inputs': path.resolve(__dirname, '../src/components/inputs/'),
      '@internal': path.resolve(__dirname, '../src/components/internal/'),
      '@layout': path.resolve(__dirname, '../src/components/layout/'),
      '@lists': path.resolve(__dirname, '../src/components/lists/'),
      '@components': path.resolve(__dirname, '../src/components/'),
      '@assets': path.resolve(__dirname, '../src/assets/'),
    };
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  }
}