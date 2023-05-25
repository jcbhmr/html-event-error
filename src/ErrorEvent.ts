import ErrorEventInit from "./ErrorEventInit.js";

export default class ErrorEvent extends Event {
  #error: Error;
  #message: string;
  #filename: string;
  #lineno: number;
  #colno: number;
  constructor(type: string, eventInitDict_: ErrorEventInit = {}) {
    type = `${type}`;
    const eventInitDict = ErrorEventInit.from(eventInitDict_);

    super(type, eventInitDict);

    this.#error = eventInitDict.error;
    this.#message = eventInitDict.message;
    this.#filename = eventInitDict.filename;
    this.#lineno = eventInitDict.lineno;
    this.#colno = eventInitDict.colno;
  }

  get error(): Error {
    return this.#error;
  }

  get message(): string {
    return this.#message;
  }

  get filename(): string {
    return this.#filename;
  }

  get lineno(): number {
    return this.#lineno;
  }

  get colno(): number {
    return this.#colno;
  }
}
