import fs from 'fs';
import gendiff from '../src';

const encoding = 'utf-8';

const fixturesPaths = {
  beforeFlatJson: '__tests__/__fixtures__/JSON/flat.before.json',
  afterFlatJson: '__tests__/__fixtures__/JSON/flat.after.json',
  beforeFlatYaml: '__tests__/__fixtures__/YAML/flat.before.yml',
  afterFlatYaml: '__tests__/__fixtures__/YAML/flat.after.yml',
  beforeFlatIni: '__tests__/__fixtures__/INI/flat.before.ini',
  afterFLatIni: '__tests__/__fixtures__/INI/flat.after.ini',

  beforeRecursiveJson: '__tests__/__fixtures__/JSON/recursive.before.json',
  afterRecursiveJson: '__tests__/__fixtures__/JSON/recursive.after.json',
  beforeRecursiveYaml: '__tests__/__fixtures__/YAML/recursive.before.yml',
  afterRecursiveYaml: '__tests__/__fixtures__/YAML/recursive.after.yml',
  beforeRecursiveIni: '__tests__/__fixtures__/INI/recursive.before.ini',
  afterRecursiveIni: '__tests__/__fixtures__/INI/recursive.after.ini',

  objRenderOfFlatObject: '__tests__/__fixtures__/flat.expected',
  objRenderOfRecursiveJson: '__tests__/__fixtures__/JSON/recursive.json.expected',
  objRenderOfRecursiveYaml: '__tests__/__fixtures__/YAML/recursive.yaml.expected',
  objRenderOfRecursiveIni: '__tests__/__fixtures__/INI/recursive.ini.expected',
  plainRenderOfFlatObject: '__tests__/__fixtures__/flat.plaintext.expected',
  plainRenderOfRecursiveJson: '__tests__/__fixtures__/JSON/recursive.plaintext.expected',
  plainRenderOfRecursiveYaml: '__tests__/__fixtures__/YAML/recursive.plaintext.expected',
  plainRenderOfRecursiveIni: '__tests__/__fixtures__/INI/recursive.plaintext.expected',
  jsonRenderOfRecursiveJson: '__tests__/__fixtures__/JSON/recursive.jsonFormat.expected',
  jsonRenderOfRecursiveYaml: '__tests__/__fixtures__/YAML/recursive.jsonFormat.expected',
  jsonRenderOfRecursiveIni: '__tests__/__fixtures__/INI/recursive.jsonFormat.expected',
};

const getFixturePath = name => fixturesPaths[name];


describe('Comparison for the difference between flat files', () => {
  const expectedRender = fs.readFileSync(getFixturePath('objRenderOfFlatObject'), encoding);

  it('Compare two JSON flat files', () => {
    const actual = gendiff(
      getFixturePath('beforeFlatJson'), getFixturePath('afterFlatJson'),
    );
    expect(actual).toBe(expectedRender);
  });

  it('Compare two YAML flat files', () => {
    const actual = gendiff(
      getFixturePath('beforeFlatYaml'), getFixturePath('afterFlatYaml'),
    );
    expect(actual).toBe(expectedRender);
  });

  it('Compare two INI flat files', () => {
    const actual = gendiff(
      getFixturePath('beforeFlatIni'), getFixturePath('afterFLatIni'),
    );
    expect(actual).toBe(expectedRender);
  });
});

describe('Comparison for the difference between recursive files', () => {
  const expectedJsonRender = fs.readFileSync(
    getFixturePath('objRenderOfRecursiveJson'), encoding,
  );

  const expectedYamlRender = fs.readFileSync(
    getFixturePath('objRenderOfRecursiveYaml'), encoding,
  );
  const expectedIniRender = fs.readFileSync(
    getFixturePath('objRenderOfRecursiveIni'), encoding,
  );

  it('Compare two JSON recursive files', () => {
    const actual = gendiff(
      getFixturePath('beforeRecursiveJson'), getFixturePath('afterRecursiveJson'),
    );
    expect(actual).toBe(expectedJsonRender);
  });

  it('Compare two YAML recursive files', () => {
    const actual = gendiff(
      getFixturePath('beforeRecursiveYaml'), getFixturePath('afterRecursiveYaml'),
    );
    expect(actual).toBe(expectedYamlRender);
  });

  it('Compare two INI recursive files', () => {
    const actual = gendiff(
      getFixturePath('beforeRecursiveIni'), getFixturePath('afterRecursiveIni'),
    );
    expect(actual).toBe(expectedIniRender);
  });
});


describe('Comparison of the difference between flat files in plaintext format', () => {
  const expectedRender = fs.readFileSync(getFixturePath('plainRenderOfFlatObject'), encoding);

  it('Compare two JSON flat files', () => {
    const actual = gendiff(
      getFixturePath('beforeFlatJson'), getFixturePath('afterFlatJson'), 'plain',
    );
    expect(actual).toBe(expectedRender);
  });

  it('Compare two YAML flat files', () => {
    const actual = gendiff(
      getFixturePath('beforeFlatYaml'), getFixturePath('afterFlatYaml'), 'plain',
    );
    expect(actual).toBe(expectedRender);
  });

  it('Compare two INI flat files', () => {
    const actual = gendiff(
      getFixturePath('beforeFlatIni'), getFixturePath('afterFLatIni'), 'plain',
    );
    expect(actual).toBe(expectedRender);
  });
});


describe('Comparison of the difference between recursive files in plaintext format', () => {
  const expectedJsonRender = fs.readFileSync(
    getFixturePath('plainRenderOfRecursiveJson'), encoding,
  );
  const expectedYamlRender = fs.readFileSync(
    getFixturePath('plainRenderOfRecursiveYaml'), encoding,
  );
  const expectedIniRender = fs.readFileSync(
    getFixturePath('plainRenderOfRecursiveIni'), encoding,
  );

  it('Compare two JSON recursive files', () => {
    const actual = gendiff(
      getFixturePath('beforeRecursiveJson'), getFixturePath('afterRecursiveJson'), 'plain',
    );
    expect(actual).toBe(expectedJsonRender);
  });

  it('Compare two YAML recursive files', () => {
    const actual = gendiff(
      getFixturePath('beforeRecursiveYaml'), getFixturePath('afterRecursiveYaml'), 'plain',
    );
    expect(actual).toBe(expectedYamlRender);
  });

  it('Compare two INI recursive files', () => {
    const actual = gendiff(
      getFixturePath('beforeRecursiveIni'), getFixturePath('afterRecursiveIni'), 'plain',
    );
    expect(actual).toBe(expectedIniRender);
  });
});


describe('Comparison of the difference between recursive files in JSON format', () => {
  const expectedJsonRender = fs.readFileSync(
    getFixturePath('jsonRenderOfRecursiveJson'), encoding,
  );
  const expectedYamlRender = fs.readFileSync(
    getFixturePath('jsonRenderOfRecursiveYaml'), encoding,
  );
  const expectedIniRender = fs.readFileSync(
    getFixturePath('jsonRenderOfRecursiveIni'), encoding,
  );

  it('Compare two JSON recursive files', () => {
    const actual = gendiff(
      getFixturePath('beforeRecursiveJson'), getFixturePath('afterRecursiveJson'), 'json',
    );
    expect(actual).toBe(expectedJsonRender);
  });

  it('Compare two YAML recursive files', () => {
    const actual = gendiff(
      getFixturePath('beforeRecursiveYaml'), getFixturePath('afterRecursiveYaml'), 'json',
    );
    expect(actual).toBe(expectedYamlRender);
  });

  it('Compare two INI recursive files', () => {
    const actual = gendiff(
      getFixturePath('beforeRecursiveIni'), getFixturePath('afterRecursiveIni'), 'json',
    );
    expect(actual).toBe(expectedIniRender);
  });
});
