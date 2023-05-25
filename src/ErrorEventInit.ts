interface ErrorEventInit extends EventInit {
  message?: string;
  filename?: string;
  lineno?: number;
  colno?: number;
  error?: any;
}
const ErrorEventInit = {
  from(o: unknown): ErrorEventInit & {
    message: string;
    filename: string;
    lineno: number;
    colno: number;
    error?: any;
  } {
    // TODO: Better coercion
    return o as {
      message: string;
      filename: string;
      lineno: number;
      colno: number;
      error?: any;
    };
  },
};

export default ErrorEventInit;
