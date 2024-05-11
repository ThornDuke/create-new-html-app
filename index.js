/**
 * create-new-html-app
 *
 * Thorn Duke
 * first scratch: maj 11, 2024
 * licence: GPL-3.0-or-later
 */

const fs = require('fs');
const { name: programName, version: programVersion, description: programDescription } = require('./package.json');

const { htmlTemplate } = require('./src/constants');

const [nodeLocation, fileLocation, projectName] = process.argv;
const currentPath = process.cwd();

// crea il sistema di directory
try {
  if (!fs.existsSync(projectName)) {
    //---> forse è meglio "Overwrite?"
    fs.mkdirSync(projectName);
  }
  if (!fs.existsSync(`${projectName}/HTML`)) {
    fs.mkdirSync(`${projectName}/HTML`);
  }
  if (!fs.existsSync(`${projectName}/HTML/.vscode`)) {
    fs.mkdirSync(`${projectName}/HTML/.vscode`);
  }
  if (!fs.existsSync(`${projectName}/HTML/public`)) {
    fs.mkdirSync(`${projectName}/HTML/public`);
  }
  if (!fs.existsSync(`${projectName}/HTML/src`)) {
    fs.mkdirSync(`${projectName}/HTML/src`);
  }
} catch (err) {
  console.error(err);
}

// crea il file html
fs.writeFileSync(`${projectName}/HTML/index.html`, htmlTemplate);
