import fs from 'fs';
import { safeLoad } from 'js-yaml';
import ini from 'ini';
import { extname } from 'path';
import createAst from './diffast';
import makeRander from './render';

const parsers = {
  json: JSON.parse,
  yml: safeLoad,
  ini: ini.parse,
};

const getParserFor = format => parsers[format];

export const parseFile = (fileName) => {
  const fileFormat = extname(fileName).slice(1);
  const rawData = fs.readFileSync(fileName, 'utf-8');
  return getParserFor(fileFormat)(rawData);
};

export default (beforeFilename, afterFilename) => {
  const beforeObj = parseFile(beforeFilename);
  const afterObj = parseFile(afterFilename);
  const ast = createAst(beforeObj, afterObj);
  const render = makeRander(ast);

  return render;
};
