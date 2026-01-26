/* src/firebase/firebase-init.js */
import { FIREBASE_CONFIG } from "./firebase-config.js";

let firebaseApp = null;
let db = null;
let auth = null;

async function loadFirebaseSDKs() {
  const sdks = [
    "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js",
    "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js",
    "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth-compat.js"
  ];
  for (const src of sdks) {
    await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = resolve;
      script.onerror = () => reject(new Error(`Failed to load ${src}`));
      document.head.appendChild(script);
    });
  }
  let attempts = 0;
  while (!window.firebase && attempts < 50) {
    await new Promise(r => setTimeout(r, 100));
    attempts++;
  }
  if (!window.firebase) throw new Error("Firebase SDK failed to load");
}

export async function initFirebase() {
  if (firebaseApp) return;
  if (!window.firebase) {
    await loadFirebaseSDKs();
  }
  firebaseApp = window.firebase.initializeApp(FIREBASE_CONFIG);
  db = firebaseApp.firestore();
  auth = firebaseApp.auth();
}

export function getDb() {
  if (!db) throw new Error("Firebase not initialized. Call initFirebase() first.");
  return db;
}

export function getAuth() {
  if (!auth) throw new Error("Firebase not initialized. Call initFirebase() first.");
  return auth;
}
