import { isPlainObject, flatten } from 'lodash';

const stringify = (value) => {
  if (isPlainObject(value)) return 'complex value';

  const newValue = (typeof value === 'string' || typeof value === 'number') ? `'${value}'` : value;
  return `value: ${newValue}`;
};

const makeString = (key, message, ancestry) => {
  const newKey = ancestry.length === 0 ? key : [ancestry, key].join('.');
  return `Property '${newKey}' was ${message}`;
};

const getNodeRenders = [
  {
    type: 'nested',
    render: ({ children, key }, ancestry, fn) => {
      const newAncestry = ancestry.length === 0 ? key : [ancestry, key].join('.');
      return fn(children, newAncestry);
    },
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
    render: ({ key, after, type }, ancestry) => {
      const message = `${type} with ${stringify(after)}`;
      return makeString(key, message, ancestry);
    },
  },

  {
    type: 'updated',
    render: (node, ancestry) => {
      const {
        key, before, after, type,
      } = node;

      const message = `${type}. From ${stringify(before)} to ${stringify(after)}`;
      return makeString(key, message, ancestry);
    },
  },
];

const getNodeRender = ({ type: searchType }) => (
  getNodeRenders.find(({ type }) => searchType === type)
);

export default (data) => {
  const renderAst = (ast, ancestry = '') => {
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
