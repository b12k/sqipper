const SCRIPTS = '*.{js,ts}';
const PACKAGE_JSON = 'package.json';
const OTHER = `!(${[SCRIPTS, PACKAGE_JSON].join('|')})`;

const tsc = () => 'bun _tsc';
const eslint = 'bun _eslint --fix';
const prettier = 'bun _prettier -w';
const sortPackageJson = 'bun _sort-package-json';

export default {
  [`${SCRIPTS}|SCRIPTS`]: eslint,
  [`${SCRIPTS}}|TYPES`]: tsc,
  [OTHER]: prettier,
  [PACKAGE_JSON]: [sortPackageJson, prettier],
};
