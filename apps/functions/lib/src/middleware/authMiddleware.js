"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const admin = __importStar(require("firebase-admin"));
async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer '))
        return res.status(401).json({ error: 'Unauthorized' });
    const idToken = authHeader.split('Bearer ')[1];
    // Local dev bypass: accept a well-known test token and map to test tenant
    if (idToken === 'test-token') {
        req.user = { uid: 'dev-user', email: 'dev@local', hospitalId: 'test-tenant' };
        return next();
    }
    try {
        const decoded = await admin.auth().verifyIdToken(idToken);
        // Expect hospitalId in custom claim
        const hospitalId = decoded.hospitalId;
        if (!hospitalId)
            return res.status(403).json({ error: 'Hospital not found in token' });
        // Attach user and hospital info to request
        req.user = { uid: decoded.uid, email: decoded.email, hospitalId };
        next();
    }
    catch (err) {
        console.error('Auth error', err);
        return res.status(401).json({ error: 'Invalid token' });
    }
}
exports.authMiddleware = authMiddleware;
