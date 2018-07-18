import { parseFile } from '../src';
import createAst from '../src/diffast';

describe('Create AST for the difference between flat YAML files', () => {
  const expectedAst = [
    {
      key: 'host',
      type: 'fixed',
      before: 'hexlet.io',
    },
    {
      key: 'timeout',
      type: 'modifed',
      before: '50',
      after: '20',
    },
    {
      key: 'proxy',
      type: 'removed',
      before: '123.234.53.22',
    },
    {
      key: 'follow',
      type: 'removed',
      before: false,
    },
    {
      key: 'verbose',
      type: 'inserted',
      after: true,
    },
  ];

  const recursiveYamlAst = [
    {
      key: 'common',
      type: 'nested',
      children: [
        {
          key: 'setting1',
          type: 'fixed',
          before: 'Value 1',
        },
        {
          key: 'setting2',
          type: 'removed',
          before: '200',
        },
        {
          key: 'setting3',
          type: 'modifed',
          before: true,
          after: {
            key: 'value',
          },
        },
        {
          key: 'setting6',
          type: 'nested',
          children: [
            {
              key: 'key',
              type: 'fixed',
              before: 'value',
            },
            {
              key: 'ops',
              type: 'inserted',
              after: 'vops',
            },
          ],
        },
        {
          key: 'setting4',
          type: 'inserted',
          after: 'blah blah',
        },
        {
          key: 'setting5',
          type: 'inserted',
          after: {
            key5: 'value5',
          },
        },
      ],
    },

    {
      key: 'group1',
      type: 'nested',
      children: [
        {
          key: 'baz',
          type: 'modifed',
          before: 'bas',
          after: 'bars',
        },
        {
          key: 'foo',
          type: 'fixed',
          before: 'bar',
        },
        {
          key: 'nest',
          type: 'modifed',
          before: {
            key: 'value',
          },
          after: 'str',
        },
      ],
    },
    {
      key: 'group2',
      type: 'removed',
      before: {
        abc: '12345',
      },
    },
    {
      key: 'follow',
      type: 'inserted',
      after: false,
    },
    {
      key: 'group3',
      type: 'inserted',
      after: {
        fee: '100500',
      },
    },
  ];

  const beforeFlatYaml = '__tests__/__fixtures__/YAML/flat.before.yml';
  const afterFlatYaml = '__tests__/__fixtures__/YAML/flat.after.yml';
  const beforeRecursiveYaml = '__tests__/__fixtures__/YAML/recursive.before.yml';
  const afterRecursiveYaml = '__tests__/__fixtures__/YAML/recursive.after.yml';

  it('Create AST for two flat YAML files', () => {
    const actual = createAst(parseFile(beforeFlatYaml), parseFile(afterFlatYaml));
    expect(JSON.stringify(actual)).toEqual(JSON.stringify(expectedAst));
  });

  it('Create AST for two recursive YAML files', () => {
    const actual = createAst(parseFile(beforeRecursiveYaml), parseFile(afterRecursiveYaml));
    // expect(true).toEqual(isEqual(actual, recursiveYamlAst));
    expect(JSON.stringify(actual)).toEqual(JSON.stringify(recursiveYamlAst));
  });
});
