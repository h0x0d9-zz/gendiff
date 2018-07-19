import objectRender from './objectFormat';
import plainTextRender from './plaintextFormat';
import jsonRender from './jsonFormat';

const renders = {
  object: objectRender,
  plain: plainTextRender,
  json: jsonRender,
};

const makeRender = format => renders[format];

export default (format = 'object') => makeRender(format);
