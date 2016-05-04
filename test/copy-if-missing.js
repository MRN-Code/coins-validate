const cim = require('../src/copy-if-missing');
const test = require('tape');
const path = require('path');
const fs = require('fs');
const cp = require('child_process');

const getJSONValue = (filename) => { // eslint-disable-line
  return JSON.parse(fs.readFileSync(filename)).value;
};

const setup = () => {
  cp.execSync('rm -rf ' + __dirname + '/tmp'); // eslint-disable-line
  cp.execSync('mkdir -p ' + __dirname + '/tmp'); // eslint-disable-line
};
const teardown = () => cp.execSync('rm -rf ' + __dirname + '/tmp'); // eslint-disable-line

test('copy if missing', t => {
  t.plan(2);
  setup();
  try {
    cim(
      path.join(__dirname, 'templates/test-template.json'),
      path.join(__dirname, 'tmp/test-template.json')
    );
    t.equals(
      getJSONValue(path.resolve(__dirname, './tmp/test-template.json')),
      42,
      'template copy ok'
    );

    // attempt another copy template, assert value not overwritten
    cim(
      path.join(__dirname, 'templates/test-template-2.json'),
      path.join(__dirname, 'tmp/test-template.json')
    );
    t.equals(
      getJSONValue(path.resolve(__dirname, './tmp/test-template.json')),
      42,
      'template copy not overridden'
    );
  } catch (err) {
    t.fail('did not copy template correctly');
  }
  teardown();
  t.end();
});
