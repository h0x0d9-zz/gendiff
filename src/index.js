import parse from './configparser';
import createAst from './diffast';
import render from './render';

export default (beforeFilename, afterFilename) => {
  const beforeObj = parse(beforeFilename);
  const afterObj = parse(afterFilename);
  const ast = createAst(beforeObj, afterObj);
  return render(ast);
};
