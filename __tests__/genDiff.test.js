import fs from 'fs';
import genDiff from '../src';

describe('GendDiff', () => {
  const beforeJson = '__tests__/__fixtures__/before.json';
  const afterJson = '__tests__/__fixtures__/after.json';
  const expected = fs.readFileSync('__tests__/__fixtures__/JSON.expected', 'utf-8');

  it('Compare two JSON files', () => {
    const actual = genDiff(beforeJson, afterJson);
    expect(actual).toBe(expected);
  });
});
