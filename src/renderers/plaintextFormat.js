import { isPlainObject, flatten } from 'lodash';

const separatorSymb = '.';
const makeAncestry = (base, key) => [...base, key].join(separatorSymb);

const stringify = (value) => {
  if (isPlainObject(value)) return 'complex value';

  const newValue = (typeof value === 'string' || typeof value === 'number') ? `'${value}'` : value;
  return `value: ${newValue}`;
};

const makeString = (key, message, ancestry) => {
  const newKey = makeAncestry(ancestry, key);
  return `Property '${newKey}' was ${message}`;
};

const getNodeRenders = [
  {
    type: 'nested',
    render: ({ children, key }, ancestry, fn) => (fn(children, [...ancestry, key])),
  },
  {
    type: 'removed',
    render: ({ key, type }, ancestry) => {
      const message = type;
      return makeString(key, message, ancestry);
    },
  },

  {
    type: 'added',
    render: ({ key, afterValue, type }, ancestry) => {
      const message = `${type} with ${stringify(afterValue)}`;
      return makeString(key, message, ancestry);
    },
  },

  {
    type: 'updated',
    render: (node, ancestry) => {
      const {
        key, beforeValue, afterValue, type,
      } = node;

      const message = `${type}. From ${stringify(beforeValue)} to ${stringify(afterValue)}`;
      return makeString(key, message, ancestry);
    },
  },
];

const getNodeRender = ({ type: searchType }) => (
  getNodeRenders.find(({ type }) => searchType === type)
);

export default (data) => {
  const renderAst = (ast, ancestry = []) => {
    const prerenderedNodes = ast
      .filter(({ type }) => type !== 'fixed')
      .map((node) => {
        const { render } = getNodeRender(node);
        return render(node, ancestry, renderAst);
      });

    return flatten(prerenderedNodes).join('\n');
  };

  return renderAst(data);
};
