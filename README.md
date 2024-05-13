# create-new-html-app

<!--
![npms.io](https://img.shields.io/npms-io/maintenance-score/create-new-html-app?style=plastic&logo=npm&label=maintenance)
![npms.io](https://img.shields.io/npms-io/quality-score/create-new-html-app?style=plastic&logo=npm&label=quality)
![npms.io](https://img.shields.io/npms-io/popularity-score/create-new-html-app?style=plastic&logo=npm&label=popularity)
-->

![NPM Version](https://img.shields.io/npm/v/create-new-html-app?style=plastic&logo=npm&label=version)
![NPM Downloads](https://img.shields.io/npm/d18m/create-new-html-app?style=plastic&logo=npm)
![NPM License](https://img.shields.io/npm/l/create-new-html-app?style=plastic&logo=GNU)
![Node Current](https://img.shields.io/node/v/create-new-html-app?style=plastic&logo=nodedotjs&logoColor=white&logoSize=auto)
![npm bundle size](https://img.shields.io/bundlephobia/min/create-new-html-app?style=plastic&logo=webpack)

Sets up a simple HTML web app template by running one command.

## Features

It asks for a project name (`project-name`) and creates the following structure:

```txt
|-- project-name/
    |-- HTML/
        |-- index.html
        |-- README.md
        |-- CHANGELOG.md
        |-- .gitignore
        |-- .prettierrc
        |-- .vscode/
            |-- launch.json
        |-- public/
        |-- src/
            |-- styles.css
            |-- script.js
```

The `index.html` file consists of a basic template, while `styles.css` and `script.js` are empty files.
`.vscode/launch.json` is a script useful for debugging your HTML application directly from VSCode.

If `git` is available on your system, initializes the project repository.

## How to use

```sh
$ npx create-new-html-app <app-name>
```
