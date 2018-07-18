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
    render: ({ key, before }, nestingLevel) => (
      makeString('-', key, before, nestingLevel)
    ),
  },

  {
    type: 'inserted',
    render: ({ key, after }, nestingLevel) => (
      makeString('+', key, after, nestingLevel)
    ),
  },

  {
    type: 'modifed',
    render: ({ key, before, after }, nestingLevel) => (
      [
        makeString('-', key, before, nestingLevel),
        makeString('+', key, after, nestingLevel),
      ]
    ),
  },

  {
    type: 'fixed',
    render: ({ key, before }, nestingLevel) => (
      makeString(' ', key, before, nestingLevel)
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
