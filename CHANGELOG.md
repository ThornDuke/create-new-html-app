# Change Log

<!--
## [Unreleased] | [major.minor.patch] - yyyy-mm-dd
### Added | Fixed | Changed | Removed | Deprecated | Security
- <filename> {section}: description
(example: https://gist.github.com/ThornDuke/64da76cd4a56b16492d5101691f6108f)
-->

## [Unreleased]

### Changed

- <templates.js> {prettier}: `jsxBracketSameLine` is deprecated; now uses `bracketSameLine`

## [1.4.3] - 2024-06-15

### Added

- <filedescriptions.js>: abstraction of the files
- <cnha>: an alias for `create-new-html-app
- <README.md> {How to use}: Instructions about the alias `cnha`
- <README.md> {badges}: foobar2000

### Changed

- <templates.js> {launch}: `configurations.file` more abstract
- <templates.js> {greetings}: an airplane

## [1.4.2] - 2024-06-01

### Added

- <templates.js> {vscodesettings}: created
- <index.js>: create the `.vscode/settings.json` file
- <README.md>: reference to `.vscode/settings.json`
- <index.js>: clear the screen (if possible) before the output

### Changed

- <templates.js> {html}: the `script` tag is moved into the `head` section with a `defer` attribute,
  thus supporting a
- <templates.js> {prettier}: `printWidth` now is 100

## [1.4.1] - 2024-05-24

### Added

- <index.js>: error control in the directory creation
- <README.md>: some badges correctly linked
- <LICENCE>: finally added

### Changed

- <index.js>: relocated `.gitignore` creation
- <index.js>: better coding style
- <templates.js>: better coding style
- <templates.js> {readme}: the overview now is a chapter on his own
- <README.md>: codeblock languages according to ace-mode

## [1.4.0] - 2024-05-16

### Added

- <exitcodes.js>: git error code
- <.npmignore>: smaller bundle
- <index.js>: notify the success of the operation with the word 'done'

### Fixed

- <README.md>: markdown rule MD014

### Changed

- <index.js>: git error notification
- <index.js>: reviewed the ovrewriting of the already-existent project
- <index.js>: <.gitignore> is created only if `git` is present on the system
- <templates.js> {gitIgnore()}: ignore `.prettierrc` too
- <templates.js>: modified the export strategy
- <exitcodes.js>: modified the export strategy
- <index.js>: colored the terminal output
- <templates.js>: colored the terminal output
- <index.js>: relocated the git warn

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

### Added

- <index.js>: When it creates a project initializes a git repo in it
- <index.js>: Uses chalks and shelljs
- <README.md>: badges
-

### Fixed

- Various bugs

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
