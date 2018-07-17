import fs from 'fs';
import genDiff, { parseFile, parseToAst } from '../src';

describe('Comparison for the difference between flat files', () => {
  const expectedRender = fs.readFileSync('__tests__/__fixtures__/flat.expected', 'utf-8');
  const expectedFlatAst = [
    {
      name: 'host',
      type: 'not modifed',
      oldValue: 'hexlet.io',
    },
    {
      name: 'timeout',
      type: 'modifed',
      oldValue: 50,
      newValue: 20,
    },
    {
      name: 'proxy',
      type: 'removed',
      oldValue: '123.234.53.22',
    },
    {
      name: 'follow',
      type: 'removed',
      oldValue: false,
    },
    {
      name: 'verbose',
      type: 'added',
      newValue: true,
    },
  ];

  const beforeJson = '__tests__/__fixtures__/flat.before.json';
  const afterJson = '__tests__/__fixtures__/flat.after.json';
  const beforeYaml = '__tests__/__fixtures__/flat.before.yml';
  const afterYaml = '__tests__/__fixtures__/flat.after.yml';
  const beforeIni = '__tests__/__fixtures__/flat.before.ini';
  const afterIni = '__tests__/__fixtures__/flat.after.ini';


  it('Create AST for two flat JSON files', () => {
    const actual = parseToAst(parseFile(beforeJson), parseFile(afterJson));
    expect(actual).toBe(expectedFlatAst);
  });

  it('Compare two JSON flat files', () => {
    const actual = genDiff(beforeJson, afterJson);
    expect(actual).toBe(expectedRender);
  });

  it('Create AST for two flat YAML files', () => {
    const actual = parseToAst(parseFile(beforeYaml), parseFile(afterYaml));
    expect(actual).toBe(expectedFlatAst);
  });

  it('Compare two YAML flat files', () => {
    const actual = genDiff(beforeYaml, afterYaml);
    expect(actual).toBe(expectedRender);
  });

  it('Create AST for two flat INI files', () => {
    const actual = parseToAst(parseFile(beforeIni), parseFile(afterIni));
    expect(actual).toBe(expectedFlatAst);});

  it('Compare two INI flat files', () => {
    const actual = genDiff(beforeIni, afterIni);
    expect(actual).toBe(expectedRender);
  });
});

describe('Comparison for the difference between recursive files', () => {
  const expectedRender = fs.readFileSync('__tests__/__fixtures__/recursive.expected', 'utf-8');

  const expectedFlatAst = [
    {
      name: 'common',
      type: 'not changed',
      children: [
        {
          name: 'follow',
          type: 'added',
          newValue: false,
        },
        {
          name: 'setting1',
          type: 'not modifed',
          oldValue: 'Value 1',
        },
        {
          name: 'setting2',
          type: 'removed',
          oldValue: 200,
        },
        { 
          name: 'setting3',
          type: 'modifed',
          oldValue: 200,
          children: [
            {
              name: 'key',
              type: 'not modifed',
              oldValue: 'value',
            },
          ],
        },
        {
          name: 'setting6',
          type: 'not modifed',
          children: [
            {
              name: 'key',
              type: 'not modifed',
              oldValue: 'value',
            },
            {
              name: 'ops',
              type: 'added',
              newValue: 'vops',
            },
          ],
        },
        {
          name: 'setting4',
          type: 'added',
          newValue: 'blah blah',
        },
        {
          name: 'setting5',
          type: 'added',
          children: [
            {
              name: 'key5',
              type: 'not modifed',
              oldValue: 'value5',
            },
          ],
        }
      ],
    },
    {
      name: 'group1',
      type: 'not modifed',
      children: [
        {
          name: 'baz',
          type: 'modifed',
          oldValue: 'bas',
          newValue: 'bars',
        },
        {
          name: 'foo',
          type: 'not modifed',
          oldValue: 'bar',
        },
        {
          name: 'nest',
          type: 'modifed',
          newValue: 'str',
          children: [
            {
              name: 'key',
              type: 'not modifed',
              oldValue: 'value',
            },
          ],
        },
      ],
    },
    {
      name: 'group2',
      type: 'deleted',
      children: [
        {
          name: 'abc',
          type: 'not modifed',
          oldValue: 12345,
        },
      ],
    },
    {
      name: 'group3',
      type: 'added',
      children: [
        {
          name: 'fee',
          type: 'not modifed',
          oldValue: 100500,
        },
      ],
    },
  ];

  it('Create AST for two flat JSON files', () => {
    const actual = parseToAst(parseFile(beforeJson), parseFile(afterJson));
    expect(actual).toBe(expectedFlatAst);
  });

  it('Compare two JSON recursive files', () => {
    const beforeJson = '__tests__/__fixtures__/recursive.before.json';
    const afterJson = '__tests__/__fixtures__/recursive.after.json';
    const actual = genDiff(beforeJson, afterJson);
    expect(actual).toBe(expectedRender);
  });

  it('Create AST for two flat YAML files', () => {
    const actual = parseToAst(parseFile(beforeYaml), parseFile(afterYaml));
    expect(actual).toBe(expectedFlatAst);
  });

  it('Compare two YAML recursive files', () => {
    const beforeYaml = '__tests__/__fixtures__/recursive.before.yml';
    const afterYaml = '__tests__/__fixtures__/recursive.after.yml';
    const actual = genDiff(beforeYaml, afterYaml);
    expect(actual).toBe(expectedRender);
  });

  it('Create AST for two recursive INI files', () => {
    const actual = parseToAst(parseFile(beforeIni), parseFile(afterIni));
    expect(actual).toBe(expectedFlatAst);
  });

  it('Compare two INI recursive files', () => {
    const beforeIni = '__tests__/__fixtures__/recursive.before.ini';
    const afterIni = '__tests__/__fixtures__/recursive.after.ini';
    const actual = genDiff(beforeIni, afterIni);
    expect(actual).toBe(expectedRender);
  });
});
