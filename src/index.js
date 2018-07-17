import fs from 'fs';
import _ from 'lodash';
import { safeLoad } from 'js-yaml';
import ini from 'ini';
import { extname } from 'path';

const parsers = {
  json: JSON.parse,
  yml: safeLoad,
  ini: ini.parse,
};

const getParserFor = format => parsers[format];

export default (beforeFilename, afterFilename) => {
  const beforeFormat = extname(beforeFilename).slice(1);
  const afterFormat = extname(afterFilename).slice(1);

  const beforeRaw = fs.readFileSync(beforeFilename, 'utf-8');
  const afterRaw = fs.readFileSync(afterFilename, 'utf-8');

  const beforeObj = getParserFor(beforeFormat)(beforeRaw);
  const afterObj = getParserFor(afterFormat)(afterRaw);

  const keys = _.union(Object.keys(beforeObj), Object.keys(afterObj));

  const diff = keys.reduce((acc, key) => {
    if (_.has(beforeObj, key) && !_.has(afterObj, key)) {
      return `${acc}\n  - ${key}: ${beforeObj[key]}`;
    }
    if (!_.has(beforeObj, key) && _.has(afterObj, key)) {
      return `${acc}\n  + ${key}: ${afterObj[key]}`;
    }
    if (beforeObj[key] === afterObj[key]) {
      return `${acc}\n    ${key}: ${afterObj[key]}`;
    }

    return `${acc}\n  + ${key}: ${afterObj[key]}\n  - ${key}: ${beforeObj[key]}`;
  }, '');

  return `{${diff}\n}`;
};
