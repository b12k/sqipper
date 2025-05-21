import jsPlugin from '@eslint/js';
import progressPlugin from 'eslint-plugin-file-progress';
import { flatConfigs as importPluginFlatConfigs } from 'eslint-plugin-import-x';
import perfectionistPlugin from 'eslint-plugin-perfectionist';
import prettierPlugin from 'eslint-plugin-prettier/recommended';
import unicornPlugin from 'eslint-plugin-unicorn';
import { globalIgnores } from 'eslint/config';
import globals from 'globals';
import {
  config as createTsConfig,
  configs as tsConfigs,
} from 'typescript-eslint';

export default createTsConfig(
  globalIgnores(['dist', 'node_modules']),
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  jsPlugin.configs.recommended,
  ...tsConfigs.recommended,
  unicornPlugin.configs.all,
  importPluginFlatConfigs.recommended,
  importPluginFlatConfigs.typescript,
  perfectionistPlugin.configs['recommended-natural'],
  prettierPlugin,
  progressPlugin.configs.recommended,
  {
    rules: {
      'import-x/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: ['!**/src/**/*'],
        },
      ],
      'unicorn/no-array-for-each': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/prefer-global-this': 'off',
      'unicorn/prefer-module': 'off',
      'unicorn/prefer-top-level-await': 'off',
      'unicorn/prevent-abbreviations': [
        'error',
        {
          allowList: {
            Dir: true,
            dir: true,
            Env: true,
            env: true,
            props: true,
            Props: true,
            utils: true,
            Utils: true,
          },
        },
      ],
    },
  },
);
