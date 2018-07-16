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

