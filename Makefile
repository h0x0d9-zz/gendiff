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
watch:
	npm run watch
obj-json:
	npm run babel-node -- src/bin/gendiff.js __tests__/__fixtures__/JSON/recursive.before.json __tests__/__fixtures__/JSON/recursive.after.json
obj-yaml:
	npm run babel-node -- src/bin/gendiff.js __tests__/__fixtures__/YAML/recursive.before.yml __tests__/__fixtures__/YAML/recursive.after.yml
obj-ini:
	npm run babel-node -- src/bin/gendiff.js __tests__/__fixtures__/INI/recursive.before.ini __tests__/__fixtures__/INI/recursive.after.ini
plain-json:
	npm run babel-node -- src/bin/gendiff.js -f plain __tests__/__fixtures__/JSON/recursive.before.json __tests__/__fixtures__/JSON/recursive.after.json
plain-yaml:
	npm run babel-node -- src/bin/gendiff.js -f plain __tests__/__fixtures__/YAML/recursive.before.yml __tests__/__fixtures__/YAML/recursive.after.yml
plain-ini:
	npm run babel-node -- src/bin/gendiff.js -f plain __tests__/__fixtures__/INI/recursive.before.ini __tests__/__fixtures__/INI/recursive.after.ini