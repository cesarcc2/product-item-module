import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-onboarding",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  webpackFinal: async (config) => {
    config.resolve?.symlinks ? (config.resolve.symlinks = true) : null; // enable symlinks
    config.module?.rules?.push({
      test: /\.(ts|tsx)$/,
      exclude: /node_modules\/(?!(shared-utils)\/).*/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      ],
    });

    config.resolve = {
      ...config.resolve,
      extensions: ['.ts', '.tsx', ...(config.resolve?.extensions || [])],
    };

    return config;
  },
};

export default config;
