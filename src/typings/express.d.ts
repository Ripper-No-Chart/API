declare module Express {
  export interface Request {
    token: string;
    email: string;
    role: string;
  }
}
