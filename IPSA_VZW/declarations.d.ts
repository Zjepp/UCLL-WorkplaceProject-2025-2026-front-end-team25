declare module "*.png";
declare module "@env" {
  export const API_URL: string;
}

declare namespace NodeJS {
  interface ProcessEnv {
    EXPO_PUBLIC_API_URL?: string;
  }
}
