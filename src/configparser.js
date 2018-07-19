import { safeLoad } from 'js-yaml';
import ini from 'ini';

const parsers = {
  json: JSON.parse,
  yml: safeLoad,
  ini: ini.parse,
};

const getParserFor = format => parsers[format];

export default (data, format) => getParserFor(format)(data);
