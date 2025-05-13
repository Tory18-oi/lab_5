import admin from "firebase-admin";
import { readFileSync } from "fs";
import path from "path";

// Оновлений шлях до файлу
const mode = "DEVELOPMENT";

const serviceAccountPath = path.resolve(
  mode === "DEVELOPMENT"
    ? "./src/config/service-account.json"
    : "/etc/secrets/service-account.json"
);

const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf8"));

// Перевірка чи вже ініціалізовано Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  admin.app(); // Якщо вже ініціалізовано, просто використовуємо існуюче
}

// Ініціалізація Firestore
const db = admin.firestore();

// Ініціалізація Auth
const auth = admin.auth();

// Експортуємо db та auth
export { db, auth };
