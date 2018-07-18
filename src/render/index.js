import objectRender from './objectFormat';
import plainTextRender from './plaintextFormat';

const renders = {
  object: objectRender,
  plain: plainTextRender,
};

const makeRender = format => renders[format];

export default (format = 'object') => {
  return makeRender(format);
}
