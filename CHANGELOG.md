# Change Log

<!--
## [Unreleased] | [major.minor.patch] - yyyy-mm-dd

### Added | Fixed | Changed | Removed | Deprecated | Security

- filename {section}: description

(example: https://gist.github.com/ThornDuke/64da76cd4a56b16492d5101691f6108f)
-->

## [Unreleased]

### Added

- <exitcodes.js>: git error code
- <.npmignore>: smaller bundle

### Changed

- <index.js>: git error notification
- <index.js>: <.gitignore> is created only if `git` is present on the system
- <templates.js> {gitIgnore()}: ignore `.prettierrc` too
- <index.js>: colored the terminal output
- <templates.js>: colored the terminal output

### Fixed

- <README.md>: markdown rule MD014

## [1.3.2] - 2024-05-14

### Added

- <README.md>: badges
- <index.js>: a helper function that sends errors to the terminal
- <templates.js> {changelog}: online example

### Changed

- <templates.js> {changelog}: more understandable
- <index.js>: the console is everywhere replaced by the terminal
- <index.js>: rationalized the output to the terminal
- <README.md>: shorter explanation and other details
- <package.json> {description}: better description

## [1.3.1] - 2024-05-13

### Fixed

- <index.js>: fixed the path reference
- <templates.js>: fixed the path reference

## [1.3.0] - 2024-05-13

### Fixed

- Various bugs

### Added

- <index.js>: When it creates a project initializes a git repo in it
- <index.js>: Uses chalks and shelljs
- <README.md>: badges

## [1.2.0] - 2024-05-12

- <index.js>: debugged; a better system to check for existing folders.
- <exitcodes.js>: exports

## [1.1.0] - 2024-05-12

First release

- Setted a bin system
- Updated <package.json> for the publication

## [1.0.0] - 2024-05-12

- Working application
- Strings translated
