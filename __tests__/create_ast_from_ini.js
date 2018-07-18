import { parseFile } from '../src';
import createAst from '../src/diffast';


describe('Create AST for the difference between flat INI files', () => {
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

  const beforeFlatIni = '__tests__/__fixtures__/INI/flat.before.ini';
  const afterFlatIni = '__tests__/__fixtures__/INI/flat.after.ini';
  const beforeRecursiveIni = '__tests__/__fixtures__/INI/recursive.before.ini';
  const afterRecursiveIni = '__tests__/__fixtures__/INI/recursive.after.ini';

  it('Create AST for two flat INI files', () => {
    const actual = createAst(parseFile(beforeFlatIni), parseFile(afterFlatIni));
    expect(JSON.stringify(actual)).toEqual(JSON.stringify(expectedFlatAst));
  });

  it('Create AST for two recursive INI files', () => {
    const actual = createAst(parseFile(beforeRecursiveIni), parseFile(afterRecursiveIni));
    expect(JSON.stringify(actual)).toEqual(JSON.stringify(expectedRecursiveAst));
  });
});
