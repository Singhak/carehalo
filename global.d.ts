// This file extends the Express Request interface to include a custom 'user' property.
// This allows us to attach user information from our authentication middleware
// without TypeScript complaining.

declare global {
  namespace Express {
    interface Request {
      user?: { uid: string; email?: string; hospitalId: string };
    }
  }
}
