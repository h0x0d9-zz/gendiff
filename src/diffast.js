import _ from 'lodash';

const getPropertyActions = [
  {
    type: 'nested',
    check: (beforeObj, afterObj, property) => (
      _.isPlainObject(beforeObj[property]) && _.isPlainObject(afterObj[property])
    ),
    make: (before, after, fn) => ({ children: fn(before, after) }),
  },

  {
    type: 'removed',
    check: (beforeObj, afterObj, property) => (
      _.has(beforeObj, property) && !_.has(afterObj, property)
    ),
    make: before => ({ before }),
  },

  {
    type: 'added',
    check: (beforeObj, afterObj, property) => (
      !_.has(beforeObj, property) && _.has(afterObj, property)
    ),
    make: (before, after) => ({ after }),
  },

  {
    type: 'updated',
    check: (beforeObj, afterObj, property) => (
      _.has(beforeObj, property) && _.has(afterObj, property)
      && !_.isEqual(beforeObj[property], afterObj[property])
    ),
    make: (before, after) => ({ before, after }),
  },

  {
    type: 'fixed',
    check: (beforeObj, afterObj, property) => (
      _.has(beforeObj, property) && _.has(afterObj, property)
      && _.isEqual(beforeObj[property], afterObj[property])
    ),
    make: before => ({ before }),
  },
];

const getPropertyAction = (before, after, property) => getPropertyActions.find(
  ({ check }) => check(before, after, property),
);

const createAst = (beforeObj, afterObj) => {
  const keys = _._.union(Object.keys(beforeObj), Object.keys(afterObj));
  return keys.map((key) => {
    const { type, make } = getPropertyAction(beforeObj, afterObj, key);
    const beforeValue = beforeObj[key];
    const afterValue = afterObj[key];

    return { key, type, ...make(beforeValue, afterValue, createAst) };
  });
};

export default createAst;
