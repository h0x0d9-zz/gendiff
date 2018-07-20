import fs from 'fs';
import path, { extname } from 'path';
import gendiff from '../src';

const encoding = 'utf-8';
const fixturesDir = '__tests__/__fixtures__/';

const makeDirName = filename => extname(filename).slice(1);
const getFixturePath = name => path.join(fixturesDir, makeDirName(name), name);

describe('Comparison for the difference between flat files', () => {
  const expectedRender = fs.readFileSync(
    getFixturePath('objRenderOfFlat.expected'), encoding,
  );

  it('Compare two JSON flat files', () => {
    const actual = gendiff(
      getFixturePath('beforeFlat.json'), getFixturePath('afterFlat.json'),
    );
    expect(actual).toBe(expectedRender);
  });

  it('Compare two YAML flat files', () => {
    const actual = gendiff(
      getFixturePath('beforeFlat.yml'), getFixturePath('afterFlat.yml'),
    );
    expect(actual).toBe(expectedRender);
  });

  it('Compare two INI flat files', () => {
    const actual = gendiff(
      getFixturePath('beforeFlat.ini'), getFixturePath('afterFlat.ini'),
    );
    expect(actual).toBe(expectedRender);
  });
});

describe('Comparison for the difference between recursive files', () => {
  const expectedJsonRender = fs.readFileSync(
    getFixturePath('objRenderOfRecursiveJson.expected'), encoding,
  );

  const expectedYamlRender = fs.readFileSync(
    getFixturePath('objRenderOfRecursiveYaml.expected'), encoding,
  );
  const expectedIniRender = fs.readFileSync(
    getFixturePath('objRenderOfRecursiveIni.expected'), encoding,
  );

  it('Compare two JSON recursive files', () => {
    const actual = gendiff(
      getFixturePath('beforeRecursive.json'), getFixturePath('afterRecursive.json'),
    );
    expect(actual).toBe(expectedJsonRender);
  });

  it('Compare two YAML recursive files', () => {
    const actual = gendiff(
      getFixturePath('beforeRecursive.yml'), getFixturePath('afterRecursive.yml'),
    );
    expect(actual).toBe(expectedYamlRender);
  });

  it('Compare two INI recursive files', () => {
    const actual = gendiff(
      getFixturePath('beforeRecursive.ini'), getFixturePath('afterRecursive.ini'),
    );
    expect(actual).toBe(expectedIniRender);
  });
});


describe('Comparison of the difference between flat files in plaintext format', () => {
  const expectedRender = fs.readFileSync(
    getFixturePath('plainRenderOfFlat.expected'), encoding,
  );

  it('Compare two JSON flat files', () => {
    const actual = gendiff(
      getFixturePath('beforeFlat.json'), getFixturePath('afterFlat.json'), 'plain',
    );
    expect(actual).toBe(expectedRender);
  });

  it('Compare two YAML flat files', () => {
    const actual = gendiff(
      getFixturePath('beforeFlat.yml'), getFixturePath('afterFlat.yml'), 'plain',
    );
    expect(actual).toBe(expectedRender);
  });

  it('Compare two INI flat files', () => {
    const actual = gendiff(
      getFixturePath('beforeFlat.ini'), getFixturePath('afterFlat.ini'), 'plain',
    );
    expect(actual).toBe(expectedRender);
  });
});


describe('Comparison of the difference between recursive files in plaintext format', () => {
  const expectedJsonRender = fs.readFileSync(
    getFixturePath('plainRenderOfRecursiveJson.expected'), encoding,
  );
  const expectedYamlRender = fs.readFileSync(
    getFixturePath('plainRenderOfRecursiveYaml.expected'), encoding,
  );
  const expectedIniRender = fs.readFileSync(
    getFixturePath('plainRenderOfRecursiveIni.expected'), encoding,
  );

  it('Compare two JSON recursive files', () => {
    const actual = gendiff(
      getFixturePath('beforeRecursive.json'), getFixturePath('afterRecursive.json'), 'plain',
    );
    expect(actual).toBe(expectedJsonRender);
  });

  it('Compare two YAML recursive files', () => {
    const actual = gendiff(
      getFixturePath('beforeRecursive.yml'), getFixturePath('afterRecursive.yml'), 'plain',
    );
    expect(actual).toBe(expectedYamlRender);
  });

  it('Compare two INI recursive files', () => {
    const actual = gendiff(
      getFixturePath('beforeRecursive.ini'), getFixturePath('afterRecursive.ini'), 'plain',
    );
    expect(actual).toBe(expectedIniRender);
  });
});


describe('Comparison of the difference between recursive files in JSON format', () => {
  const expectedJsonRender = fs.readFileSync(
    getFixturePath('jsonRenderOfRecursiveJson.expected'), encoding,
  );
  const expectedYamlRender = fs.readFileSync(
    getFixturePath('jsonRenderOfRecursiveYaml.expected'), encoding,
  );
  const expectedIniRender = fs.readFileSync(
    getFixturePath('jsonRenderOfRecursiveIni.expected'), encoding,
  );

  it('Compare two JSON recursive files', () => {
    const actual = gendiff(
      getFixturePath('beforeRecursive.json'), getFixturePath('afterRecursive.json'), 'json',
    );
    expect(actual).toBe(expectedJsonRender);
  });

  it('Compare two YAML recursive files', () => {
    const actual = gendiff(
      getFixturePath('beforeRecursive.yml'), getFixturePath('afterRecursive.yml'), 'json',
    );
    expect(actual).toBe(expectedYamlRender);
  });

  it('Compare two INI recursive files', () => {
    const actual = gendiff(
      getFixturePath('beforeRecursive.ini'), getFixturePath('afterRecursive.ini'), 'json',
    );
    expect(actual).toBe(expectedIniRender);
  });
});
