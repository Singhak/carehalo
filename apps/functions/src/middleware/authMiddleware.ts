import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });

  const idToken = authHeader.split('Bearer ')[1];

  // Local dev bypass: accept a well-known test token and map to test tenant
  if (idToken === 'test-token') {
    req.user = { uid: 'dev-user', email: 'dev@local', hospitalId: 'test-tenant' };
    return next();
  }

  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    // Expect hospitalId in custom claim
    const hospitalId = decoded.hospitalId as string | undefined;
    if (!hospitalId) return res.status(403).json({ error: 'Hospital not found in token' });

    // Attach user and hospital info to request
    req.user = { uid: decoded.uid, email: decoded.email, hospitalId };
    next();
  } catch (err) {
    console.error('Auth error', err);
    return res.status(401).json({ error: 'Invalid token' });
  }
}