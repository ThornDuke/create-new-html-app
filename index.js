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

// if the directory already exists, it asks whether to overwrite it
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
      // if the answer is 'no'...
      process.exit(EC_USER_TERMINATED);
    }
  })();
}

// ...otherwise:
console.log('');
console.log('');
console.log(`##### ${metaData.name} v${metaData.version}`);
console.log('###');
// creates the directory tree
console.log('### creation of the directory tree');
try {
  fs.mkdirSync(projectName);
  fs.mkdirSync(`${projectName}/HTML`);
  fs.mkdirSync(`${projectName}/HTML/.vscode`);
  fs.mkdirSync(`${projectName}/HTML/public`);
  fs.mkdirSync(`${projectName}/HTML/src`);
} catch (err) {
  console.error('Error creating the directory tree:', err);
}

// creates the HTML file
console.log('### creation of the files:');
console.log('### - index.html');
try {
  fs.writeFileSync(`${projectName}/HTML/index.html`, htmlTemplate(projectName));
} catch (err) {
  console.error('Error creating the HTML file:', err);
}

// creates the css file
console.log('### - public/styles.css');
try {
  fs.writeFileSync(`${projectName}/HTML/public/styles.css`, cssTemplate(projectName));
} catch (err) {
  console.error('Error creating the css file:', err);
}

// creates the js file
console.log('### - public/script.js');
try {
  fs.writeFileSync(`${projectName}/HTML/public/script.js`, jsTemplate(projectName));
} catch (err) {
  console.error('Error creating the js file:', err);
}

// creates the file .prettierrc
console.log('### - .prettierrc');
try {
  fs.writeFileSync(`${projectName}/HTML/.prettierrc`, prettierTemplate());
} catch (err) {
  console.error('Error creating the file .prettierrc:', err);
}

// creates the file .gitignore
console.log('### - .gitignore');
try {
  fs.writeFileSync(`${projectName}/HTML/.gitignore`, gitIgnoreTemplate());
} catch (err) {
  console.error('Error creating the file ,gitignore:', err);
}

// creates the file .vscode/launch.json
console.log('### - .vscode/launch.json');
try {
  fs.writeFileSync(`${projectName}/HTML/.vscode/launch.json`, launchTemplate());
} catch (err) {
  console.error('Error creating the file .vscode/launch.json:', err);
}

// creates the file CHANGELOG.md
console.log('### - CHANGELOG.md');
try {
  fs.writeFileSync(`${projectName}/HTML/CHANGELOG.md`, changeLogTemplate());
} catch (err) {
  console.error('Error creating the file CHANGELOG.md:', err);
}

// creates the file README.md
console.log('### - README.md');
try {
  fs.writeFileSync(`${projectName}/HTML/README.md`, readmeTemplate());
} catch (err) {
  console.error('Error creating the file README.md:', err);
}

console.log('###');
console.log('### Project created successfully');
console.log('### Happy hacking!');
console.log('###');
