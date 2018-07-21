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

const renderNode = (node, nestingLevel) => {
  const {
    type, key, beforeValue, afterValue,
  } = node;

  switch (type) {
    case 'removed':
      return makeString('-', key, beforeValue, nestingLevel);
    case 'added':
      return makeString('+', key, afterValue, nestingLevel);
    case 'updated':
      return [
        makeString('-', key, beforeValue, nestingLevel),
        makeString('+', key, afterValue, nestingLevel),
      ];
    case 'fixed':
      return makeString(' ', key, beforeValue, nestingLevel);
    default:
      return `${indent(nestingLevel)}  ${key} has unexpected type`;
  }
};

export default (data) => {
  const renderAst = (ast, nestingLevel = 0) => {
    const prerenderedNodes = ast.map((node) => {
      if (node.type === 'nested') {
        return `${indent(nestingLevel + 1)}${node.key}: ${renderAst(node.children, nestingLevel + 1)}`;
      }
      return renderNode(node, nestingLevel);
    });

    const result = flatten(prerenderedNodes).join('\n');
    return `{\n${result}\n${indent(nestingLevel)}}`;
  };

  return renderAst(data);
};
