const chalk = require('chalk');

const blue = chalk.cyan;
const pink = chalk.magenta;

exports.html = appName => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>${appName}</title>
    <link rel="stylesheet" href="src/styles.css" />
  </head>
  <body>

    <script src="src/script.js"></script>
  </body>
</html>`;

exports.css = appName => `/* project ${appName} */`;

exports.prettier = () => `{
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

exports.gitIgnore = () =>
  `.vscode/
.prettierrc`;

exports.launch = () => `{
  // Use IntelliSense to learn about possible attributes.
  // Existing attribute descriptions appear on mouseover.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
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

exports.changeLog = () => `# Change Log

<!--
## [Unreleased] | [major.minor.patch] - yyyy-mm-dd

### Added | Fixed | Changed | Removed | Deprecated | Security

- filename {section}: description

(example: https://gist.github.com/ThornDuke/64da76cd4a56b16492d5101691f6108f)
-->

## [Unreleased]
`;

exports.readme = appName => `# ${appName}

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

exports.js = appName =>
  `/**
 * project ${appName}
 */`;

exports.help = (appName, appVersion, appDescription) => `
${appName} v${appVersion}

${appDescription}

Usage:

${appName} <project-name>           create the project
${appName} -h, --help               print this help and exit
${appName} -V, --version            print the version number
`;

exports.greetings = appName => `${blue('###')}
${blue('###')} ${pink(`Project ${appName} created successfully`)}
${blue('###')}
${blue('###')} Happy hacking!
${blue('###')}
`;
