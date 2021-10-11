import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import ts from 'rollup-plugin-ts';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';
import alias from '@rollup/plugin-alias';
import url from '@rollup/plugin-url';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import copy from 'rollup-plugin-copy';
import json from '@rollup/plugin-json';

import path from 'path';

/* eslint-disable-next-line */
const packageJson = require('./package.json');

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    image(),
    peerDepsExternal(),
    resolve({
      browser: true,
      dedupe: ['react', 'react-dom'],
    }),
    commonjs(),
    typescriptPaths(),
    url({
      include: ['**/*.svg', '**/*.png', '**/*.jp(e)?g', '**/*.gif', '**/*.webp', '**/*.webm'],
    }),
    copy({
      targets: [
        {
          src: './src/assets/',
          dest: 'build',
        },
      ],
    }),
    ts({
      tsconfig: 'tsconfig.build.json',
    }),
    json(),
    alias({
      entries: [
        {
          find: '@assets',
          replacement: path.resolve(__dirname, 'src/assets'),
        },
      ],
    }),
    postcss(),
  ],
};
