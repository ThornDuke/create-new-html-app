const fs = require('fs');
const minimist = require('minimist');
const prompt = require('prompt-sync')();
const chalk = require('chalk');
const shell = require('shelljs');

const templates = require('./src/templates.js');
const exitCodes = require('./src/exitcodes.js');
const packageData = require('./package.json');

////
// helper functions:
// error messages to the console
const echoError = (...msgs) => {
  let errorStr = '';
  msgs.forEach((msg, index, array) => {
    errorStr += `\n${msg}`;
    if (index === array.length - 1) {
      errorStr += `\n`;
    }
  });
  shell.echo(chalk.bold.redBright(errorStr));
};

// create directory
const mkSecureDir = dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

// create file
const mkFile = ({ path, logMsg, template, errMsg }) => {
  shell.echo(logMsg);
  try {
    fs.writeFileSync(path, template);
  } catch (err) {
    echoError(errMsg, err);
  }
};

////
//Command line management
const args = minimist(process.argv.slice(2));
let projectName = args._[0];

if (args.version || args.v) {
  shell.echo(`\n${packageData.name} v${packageData.version}\n`);
  process.exit(exitCodes.EC_VERSION_DISPLAYED);
}

if (args.help || args.h || !projectName || process.argv.length > 3) {
  shell.echo(templates.help(packageData.name, packageData.version, packageData.description));
  process.exit(exitCodes.EC_HELP_DISPLAYED);
}

////
// Main routine

////
// If the project directory already exists, it asks whether to overwrite it
if (fs.existsSync(projectName)) {
  const promptText = chalk.yellowBright.bold(`\nThe directory ${projectName} already exists. Overwite it? [Y n] `);
  const answer = prompt(promptText);
  if (!['y', 'yes'].includes(answer.toLowerCase())) {
    process.exit(exitCodes.EC_USER_TERMINATED);
  }
}

////
// If 'git' is not installed it warns the user that no repository will be initialized
if (!shell.which('git')) {
  const warnText = chalk.yellowBright.bold(
    "\nI can't find git on this system. The repository will not be initialized.\n"
  );
  shell.echo(warnText);
}

////
// Begins output to console
shell.echo(`\n\n##### ${packageData.name} v${packageData.version}\n###`);

////
// creates the directory tree
shell.echo('### creation of the directory tree ...\n###');
try {
  mkSecureDir(`${projectName}`);
  mkSecureDir(`${projectName}/HTML`);
  mkSecureDir(`${projectName}/HTML/.vscode`);
  mkSecureDir(`${projectName}/HTML/public`);
  mkSecureDir(`${projectName}/HTML/src`);
} catch (err) {
  echoError('Error creating the directory tree:', err);
}

shell.echo('### creation of the files:');

////
// creates the HTML file
mkFile({
  logMsg: '### - index.html',
  path: `${projectName}/HTML/index.html`,
  template: templates.html(projectName),
  errMsg: 'Error creating the HTML file:',
});

////
// creates the css file
mkFile({
  logMsg: '### - public/styles.css',
  path: `${projectName}/HTML/src/styles.css`,
  template: templates.css(projectName),
  errMsg: 'Error creating the css file:',
});

////
// creates the js file
mkFile({
  logMsg: '### - public/script.js',
  path: `${projectName}/HTML/src/script.js`,
  template: templates.js(projectName),
  errMsg: 'Error creating the js file:',
});

////
// creates the file .prettierrc
mkFile({
  logMsg: '### - .prettierrc',
  path: `${projectName}/HTML/.prettierrc`,
  template: templates.prettier(),
  errMsg: 'Error creating the file .prettierrc:',
});

////
// creates the file .gitignore
mkFile({
  logMsg: '### - .gitignore',
  path: `${projectName}/HTML/.gitignore`,
  template: templates.gitIgnore(),
  errMsg: 'Error creating the file ,gitignore:',
});

////
// creates the file .vscode/launch.json
mkFile({
  logMsg: '### - .vscode/launch.json',
  path: `${projectName}/HTML/.vscode/launch.json`,
  template: templates.launch(),
  errMsg: 'Error creating the file .vscode/launch.json:',
});

////
// creates the file CHANGELOG.md
mkFile({
  logMsg: '### - CHANGELOG.md',
  path: `${projectName}/HTML/CHANGELOG.md`,
  template: templates.changeLog(),
  errMsg: 'Error creating the file CHANGELOG.md:',
});

////
// creates the file README.md
mkFile({
  logMsg: '### - README.md',
  path: `${projectName}/HTML/README.md`,
  template: templates.readme(),
  errMsg: 'Error creating the file README.md:',
});

////
// If 'git' is installed, initialize a repository
if (shell.which('git')) {
  shell.echo('###\n### - Initialization of the git repo ...\n###');
  shell.cd(`${projectName}/HTML`);
  if (shell.exec('git init -qb master').code === 0) {
    shell.exec('git add .');
    shell.exec("git commit -aq --allow-empty-message -m ''");
  } else {
    echoError('Error: Git commit failed');
    shell.exit(1);
  }
}

////
// greetings to console
shell.echo(templates.greetings(projectName));

module.exports = () => {};
