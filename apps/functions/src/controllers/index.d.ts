// This file extends the Express Request interface to include a custom 'user' property.
// This allows us to attach user information from our authentication middleware
// without TypeScript complaining.

declare namespace Express {
  export interface Request {
    // Define the user object that is attached by the authMiddleware
    user?: { uid: string; email: string; hospitalId: string };
  }
}