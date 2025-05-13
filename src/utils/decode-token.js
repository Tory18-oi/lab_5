import { auth } from "../config/firebase-config.js"; // імпортуємо auth

export const decodeToken = async (token) => {
  return await auth.verifyIdToken(token); // використовується auth, а не admin.auth()
};
