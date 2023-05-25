![🚧 Under construction 👷‍♂️](https://i.imgur.com/LEP2R3N.png)

# `ErrorEvent` and `.onerror` for Node.js

🌋 Provides an ErrorEvent implementation and listens to `process.on("error")`

🧊 Isomorphically works on all platforms, including the browser! \
🛑 Assumes the global object is an `EventTarget` \
📦 Exposes `ErrorEvent.js` for other uses

## Installation

![npm](https://img.shields.io/static/v1?style=for-the-badge&message=npm&color=CB3837&logo=npm&logoColor=FFFFFF&label=)
![Yarn](https://img.shields.io/static/v1?style=for-the-badge&message=Yarn&color=2C8EBB&logo=Yarn&logoColor=FFFFFF&label=)
![pnpm](https://img.shields.io/static/v1?style=for-the-badge&message=pnpm&color=222222&logo=pnpm&logoColor=F69220&label=)

You can install this polyfill locally using npm, [Yarn], [pnpm], or any other
npm-compatible package manager:

```sh
npm install @jcbhmr/html-event-error
```

💡 You can also use this on other non-Node.js platforms like Deno or Bun. If you
import it in the browser, it'll just be a no-op.

## Usage

![Node.js](https://img.shields.io/static/v1?style=for-the-badge&message=Node.js&color=339933&logo=Node.js&logoColor=FFFFFF&label=)
![Deno](https://img.shields.io/static/v1?style=for-the-badge&message=Deno&color=000000&logo=Deno&logoColor=FFFFFF&label=)
![Bun](https://img.shields.io/static/v1?style=for-the-badge&message=Bun&color=000000&logo=Bun&logoColor=FFFFFF&label=)

This package assumes that the global object is an `EventTarget`. This is **not**
the case by default for Node.js users. To fix this, you can use
[jcbhmr/node-45981] which implements [nodejs/node#45981] in user-land.

```js
// app.js
import "@jcbhmr/node-45981";
import "@jcbhmr/html-event-error";

onerror = console.log;
// 🛑 Process will still exit!
throw new Error("Hello world!");
//=> ErrorEvent { error: Error: Hello world! }
```

💡 You can use this to send error reports back to your logging service when your
Node.js app crashes on a user's PC! Just make sure you're using something like
`fetchSync()` or similar to send the report, as Node.js will exit before an
async request can be sent.

If you just want to include the `ErrorEvent` implementation in your own
polyfill, that's awesome! 🙌 You can access all the interfaces via a pattern
like this:

```js
// lib.js
import ErrorEvent from "@jcbhmr/html-event-error/ErrorEvent.js";
import ErrorEventInit from "@jcbhmr/html-event-error/ErrorEventInit.js";

export const coerceErrorEventInit = (init) => ErrorEventInit.from(init);
export const dispatchErrorEvent = (target) =>
  target.dispatchEvent(new ErrorEvent("error", { error: new Error() }));
```

Here's a support matrix for `.onerror` and `ErrorEvent` as of May 2023:

|               | Node.js | Deno | Bun | Browser |
| ------------- | ------- | ---- | --- | ------- |
| `error` event | ❌      | ✅   | ❌  | ✅      |
| `.onerror`    | ❌      | ✅   | ❌  | ✅      |
| `ErrorEvent`  | ❌      | ✅   | ✅  | ✅      |

ℹ Remember, you probably don't need this unless you're working in a Node.js
environment. Browser support for the `ErrorEvent` and `.onerror` is universal.

<div align="center">

![](https://caniuse.bitsofco.de/static/v1/mdn-api__ErrorEvent-1685055837886.png)

</div>
