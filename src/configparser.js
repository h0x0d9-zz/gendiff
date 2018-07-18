import fs from 'fs';
import { safeLoad } from 'js-yaml';
import ini from 'ini';
import { extname } from 'path';

const parsers = {
  json: JSON.parse,
  yml: safeLoad,
  ini: ini.parse,
};

const getParserFor = format => parsers[format];

export default (fileName) => {
  const fileFormat = extname(fileName).slice(1);
  const rawData = fs.readFileSync(fileName, 'utf-8');
  return getParserFor(fileFormat)(rawData);
};
