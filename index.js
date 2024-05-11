/**
 * create-new-html-app
 *
 * Thorn Duke
 * first scratch: maj 11, 2024
 * licence: GPL-3.0-or-later
 */

//const fs = require('fs');
import fs from 'fs';
import prompts from 'prompts';
import {
  htmlTemplate,
  cssTemplate,
  jsTemplate,
  helpScreen,
  prettierTemplate,
  gitIgnoreTemplate,
  launchTemplate,
  changeLogTemplate,
  readmeTemplate,
} from './src/constants.js';

import metaData from './package.json' assert { type: 'json' };

const [nodeLocation, fileLocation, projectName] = process.argv;

switch (projectName) {
  case undefined:
  case '-h':
  case '--help':
    console.log(helpScreen(metaData.name, metaData.version, metaData.description));
    process.exit();
  case '-V':
  case '--version':
    console.log(`\n${metaData.name} v${metaData.version}\n`);
    process.exit();
  default:
    break;
}

const currentPath = process.cwd();
const EC_SUCCESS = 0;
const EC_USER_TERMINATED = 1;

// se la directory esiste già, chiede se sovrascriverla
if (fs.existsSync(projectName)) {
  (async () => {
    const response = await prompts({
      type: 'toggle',
      name: 'answer',
      message: `The '${projectName}' directory already exists. Do you want to overwrite it?`,
      initial: true,
      active: 'yes',
      inactive: 'no',
    });
    if (response.answer === false) {
      // se risposta è no...
      process.exit(EC_USER_TERMINATED);
    }
  })();
}

// ... altrimenti:
console.log('');
console.log('');
console.log(`##### ${metaData.name} v${metaData.version}`);
console.log('###');
// crea il sistema di directory
console.log("### creo l'albero delle directory");
try {
  fs.mkdirSync(projectName);
  fs.mkdirSync(`${projectName}/HTML`);
  fs.mkdirSync(`${projectName}/HTML/.vscode`);
  fs.mkdirSync(`${projectName}/HTML/public`);
  fs.mkdirSync(`${projectName}/HTML/src`);
} catch (err) {
  console.error("Errore nella creazione dell'albero delle directory:", err);
}

// crea il file html
console.log('### creo i file:');
console.log('### - index.html');
try {
  fs.writeFileSync(`${projectName}/HTML/index.html`, htmlTemplate(projectName));
} catch (err) {
  console.error('Errore nella creazione del file HTML:', err);
}

// crea il file css
console.log('### - public/styles.css');
try {
  fs.writeFileSync(`${projectName}/HTML/public/styles.css`, cssTemplate(projectName));
} catch (err) {
  console.error('Errore nella creazione del file css:', err);
}

// crea il file js
console.log('### - public/script.js');
try {
  fs.writeFileSync(`${projectName}/HTML/public/script.js`, jsTemplate(projectName));
} catch (err) {
  console.error('Errore nella creazione del file js:', err);
}

// crea il file .prettierrc
console.log('### - .prettierrc');
try {
  fs.writeFileSync(`${projectName}/HTML/.prettierrc`, prettierTemplate());
} catch (err) {
  console.error('Errore nella creazione del file .prettierrc:', err);
}

// crea il file .gitignore
console.log('### - .gitignore');
try {
  fs.writeFileSync(`${projectName}/HTML/.gitignore`, gitIgnoreTemplate());
} catch (err) {
  console.error('Errore nella creazione del file .gitignore:', err);
}

// crea il file .vscode/launch.json
console.log('### - .vscode/launch.json');
try {
  fs.writeFileSync(`${projectName}/HTML/.vscode/launch.json`, launchTemplate());
} catch (err) {
  console.error('Errore nella creazione del file launch.json:', err);
}

// crea il file CHANGELOG.md
console.log('### - CHANGELOG.md');
try {
  fs.writeFileSync(`${projectName}/HTML/CHANGELOG.md`, changeLogTemplate());
} catch (err) {
  console.error('Errore nella creazione del file CHANGELOG.md:', err);
}

// crea il file README.md
console.log('### - README.md');
try {
  fs.writeFileSync(`${projectName}/HTML/README.md`, readmeTemplate());
} catch (err) {
  console.error('Errore nella creazione del file README.md:', err);
}

console.log('###');
console.log('### Progetto creato con successo');
console.log('### Happy hacking!');
console.log('###');
