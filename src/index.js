import { extname } from 'path';
import fs from 'fs';

import parse from './configparser';
import createAst from './diffast';
import makeRender from './render';


const encoding = 'utf-8';

const selectFileTypeFrom = filename => extname(filename).slice(1);

export default (beforeFilename, afterFilename, format) => {
  const beforeType = selectFileTypeFrom(beforeFilename);
  const afterType = selectFileTypeFrom(afterFilename);
  const beforeRaw = fs.readFileSync(beforeFilename, encoding);
  const afterRaw = fs.readFileSync(afterFilename, encoding);

  const beforeObj = parse(beforeRaw, beforeType);
  const afterObj = parse(afterRaw, afterType);
  const ast = createAst(beforeObj, afterObj);
  const render = makeRender(format);

  return render(ast);
};
