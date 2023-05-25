import test from "node:test";
import assert from "node:assert";
import "@jcbhmr/node-45981";
import "../src/index";

test("exposes globals", () => {
  assert(globalThis instanceof EventTarget);
  assert(ErrorEvent !== undefined);
  assert("onerror" in globalThis);
});

test("onerror manual dispatch", () => {
  let i = 0;
  globalThis.onerror = () => i++;
  globalThis.dispatchEvent(new Event("error"));
  globalThis.onerror = null;
  assert.equal(i, 1);
});
