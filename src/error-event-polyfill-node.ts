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

defineEventHandlerIDLAttribute(globalThis, "onerror");
process.on("uncaughtExceptionMonitor", (error) => {
  const filename = error?.stack?.split("\n")[1]?.split(" ")[1];
  // @ts-ignore
  const lineno = +error?.stack?.split("\n")[1]?.split(":")[1];
  // @ts-ignore
  const colno = +error?.stack?.split("\n")[1]?.split(":")[2];
  globalThis.dispatchEvent(
    new ErrorEvent("error", {
      error,
      message: error?.message,
      filename,
      lineno,
      colno,
    })
  );
});
