declare namespace NodeJS {
  export interface ProcessEnv {
    JWT_SECRET: string;
    DB_USER_NAME?: string;
    DB_USER_PSWD?: string;
  }
}
