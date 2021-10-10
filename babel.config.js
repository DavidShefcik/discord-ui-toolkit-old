module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
  plugins: ['emotion', '@babel/plugin-transform-runtime'],
  env: {
    production: {
      plugins: [
        'babel-plugin-jsx-remove-data-test-id',
        {
          attributes: ['data-testid'],
        },
      ],
    },
  },
};
