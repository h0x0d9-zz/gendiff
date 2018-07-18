import { isPlainObject, flatten } from 'lodash';

export default (data) => {
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

  const makeDiff = (ast, nestingLevel = 0) => {
    const makeString = (symbol, key, value) => `${indent(nestingLevel)}  ${symbol} ${key}: ${stringify(value, nestingLevel)}`;

    const stringifiedNodes = ast.map((node) => {
      const {
        key, type, before, after, children,
      } = node;

      switch (type) {
        case 'removed':
          return makeString('-', key, before);
        case 'inserted':
          return makeString('+', key, after);
        case 'modifed':
          return [makeString('-', key, before), makeString('+', key, after)];
        case 'nested':
          return `${indent(nestingLevel + 1)}${key}: ${makeDiff(children, nestingLevel + 1)}`;
        default:
          return makeString(' ', key, before);
      }
    });
    const result = flatten(stringifiedNodes).join('\n');
    return `{\n${result}\n${indent(nestingLevel)}}`;
  };

  return makeDiff(data);
};
