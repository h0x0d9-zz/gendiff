import { parseFile } from '../src';
import createAst from '../src/diffast';

describe('Comparison for the difference between flat files', () => {
  const expectedFlatAst = [
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

  const expectedRecursiveAst = [
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
      key: 'group3',
      type: 'inserted',
      after: {
        fee: '100500',
      },
    },
    {
      key: 'follow',
      type: 'inserted',
      after: false,
    },
  ];

  const beforeFlatJson = '__tests__/__fixtures__/JSON/flat.before.json';
  const afterFlatJson = '__tests__/__fixtures__/JSON/flat.after.json';
  const beforeRecursiveJson = '__tests__/__fixtures__/JSON/recursive.before.json';
  const afterRecursiveJson = '__tests__/__fixtures__/JSON/recursive.after.json';

  it('Create AST for two flat JSON files', () => {
    const actual = createAst(parseFile(beforeFlatJson), parseFile(afterFlatJson));
    expect(JSON.stringify(actual)).toEqual(JSON.stringify(expectedFlatAst));
  });

  it('Create AST for two recursive JSON files', () => {
    const actual = createAst(parseFile(beforeRecursiveJson), parseFile(afterRecursiveJson));
    expect(JSON.stringify(actual)).toEqual(JSON.stringify(expectedRecursiveAst));
  });
});
