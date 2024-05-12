const html = appName => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>${appName}</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>

    <script src="script.js"></script>
  </body>
</html>`;

const css = appName => `/* project ${appName} */`;

const prettier = () => `{
  "printWidth": 120,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "quoteProps": "as-needed",
  "jsxSingleQuote": false,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "jsxBracketSameLine": false,
  "arrowParens": "avoid",
  "proseWrap": "always",
  "htmlWhitespaceSensitivity": "css",
  "embeddedLanguageFormatting": "auto",
  "singleAttributePerLine": false
}`;

const gitIgnore = () => `.vscode`;

const launch = () => `{
  // Usare IntelliSense per informazioni sui possibili attributi.
  // Al passaggio del mouse vengono visualizzate le descrizioni degli attributi esistenti.
  // Per altre informazioni, visitare: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Open index.html",
      "file": "./index.html"
    }
  ]
}`;

const changeLog = () => `# Change Log

<!--
## [Unreleased] | [major.minor.patch] - yyyy-mm-dd
### Added | Fixed | Changed | Removed | Deprecated | Security
- filename {section}: description
-->

## [Unreleased]
`;

const readme = appName => `# ${appName}

<!-- App description -->

## Features

## Requirements

## Installation

## How to use

## Managing settings

## Known Issues

## Release Notes

## Contributing

## Acknowledgements
`;

const js = appName =>
  `/**
 * project ${appName}
 */`;

const help = (appName, appVersion, appDescription) => `
${appName} v${appVersion}

${appDescription}

Usage:

${appName} <project-name>           create the project
${appName} -h, --help               print this help and exit
${appName} -V, --version            print the version number
`;

module.exports = {
  html,
  css,
  prettier,
  gitIgnore,
  launch,
  changeLog,
  readme,
  js,
  help,
};