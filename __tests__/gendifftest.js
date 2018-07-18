import fs from 'fs';
import genDiff from '../src';

const beforeFlatJson = '__tests__/__fixtures__/JSON/flat.before.json';
const afterFlatJson = '__tests__/__fixtures__/JSON/flat.after.json';
const beforeFlatYaml = '__tests__/__fixtures__/YAML/flat.before.yml';
const afterFlatYaml = '__tests__/__fixtures__/YAML/flat.after.yml';
const beforeFlatIni = '__tests__/__fixtures__/INI/flat.before.ini';
const afterFLatIni = '__tests__/__fixtures__/INI/flat.after.ini';

const beforeRecursiveJson = '__tests__/__fixtures__/JSON/recursive.before.json';
const afterRecursiveJson = '__tests__/__fixtures__/JSON/recursive.after.json';
const beforeRecursiveYaml = '__tests__/__fixtures__/YAML/recursive.before.yml';
const afterRecursiveYaml = '__tests__/__fixtures__/YAML/recursive.after.yml';
const beforeRecursiveIni = '__tests__/__fixtures__/INI/recursive.before.ini';
const afterRecursiveIni = '__tests__/__fixtures__/INI/recursive.after.ini';

describe('Comparison for the difference between flat files', () => {
  const expectedRender = fs.readFileSync('__tests__/__fixtures__/flat.expected', 'utf-8');

  it('Compare two JSON flat files', () => {
    const actual = genDiff(beforeFlatJson, afterFlatJson);
    expect(actual).toBe(expectedRender);
  });

  it('Compare two YAML flat files', () => {
    const actual = genDiff(beforeFlatYaml, afterFlatYaml);
    expect(actual).toBe(expectedRender);
  });

  it('Compare two INI flat files', () => {
    const actual = genDiff(beforeFlatIni, afterFLatIni);
    expect(actual).toBe(expectedRender);
  });
});

describe('Comparison for the difference between recursive files', () => {
  const expectedJsonRender = fs.readFileSync(
    '__tests__/__fixtures__/JSON/recursive.json.expected', 'utf-8',
  );
  const expectedYamlRender = fs.readFileSync(
    '__tests__/__fixtures__/YAML/recursive.yaml.expected', 'utf-8',
  );
  const expectedIniRender = fs.readFileSync(
    '__tests__/__fixtures__/INI/recursive.ini.expected', 'utf-8',
  );

  it('Compare two JSON recursive files', () => {
    const actual = genDiff(beforeRecursiveJson, afterRecursiveJson);
    expect(actual).toBe(expectedJsonRender);
  });

  it('Compare two YAML recursive files', () => {
    const actual = genDiff(beforeRecursiveYaml, afterRecursiveYaml);
    expect(actual).toBe(expectedYamlRender);
  });

  it('Compare two INI recursive files', () => {
    const actual = genDiff(beforeRecursiveIni, afterRecursiveIni);
    expect(actual).toBe(expectedIniRender);
  });
});
