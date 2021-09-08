# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [4.0.1](https://github.com/filestack/filestack-react/compare/v4.0.0...v4.0.1) (2021-09-08)


### Bug Fixes

* **picker:** PickerInline && PickerDrop missing container ([#120](https://github.com/filestack/filestack-react/issues/120)) ([ec839c6](https://github.com/filestack/filestack-react/commit/ec839c68b71237a4dae20cb0e58eaa09c7694b88)), closes [#116](https://github.com/filestack/filestack-react/issues/116)

## [4.0.0](https://github.com/filestack/filestack-react/compare/v3.2.0...v4.0.0) (2020-12-16)


### ⚠ BREAKING CHANGES

* **whole project:** We've removed source, file, action props, actionOptions is now called
pickerOptions, we've splitted picker component into 3 different one

* **whole project:** - Remove webpack, reduce bundle size, bump version, rewrite all ([be2a01a](https://github.com/filestack/filestack-react/commit/be2a01a5e79c637d29de261a679752b0a34b3bf3)), closes [#103](https://github.com/filestack/filestack-react/issues/103) [#82](https://github.com/filestack/filestack-react/issues/82) [#77](https://github.com/filestack/filestack-react/issues/77) [#74](https://github.com/filestack/filestack-react/issues/74)

### [3.2.1](https://github.com/filestack/filestack-react/compare/v3.2.0...v3.2.1) (2020-07-29)

## [3.2.0](https://github.com/filestack/filestack-react/compare/v3.1.0...v3.2.0) (2020-07-29)


### Features

* 🎸 add typescript type definitions ([f7a4e80](https://github.com/filestack/filestack-react/commit/f7a4e80ab44edb1e0e0858d65a9ed1c3e7214e8c))

# [3.1.0](https://github.com/filestack/filestack-react/compare/v3.0.1...v3.1.0) (2019-07-29)


### Features

* **componentDisplayMode:** Merge passed a prop object with a default ([#71](https://github.com/filestack/filestack-react/issues/71)) ([49ae02f](https://github.com/filestack/filestack-react/commit/49ae02f))



## [3.0.1](https://github.com/filestack/filestack-react/compare/v3.0.0...v3.0.1) (2019-06-28)
- Update demo dependencies


## [3.0.0](https://github.com/filestack/filestack-react/compare/v2.0.6...v3.0.0) (2019-06-03)

### features
- [BREAKING CHANGE] Refactor a structure of component props
- Add posibility to display picker immediately after component was mounted

### updates
- Update filestack-js to 3.x.x

### others
- Update readme

## [2.0.6](https://github.com/filestack/filestack-react/compare/v2.0.5...v2.0.6) (2019-05-06)

### updates
- Update filestack-js to 2.1.0

## [2.0.5](https://github.com/filestack/filestack-react/compare/v2.0.4...v2.0.5) (2019-04-18)

### updates
- Update filestack-js to 2.0.7

## [2.0.4](https://github.com/filestack/filestack-react/compare/v2.0.3...v2.0.4) (2019-04-15)

### fixes
- Fix demo page

### updates
- Update filestack-js to 2.0.6


## [2.0.3](https://github.com/filestack/filestack-react/compare/v2.0.2...v2.0.3) (2019-04-12)

### updates
- Update filestack-js to 2.0.5

## 2.0.2 (2019-02-25)

### features
- Added a new preload option (According to the https://github.com/filestack/filestack-react/issues/42)

## 2.0.1 (February 25, 2019)

### updates
- Updated most of the dependencies to the newest version including filestack-js lib.

### others
- Update readme, add new demo


## 2.0.0 (June 6, 2018)

- Updated to support filestack-js 1.0 and React 16.0 as peer dependencies.

## 1.0.0 (June 10, 2017)

- Officially changed name to filestack-react

### features

- Added LICENSE and CHANGELOG files.
- Added CONTRIBUTING to set the rules of making changes to the package.

### bug fixes

- Updated `react`, `react-dom` and `prop-types` to the latest versions to remove
<pre>Calling PropTypes validators directly is not supported by the `prop-types` package.
Use PropTypes.checkPropTypes() to call them.</pre>
