# Functions (local development)

This folder contains Firebase Cloud Functions source (TypeScript) in `src/`.

Quick start (Windows `cmd`)

1. Install dependencies and build the functions:

```cmd
cd /d e:\01-Bussiness\Cflock\apps\functions
npm install
npm run build
```

2. Start the Firebase emulators for Functions and Firestore:

```cmd
cd /d e:\01-Bussiness\Cflock\apps\functions
npm run start:emulator
```

Notes

- The project uses TypeScript. Build output goes to `lib/` and `package.json` points `main` to `lib/index.js` so the emulator can load compiled functions.
- The `prepare` script runs `npm run build` automatically on `npm install` to ensure `lib/` is up to date.
- If you prefer to run the emulator from the repository root, make sure the root `firebase.json` (if present) points to the correct `functions.source` path.
- If you see errors about missing `lib/index.js`, run `npm run build` manually.

Front-end dev server (with proxy)

From the front-end folder, run:

```cmd
cd /d e:\01-Bussiness\Cflock\apps\carehalo-web
npm install
npm start
```

This uses `proxy.conf.json` to forward `/api` requests to the functions emulator (default target: `http://localhost:5001`). If your emulator runs on a different port, update `proxy.conf.json`.
