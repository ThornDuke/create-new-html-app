const templates = require('./templates.js');

exports.fileDefaults = projectName => [
  {
    logMsg: `- index.html ...`,
    path: `${projectName}/HTML/index.html`,
    template: templates.html(projectName),
    errMsg: 'Error creating the HTML file:',
  },
  {
    logMsg: `- public/styles.css ...`,
    path: `${projectName}/HTML/src/styles.css`,
    template: templates.css(projectName),
    errMsg: 'Error creating the css file:',
  },
  {
    logMsg: `- public/script.js ...`,
    path: `${projectName}/HTML/src/script.js`,
    template: templates.js(projectName),
    errMsg: 'Error creating the js file:',
  },
  {
    logMsg: `- .prettierrc ...`,
    path: `${projectName}/HTML/.prettierrc`,
    template: templates.prettier(),
    errMsg: 'Error creating the file .prettierrc:',
  },
  {
    logMsg: `- .vscode/launch.json ...`,
    path: `${projectName}/HTML/.vscode/launch.json`,
    template: templates.launch(),
    errMsg: 'Error creating the file .vscode/launch.json:',
  },
  {
    logMsg: `- .vscode/settings.json ...`,
    path: `${projectName}/HTML/.vscode/settings.json`,
    template: templates.vscodesettings(),
    errMsg: 'Error creating the file .vscode/settings.json:',
  },
  {
    logMsg: `- CHANGELOG.md ...`,
    path: `${projectName}/HTML/CHANGELOG.md`,
    template: templates.changeLog(),
    errMsg: 'Error creating the file CHANGELOG.md:',
  },
  {
    logMsg: `- README.md ...`,
    path: `${projectName}/HTML/README.md`,
    template: templates.readme(projectName),
    errMsg: 'Error creating the file README.md:',
  },
];
