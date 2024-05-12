# create-new-html-app

Sets up a simple HTML web app by running one command.

## Behavior

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
