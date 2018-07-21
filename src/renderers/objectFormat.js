import { isPlainObject, flatten } from 'lodash';

const indentSize = 4;
const indent = nestingLevel => ' '.repeat(nestingLevel * indentSize);

const stringify = (value, lvl) => {
  if (!isPlainObject(value)) return value;

  const properties = Object.keys(value).map(
    k => `${indent(lvl + 2)}${k}: ${stringify(value[k], lvl + 1)}`,
  );
  const result = flatten(properties).join('\n');
  return `{\n${result}\n${indent(lvl + 1)}}`;
};

const makeString = (symbol, key, value, lvl) => (
  `${indent(lvl)}  ${symbol} ${key}: ${stringify(value, lvl)}`
);

const getNodeRenders = [
  {
    type: 'nested',
    render: ({ key, children }, nestingLevel, fn) => (
      `${indent(nestingLevel + 1)}${key}: ${fn(children, nestingLevel + 1)}`
    ),
  },

  {
    type: 'removed',
    render: ({ key, beforeValue }, nestingLevel) => (
      makeString('-', key, beforeValue, nestingLevel)
    ),
  },

  {
    type: 'added',
    render: ({ key, afterValue }, nestingLevel) => (
      makeString('+', key, afterValue, nestingLevel)
    ),
  },

  {
    type: 'updated',
    render: ({ key, beforeValue, afterValue }, nestingLevel) => (
      [
        makeString('-', key, beforeValue, nestingLevel),
        makeString('+', key, afterValue, nestingLevel),
      ]
    ),
  },

  {
    type: 'fixed',
    render: ({ key, beforeValue }, nestingLevel) => (
      makeString(' ', key, beforeValue, nestingLevel)
    ),
  },
];

const getNodeRender = ({ type: searchType }) => (
  getNodeRenders.find(({ type }) => searchType === type)
);

export default (data) => {
  const renderAst = (ast, nestingLevel = 0) => {
    const prerenderedNodes = ast.map((node) => {
      const { render } = getNodeRender(node);
      return render(node, nestingLevel, renderAst);
    });

    const result = flatten(prerenderedNodes).join('\n');
    return `{\n${result}\n${indent(nestingLevel)}}`;
  };

  return renderAst(data);
};
