import fs from 'fs';
import _ from 'lodash';

export default (before, after) => {
  const beforJSON = fs.readFileSync(before, 'utf-8');
  const afterJSON = fs.readFileSync(after, 'utf-8');

  const beforeObj = JSON.parse(beforJSON);
  const afterObj = JSON.parse(afterJSON);

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
