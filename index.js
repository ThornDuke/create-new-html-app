const fs = require('fs');
const prompts = require('prompts');
const minimist = require('minimist');

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
 * Border cases
 *
 * //////////////////////////////////////// */

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

/* ///////////////////////////////////////////
 *
 * Main routine
 *
 * //////////////////////////////////////// */

// ...otherwise:
console.log('');
console.log('');
console.log(`##### ${packageData.name} v${packageData.version}`);
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
  fs.writeFileSync(`${projectName}/HTML/index.html`, templates.html(projectName));
} catch (err) {
  console.error('Error creating the HTML file:', err);
}

// creates the css file
console.log('### - public/styles.css');
try {
  fs.writeFileSync(`${projectName}/HTML/public/styles.css`, templates.css(projectName));
} catch (err) {
  console.error('Error creating the css file:', err);
}

// creates the js file
console.log('### - public/script.js');
try {
  fs.writeFileSync(`${projectName}/HTML/public/script.js`, templates.js(projectName));
} catch (err) {
  console.error('Error creating the js file:', err);
}

// creates the file .prettierrc
console.log('### - .prettierrc');
try {
  fs.writeFileSync(`${projectName}/HTML/.prettierrc`, templates.prettier());
} catch (err) {
  console.error('Error creating the file .prettierrc:', err);
}

// creates the file .gitignore
console.log('### - .gitignore');
try {
  fs.writeFileSync(`${projectName}/HTML/.gitignore`, templates.gitIgnore());
} catch (err) {
  console.error('Error creating the file ,gitignore:', err);
}

// creates the file .vscode/launch.json
console.log('### - .vscode/launch.json');
try {
  fs.writeFileSync(`${projectName}/HTML/.vscode/launch.json`, templates.launch());
} catch (err) {
  console.error('Error creating the file .vscode/launch.json:', err);
}

// creates the file CHANGELOG.md
console.log('### - CHANGELOG.md');
try {
  fs.writeFileSync(`${projectName}/HTML/CHANGELOG.md`, templates.changeLog());
} catch (err) {
  console.error('Error creating the file CHANGELOG.md:', err);
}

// creates the file README.md
console.log('### - README.md');
try {
  fs.writeFileSync(`${projectName}/HTML/README.md`, templates.readme());
} catch (err) {
  console.error('Error creating the file README.md:', err);
}

console.log('###');
console.log('### Project created successfully');
console.log('### Happy hacking!');
console.log('###');

module.exports = () => {};
