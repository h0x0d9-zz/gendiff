import fs from 'fs';
import gendiff from '../src';

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
    const actual = gendiff(beforeFlatJson, afterFlatJson);
    expect(actual).toBe(expectedRender);
  });

  it('Compare two YAML flat files', () => {
    const actual = gendiff(beforeFlatYaml, afterFlatYaml);
    expect(actual).toBe(expectedRender);
  });

  it('Compare two INI flat files', () => {
    const actual = gendiff(beforeFlatIni, afterFLatIni);
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
    const actual = gendiff(beforeRecursiveJson, afterRecursiveJson);
    expect(actual).toBe(expectedJsonRender);
  });

  it('Compare two YAML recursive files', () => {
    const actual = gendiff(beforeRecursiveYaml, afterRecursiveYaml);
    expect(actual).toBe(expectedYamlRender);
  });

  it('Compare two INI recursive files', () => {
    const actual = gendiff(beforeRecursiveIni, afterRecursiveIni);
    expect(actual).toBe(expectedIniRender);
  });
});


describe('Comparison of the difference between flat files in plaintext format', () => {
  const expectedRender = fs.readFileSync('__tests__/__fixtures__/flat.plaintext.expected', 'utf-8');

  it('Compare two JSON flat files', () => {
    const actual = gendiff(beforeFlatJson, afterFlatJson, 'plain');
    expect(actual).toBe(expectedRender);
  });

  it('Compare two YAML flat files', () => {
    const actual = gendiff(beforeFlatYaml, afterFlatYaml, 'plain');
    expect(actual).toBe(expectedRender);
  });

  it('Compare two INI flat files', () => {
    const actual = gendiff(beforeFlatIni, afterFLatIni, 'plain');
    expect(actual).toBe(expectedRender);
  });
});


describe('Comparison of the difference between recursive files in plaintext format', () => {
  const expectedJsonRender = fs.readFileSync(
    '__tests__/__fixtures__/JSON/recursive.plaintext.expected', 'utf-8',
  );
  const expectedYamlRender = fs.readFileSync(
    '__tests__/__fixtures__/YAML/recursive.plaintext.expected', 'utf-8',
  );
  const expectedIniRender = fs.readFileSync(
    '__tests__/__fixtures__/INI/recursive.plaintext.expected', 'utf-8',
  );

  it('Compare two JSON recursive files', () => {
    const actual = gendiff(beforeRecursiveJson, afterRecursiveJson, 'plain');
    expect(actual).toBe(expectedJsonRender);
  });

  it('Compare two YAML recursive files', () => {
    const actual = gendiff(beforeRecursiveYaml, afterRecursiveYaml, 'plain');
    expect(actual).toBe(expectedYamlRender);
  });

  it('Compare two INI recursive files', () => {
    const actual = gendiff(beforeRecursiveIni, afterRecursiveIni, 'plain');
    expect(actual).toBe(expectedIniRender);
  });
});
