const filenameReservedRegex = /[<>:"/\\|?*\u0000-\u001F]/g;
const windowsReservedNameRegex = /^(con|prn|aux|nul|com\d|lpt\d)$/i;
const reControlChars = /[\u0000-\u001F\u0080-\u009F]/g;
const reRepeatedReservedCharacters = /([<>:"/\\|?*\u0000-\u001F]){2,}/g;
const reRelativePath = /^\.+(\\|\/)|^\.+$/;
const reTrailingPeriods = /\.+$/;

function hasSpaces(string) {
  const re = /\s/g;
  return re.test(string);
}

function isValidFilename(string) {
  if (!string || string.length > 255) {
    return false;
  }

  if (filenameReservedRegex.test(string) || windowsReservedNameRegex.test(string)) {
    return false;
  }

  if (string === '.' || string === '..') {
    return false;
  }

  return true;
}

function sanitizeFilename(string) {
  if (typeof string !== 'string') {
    throw new TypeError('Expected a string');
  }

  const replacement = '!';

  if (filenameReservedRegex.test(replacement) && reControlChars.test(replacement)) {
    throw new Error('Replacement string cannot contain reserved filename characters');
  }

  string = string.trim().replace(/(\s){2,}/g, '$1');
  string = string.replace(/\s/g, '-');
  string = string.replace(reRepeatedReservedCharacters, '$1');
  string = string.normalize('NFD');
  string = string.replace(reRelativePath, replacement);
  string = string.replace(filenameReservedRegex, replacement);
  string = string.replace(reControlChars, replacement);
  string = string.replace(reTrailingPeriods, '');

  const startedWithDot = string[0] === '.';
  if (!startedWithDot && string[0] === '.') {
    string = replacement + string;
  }
  if (string[string.length - 1] === '.') {
    string += replacement;
  }

  string = windowsReservedNameRegex.test(string) ? string + replacement : string;
  const allowedLength = 255;
  if (string.length > allowedLength) {
    const extensionIndex = string.lastIndexOf('.');
    if (extensionIndex === -1) {
      string = string.slice(0, allowedLength);
    } else {
      const filename = string.slice(0, extensionIndex);
      const extension = string.slice(extensionIndex);
      string = filename.slice(0, Math.max(1, allowedLength - extension.length)) + extension;
    }
  }

  return string;
}

module.exports = { hasSpaces, isValidFilename, sanitizeFilename };
