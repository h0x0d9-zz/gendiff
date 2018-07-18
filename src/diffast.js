import { isEqual, isPlainObject, union } from 'lodash';

const getPropertyActions = [
  {
    type: 'nested',
    check: (before, after) => isPlainObject(before) && isPlainObject(after)
            && !isEqual(before, after),
    make: (before, after, fn) => ({ children: fn(before, after) }),
  },
  {
    type: 'fixed',
    check: (before, after) => isEqual(before, after),
    make: before => ({ before }),
  },
  {
    type: 'removed',
    check: (before, after) => after === undefined,
    make: before => ({ before }),
  },
  {
    type: 'inserted',
    check: before => before === undefined,
    make: (before, after) => ({ after }),
  },
  {
    type: 'modifed',
    check: (before, after) => before !== after,
    make: (before, after) => ({ before, after }),
  },
];

const getPropertyAction = (before, after) => getPropertyActions.find(
  ({ check }) => check(before, after),
);

const createAst = (beforeObj, afterObj) => {
  const keys = union(Object.keys(beforeObj), Object.keys(afterObj));
  return keys.map((key) => {
    const beforeValue = beforeObj[key];
    const afterValue = afterObj[key];
    const { type, make } = getPropertyAction(beforeValue, afterValue);

    return { key, type, ...make(beforeValue, afterValue, createAst) };
  });
};

export default createAst;
