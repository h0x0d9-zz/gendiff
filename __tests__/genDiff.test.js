import fs from 'fs';
import genDiff from '../src';

describe('GendDiff', () => {
  const expected = fs.readFileSync('__tests__/__fixtures__/expected', 'utf-8');


  it('Compare two JSON files', () => {
    const beforeJson = '__tests__/__fixtures__/before.json';
    const afterJson = '__tests__/__fixtures__/after.json';
    const actual = genDiff(beforeJson, afterJson);
    expect(actual).toBe(expected);
  });

  it('Compare two YAML files', () => {
    const beforeYaml = '__tests__/__fixtures__/before.yml';
    const afterYaml = '__tests__/__fixtures__/after.yml';
    const actual = genDiff(beforeYaml, afterYaml);
    expect(actual).toBe(expected);
  });
});
