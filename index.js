const fs = require('fs');
const minimist = require('minimist');
const prompt = require('prompt-sync')();
const chalk = require('chalk');

const templates = require('./src/templates.js');
const exitCodes = require('./src/exitcodes.js');
const packageData = require('./package.json');

/* ///////////////////////////////////////////
 *
 * Command line management
 *
 * //////////////////////////////////////// */

const args = minimist(process.argv.slice(2));
let projectName = args._[0];

if (args.version || args.v) {
  console.log(`\n${packageData.name} v${packageData.version}\n`);
  process.exit(exitCodes.EC_VERSION_DISPLAYED);
}

if (args.help || args.h || !projectName || process.argv.length > 3) {
  console.log(templates.help(packageData.name, packageData.version, packageData.description));
  process.exit(exitCodes.EC_HELP_DISPLAYED);
}

/* ///////////////////////////////////////////
 *
 * Main routine
 *
 * //////////////////////////////////////// */

if (fs.existsSync(projectName)) {
  const answer = prompt(chalk.yellowBright.bold(`\nThe directory ${projectName} already exists. Overwite it? [Y n] `));
  if (!['y', 'yes'].includes(answer.toLowerCase())) {
    process.exit(exitCodes.EC_USER_TERMINATED);
  }
}

const mkSecureDir = dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

const mkFile = ({ path, logMsg, template, errMsg }) => {
  console.log(logMsg);
  try {
    fs.writeFileSync(path, template);
  } catch (err) {
    console.error(errMsg, err);
  }
};

console.log('');
console.log('');
console.log(`##### ${packageData.name} v${packageData.version}`);
console.log('###');
// creates the directory tree
console.log('### creation of the directory tree');
try {
  mkSecureDir(`${projectName}`);
  mkSecureDir(`${projectName}/HTML`);
  mkSecureDir(`${projectName}/HTML/.vscode`);
  mkSecureDir(`${projectName}/HTML/public`);
  mkSecureDir(`${projectName}/HTML/src`);
} catch (err) {
  console.error('Error creating the directory tree:', err);
}

console.log('### creation of the files:');

// creates the HTML file
mkFile({
  logMsg: '### - index.html',
  path: `${projectName}/HTML/index.html`,
  template: templates.html(projectName),
  errMsg: 'Error creating the HTML file:',
});

// creates the css file
mkFile({
  logMsg: '### - public/styles.css',
  path: `${projectName}/HTML/public/styles.css`,
  template: templates.css(projectName),
  errMsg: 'Error creating the css file:',
});

// creates the js file
mkFile({
  logMsg: '### - public/script.js',
  path: `${projectName}/HTML/public/script.js`,
  template: templates.js(projectName),
  errMsg: 'Error creating the js file:',
});

// creates the file .prettierrc
mkFile({
  logMsg: '### - .prettierrc',
  path: `${projectName}/HTML/.prettierrc`,
  template: templates.prettier(),
  errMsg: 'Error creating the file .prettierrc:',
});

// creates the file .gitignore
mkFile({
  logMsg: '### - .gitignore',
  path: `${projectName}/HTML/.gitignore`,
  template: templates.gitIgnore(),
  errMsg: 'Error creating the file ,gitignore:',
});

// creates the file .vscode/launch.json
mkFile({
  logMsg: '### - .vscode/launch.json',
  path: `${projectName}/HTML/.vscode/launch.json`,
  template: templates.launch(),
  errMsg: 'Error creating the file .vscode/launch.json:',
});

// creates the file CHANGELOG.md
mkFile({
  logMsg: '### - CHANGELOG.md',
  path: `${projectName}/HTML/CHANGELOG.md`,
  template: templates.changeLog(),
  errMsg: 'Error creating the file CHANGELOG.md:',
});

// creates the file README.md
mkFile({
  logMsg: '### - README.md',
  path: `${projectName}/HTML/README.md`,
  template: templates.readme(),
  errMsg: 'Error creating the file README.md:',
});

console.log(templates.greetings(projectName));

module.exports = () => {};
