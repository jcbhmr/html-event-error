import { defineEventHandlerIDLAttribute } from "@jcbhmr/html-event-handler-attributes";

if (typeof ErrorEvent === "undefined") {
  await import("./ErrorEvent-polyfill.js");
}

declare global {
  // @ts-ignore
  var onerror:
    | ((
        event?: Event | string,
        source?: string,
        lineno?: number,
        colno?: number,
        error?: Error
      ) => any)
    | null;
  interface WindowEventMap {
    error: ErrorEvent;
  }
}

// No isomorphic polyfill. We can't intercept errors unless there's a specific
// platform feature that lets us do that. 😢 The best we can do is this.
defineEventHandlerIDLAttribute(globalThis, "onerror");
