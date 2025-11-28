import 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        uid: string;
        email: string;
        hospitalId: string;
      };
    }
  }
}