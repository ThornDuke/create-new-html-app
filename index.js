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
// - error messages to the console
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

// - create directory
const mkSecureDir = dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

// - create file
const mkFile = ({ path, logMsg, template, errMsg }) => {
  if (logMsg !== '') {
    shell.echo('-n', logMsg);
  }
  try {
    fs.writeFileSync(path, template);
    if (logMsg !== '') {
      shell.echo(' done');
    }
  } catch (err) {
    echoError(errMsg, err);
    shell.exit(exitCodes.EC_FILE_NOT_CREATED);
  }
};

// - color strings into the terminal
const blue = str => chalk.cyan(str);
const pink = str => chalk.magenta(str);
const yellow = str => chalk.yellowBright.bold(str);

////
//Command line management
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
// Main routine

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
shell.echo(`\n\n${blue('###\n###')} ${pink(`=== ${packageData.name} v${packageData.version} ===`)}\n${blue('###')}`);

////
// If 'git' is not installed it warns the user that no repository will be initialized
if (!shell.which('git')) {
  let warnText = `${blue('###\n###')} ${yellow("I can't find git on this system.")}\n`;
  warnText += `${blue('###')} ${yellow('The repository will not be initialized.')}\n`;
  warnText += `${blue('###\n###')}`;
  shell.echo(warnText);
}

////
// creates the directory tree
shell.echo('-n', `${blue('###')} creation of the directory tree ...`);
try {
  mkSecureDir(`${projectName}`);
  mkSecureDir(`${projectName}/HTML`);
  mkSecureDir(`${projectName}/HTML/.vscode`);
  mkSecureDir(`${projectName}/HTML/public`);
  mkSecureDir(`${projectName}/HTML/src`);
  shell.echo(' done');
} catch (err) {
  echoError('Error creating the directory tree:', err);
}

shell.echo(`${blue('###\n###')} creation of the files:`);

////
// creates the HTML file
mkFile({
  logMsg: `${blue('###')} - index.html ...`,
  path: `${projectName}/HTML/index.html`,
  template: templates.html(projectName),
  errMsg: 'Error creating the HTML file:',
});

////
// creates the css file
mkFile({
  logMsg: `${blue('###')} - public/styles.css ...`,
  path: `${projectName}/HTML/src/styles.css`,
  template: templates.css(projectName),
  errMsg: 'Error creating the css file:',
});

////
// creates the js file
mkFile({
  logMsg: `${blue('###')} - public/script.js ...`,
  path: `${projectName}/HTML/src/script.js`,
  template: templates.js(projectName),
  errMsg: 'Error creating the js file:',
});

////
// creates the file .prettierrc
mkFile({
  logMsg: `${blue('###')} - .prettierrc ...`,
  path: `${projectName}/HTML/.prettierrc`,
  template: templates.prettier(),
  errMsg: 'Error creating the file .prettierrc:',
});

////
// creates the file .vscode/launch.json
mkFile({
  logMsg: `${blue('###')} - .vscode/launch.json ...`,
  path: `${projectName}/HTML/.vscode/launch.json`,
  template: templates.launch(),
  errMsg: 'Error creating the file .vscode/launch.json:',
});

////
// creates the file CHANGELOG.md
mkFile({
  logMsg: `${blue('###')} - CHANGELOG.md ...`,
  path: `${projectName}/HTML/CHANGELOG.md`,
  template: templates.changeLog(),
  errMsg: 'Error creating the file CHANGELOG.md:',
});

////
// creates the file README.md
mkFile({
  logMsg: `${blue('###')} - README.md ...`,
  path: `${projectName}/HTML/README.md`,
  template: templates.readme(projectName),
  errMsg: 'Error creating the file README.md:',
});

////
// If 'git' is installed, initialize a repository
if (shell.which('git')) {
  shell.echo('-n', `${blue('###\n###')} initialization of the git repo ...`);

  mkFile({
    // logMsg: `${blue('###\n###')} creation of the file .gitignore ...`,
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
