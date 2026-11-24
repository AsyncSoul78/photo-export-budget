const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { check } = require('../scripts/size-budget');
const sample = path.join(__dirname, '..', 'example', 'autumn-park-1200.jpg');
test('reports the actual byte size and accepts a generous limit', () => {
  const value = check(sample, 1024);
  assert.ok(value.bytes > 0);
  assert.equal(value.within, true);
});
test('flags a tighter budget', () => assert.equal(check(sample, 1).within, false));
test('rejects invalid limits', () => assert.throws(() => check(sample, -1), /Limit/));
