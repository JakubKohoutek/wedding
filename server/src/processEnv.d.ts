declare namespace NodeJS {
  export interface ProcessEnv {
    JWT_SECRET: string;
    DB_USER_NAME?: string;
    DB_USER_PSWD?: string;
    BASE_API_URL: string;
    ADMIN_NAME: string;
    ADMIN_PSWD: string;
    ADMIN_EMAIL: string;
  }
}
