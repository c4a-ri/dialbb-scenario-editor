// src/types/electron-api.d.ts

export {};

declare global {
  interface Window {
    electronAPI: {
      getUserDataPath: () => Promise<string>;
      joinPath: (...args: string[]) => string;
    };
  }
}
