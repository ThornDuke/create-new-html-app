# create-new-html-app

<!--
![npms.io](https://img.shields.io/npms-io/maintenance-score/create-new-html-app?style=plastic&logo=npm&label=maintenance)
![npms.io](https://img.shields.io/npms-io/quality-score/create-new-html-app?style=plastic&logo=npm&label=quality)
![npms.io](https://img.shields.io/npms-io/popularity-score/create-new-html-app?style=plastic&logo=npm&label=popularity)
-->

[![NPM Version](https://img.shields.io/npm/v/create-new-html-app?style=plastic&logo=npm&label=version)](https://www.npmjs.com/package/create-new-html-app)
[![NPM Downloads](https://img.shields.io/npm/d18m/create-new-html-app?style=plastic&logo=npm)](https://www.npmjs.com/package/create-new-html-app)
[![NPM License](https://img.shields.io/npm/l/create-new-html-app?style=plastic&logo=GNU)](https://www.gnu.org/licenses/gpl-3.0.html)
![Node Current](https://img.shields.io/node/v/create-new-html-app?style=plastic&logo=nodedotjs&logoColor=white&logoSize=auto)
![npm bundle size](https://img.shields.io/bundlephobia/min/create-new-html-app?style=plastic&logo=webpack)

Sets up a simple HTML web app template by running one command.

## Features

It asks for a project name (`project-name`) and creates the following structure:

```text
|-- project-name/
    |-- HTML/
        |-- index.html
        |-- README.md
        |-- CHANGELOG.md
        |-- .gitignore
        |-- .prettierrc
        |-- .vscode/
            |-- launch.json
            |-- settings.json
        |-- public/
        |-- src/
            |-- styles.css
            |-- script.js
```

If `git` is available on your system, `create-new-html-app` initializes the git repository into the project.

## How to use

```bash
npx create-new-html-app <app-name>
```

You can install the CLI globally with the instruction

```bash
npm install -g create-new-html-app
```

If the application is already installed you can use the alias `cnha` instead of its longer name:

```bash
cnha <appname>
```
