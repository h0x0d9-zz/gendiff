import parse from './configparser';
import createAst from './diffast';
import makeRender from './render';

export default (beforeFilename, afterFilename, format) => {
  const beforeObj = parse(beforeFilename);
  const afterObj = parse(afterFilename);
  const ast = createAst(beforeObj, afterObj);
  const render = makeRender(format);

  return render(ast);
};
