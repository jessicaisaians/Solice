declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI: string;
      SERVER_ORIGIN: string;
      CORS_ORIGIN: string;
      PORT: string;
      KAVE_API_KEY: string;
    }
  }
}

export {}
