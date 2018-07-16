install:
	npm install
build:
	rm -rf dist
	npm run build
publish:
	npm publish
lint:
	npm run eslint .
start:
	npm run babel-node -- src/bin/gendiff.js
test:
	npm test
run:
	npm run babel-node -- src/bin/gendiff.js __tests__/__fixtures__/before.json __tests__/__fixtures__/after.json