declare module 'qrcode.js' {
  interface QRCodeOptions {
    text: string;
    width?: number;
    height?: number;
    colorDark?: string;
    colorLight?: string;
    correctLevel?: unknown;
  }

  class QRCode {
    static CorrectLevel: {
      L: unknown;
      M: unknown;
      Q: unknown;
      H: unknown;
    };

    constructor(options: QRCodeOptions);
    makeCode(text: string): void;
    getModules(): boolean[][];
  }

  export = QRCode;
}