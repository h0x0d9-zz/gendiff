install:
	npm install
build:
	rm -rf dist
	npm run build
publish:
	npm publish
lint:
	npm run eslint .
test:
	npm test
watch:
	npm run watch