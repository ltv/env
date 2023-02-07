# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [3.0.0](https://github.com/ltv/env/branches/compare/v3.0.0%0Dv1.3.0) (2023-02-07)

### Features

- Safe environment parser
- Compatible with TypeScript

## Breaking Changes

In this version,

- I have removed dotenv support. If you want to use dotenv, please use the previous version. Otherwise, you should install the dotenv package yourself.
- I have removed the lodash.has and lodash.trim dependencies, and the package size has been reduced. There is no dependency anymore.

# [1.2.0](https://github.com/ltv/env/compare/v1.1.0...v1.2.0) (2021-03-28)

### Features

* add dotenv for loading process.env ([fbb1b72](https://github.com/ltv/env/commit/fbb1b72e19004e73f4cb9f1e710b35c5fedd6af1))
