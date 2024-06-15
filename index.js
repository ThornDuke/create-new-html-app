const fs = require('fs');
const minimist = require('minimist');
const prompt = require('prompt-sync')();
const chalk = require('chalk');
const shell = require('shelljs');
const clear = require('clear');

const templates = require('./src/templates.js');
const exitCodes = require('./src/exitcodes.js');
const files = require('./src/filedescriptions.js');
const packageData = require('./package.json');

////
// helper functions:
// - color strings into the terminal
const blue = chalk.cyan;
const pink = chalk.magenta;
const yellow = chalk.yellowBright.bold;
const errorRed = chalk.redBright.bold;

// - error messages to the console
const echoError = (...msgs) => {
  let errorStr = '';
  msgs.forEach((msg, index, array) => {
    errorStr += `\n${msg}`;
    if (index === array.length - 1) {
      errorStr += `\n`;
    }
  });
  shell.echo(errorRed(errorStr));
};

// - create directory
const mkSecureDir = dir => {
  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  } catch (error) {
    echoError(`Error creating ${dir}:`, error.message);
    shell.exit(exitCodes.EC_DIRECTORY_NOT_CREATED);
  }
};

// - create file
const mkFile = ({ path, logMsg, template, errMsg }) => {
  if (logMsg !== '') {
    shell.echo('-n', `${blue('###')} ${logMsg}`);
  }
  try {
    fs.writeFileSync(path, template);
    if (logMsg !== '') {
      shell.echo(' done');
    }
  } catch (error) {
    echoError(errMsg, error.message);
    shell.exit(exitCodes.EC_FILE_NOT_CREATED);
  }
};

////
// Command line management
const args = minimist(process.argv.slice(2));
let projectName = args._[0];

if (args.version || args.v) {
  shell.echo(`\n${packageData.name} v${packageData.version}\n`);
  shell.exit(exitCodes.EC_VERSION_DISPLAYED);
}

if (args.help || args.h || !projectName || process.argv.length > 3) {
  shell.echo(templates.help(packageData.name, packageData.version, packageData.description));
  shell.exit(exitCodes.EC_HELP_DISPLAYED);
}

////
// Start main routine
clear();

////
// If the project directory already exists, it asks whether to overwrite it
if (fs.existsSync(projectName)) {
  shell.echo(yellow(`\nThe directory ${projectName} already exists.`));
  const promptText = yellow(`Overwite it? [Y/n] `);
  const answer = prompt(promptText);
  if (!['y', 'yes'].includes(answer.toLowerCase())) {
    shell.echo(`\n`);
    shell.exit(exitCodes.EC_USER_TERMINATED);
  }
}

////
// Begins output to console
shell.echo(
  `\n\n${blue('###\n###')} ${pink(`=== ${packageData.name} v${packageData.version} ===`)}\n${blue('###')}`
);

////
// If 'git' is not installed it warns the user that no repository will be initialized
if (!shell.which('git')) {
  let warnText = `${blue('###\n###')} ${yellow("Can't find git on this system.")}\n`;
  warnText += `${blue('###')} ${yellow('The repository will not be initialized.')}\n`;
  warnText += `${blue('###\n###')}`;
  shell.echo(warnText);
}

////
// creates the directory tree
shell.echo('-n', `${blue('###')} creation of the directory tree ...`);
mkSecureDir(`${projectName}`);
mkSecureDir(`${projectName}/HTML`);
mkSecureDir(`${projectName}/HTML/.vscode`);
mkSecureDir(`${projectName}/HTML/public`);
mkSecureDir(`${projectName}/HTML/src`);
shell.echo(' done');

shell.echo(`${blue('###\n###')} creation of the files:`);

////
// creates the files
files.fileDefaults(projectName).forEach(item => {
  mkFile(item);
});

////
// If 'git' is installed, initialize a repository
if (shell.which('git')) {
  shell.echo('-n', `${blue('###\n###')} initialization of the git repo ...`);

  mkFile({
    logMsg: '',
    path: `${projectName}/HTML/.gitignore`,
    template: templates.gitIgnore(),
    errMsg: 'Error creating the file .gitignore:',
  });

  shell.cd(`${projectName}/HTML`);
  if (shell.exec('git init -qb master &> /dev/null').code === 0) {
    shell.exec('git add . &> /dev/null');
    shell.exec("git commit -aq --allow-empty-message -m '' &> /dev/null");
    shell.echo(' done');
  } else {
    echoError('Error: Git initialization failed');
    shell.exit(exitCodes.EC_GIT_NOT_INITIALIZED);
  }
}

////
// greetings to console
shell.echo(templates.greetings(projectName));

module.exports = () => {};
