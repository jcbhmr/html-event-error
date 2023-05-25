if (typeof ErrorEvent === "undefined") {
  await import("./ErrorEvent-polyfill.js");
}

if (!("onerror" in globalThis)) {
  await import("#error-event-polyfill.js");
}

export {};
