import ErrorEvent_ from "./ErrorEvent.js";
import ErrorEventInit_ from "./ErrorEventInit.js";

declare global {
  // @ts-ignore
  type ErrorEvent = ErrorEvent_;
  // @ts-ignore
  var ErrorEvent: typeof ErrorEvent_;
  // @ts-ignore
  type ErrorEventInit = ErrorEventInit_;
}

globalThis.ErrorEvent = ErrorEvent_;
