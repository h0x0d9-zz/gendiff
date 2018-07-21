import { isPlainObject, flatten } from 'lodash';

const separatorSymb = '.';
const makeAncestry = (base, key) => [...base, key].join(separatorSymb);

const stringify = (value) => {
  if (isPlainObject(value)) return 'complex value';

  const newValue = (typeof value === 'string' || typeof value === 'number') ? `'${value}'` : value;
  return `value: ${newValue}`;
};

const makeString = (base, message) => [base, message].join(' ');

const renderNode = (node, ancestry) => {
  const {
    type, key, beforeValue, afterValue,
  } = node;
  const newKey = makeAncestry(ancestry, key);

  const base = `Property '${newKey}'`;
  switch (type) {
    case 'removed':
      return makeString(base, `was ${type}`);

    case 'added':
      return makeString(base, `was ${type} with ${stringify(afterValue)}`);

    case 'updated':
      return makeString(base, `was ${type}. From ${stringify(beforeValue)} to ${stringify(afterValue)}`);

    default:
      return makeString(base, `has unexpected type: ${type}`);
  }
};

export default (data) => {
  const renderAst = (ast, ancestry = []) => {
    const prerenderedNodes = ast
      .filter(({ type }) => type !== 'fixed')
      .map((node) => {
        if (node.type === 'nested') {
          return renderAst(node.children, [...ancestry, node.key]);
        }
        return renderNode(node, ancestry);
      });

    return flatten(prerenderedNodes).join('\n');
  };

  return renderAst(data);
};
