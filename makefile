MOCHA=node_modules/.bin/mocha
REPORTER?=tap
config?=test/config.json
test: unit
unit: 
	$(MOCHA) $(bail) $(shell find test/* -prune -name "*test.js") --reporter $(REPORTER)