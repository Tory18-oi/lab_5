import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import { authorize } from "./middleware/authorize.js";
import { db } from "./config/firebase-config.js";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import pino from "pino";

// Ініціалізація логера
const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "HH:MM:ss dd-mm-yyyy",
      ignore: "pid,hostname",
    },
  },
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/applications", authorize, async (req, res) => {
  try {
    const userId = req.token.user_id;

    console.log("fetched...");

    const q = db.collection("applications").where("firebaseId", "==", userId);

    const snapshot = await q.get();
    const userApplications = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    logger.info(
      `Fetched ${userApplications.length} applications for user ${userId}`
    );
    res.json(userApplications);
  } catch (error) {
    logger.error("Error fetching applications:", error);
    console.log(error);
    res.status(500).json({ message: "Failed to fetch applications" });
  }
});

app.post("/applications", authorize, async (req, res) => {
  const { company, title } = req.body;
  const firebaseId = req.token.user_id;

  if (!company || !title) {
    logger.warn("Missing company or title in request body");
    return res.status(400).json({ message: "Company and title are required" });
  }

  const newApplication = {
    company,
    title,
    firebaseId,
  };

  try {
    const docRef = await db.collection("applications").add(newApplication);
    logger.info(`New application added for user ${firebaseId}: ${docRef.id}`);
    res.status(201).json({
      message: "Application submitted",
      application: { id: docRef.id, ...newApplication },
    });
  } catch (error) {
    logger.error("Error adding application: ", error);
    console.log(error);
    res.status(500).json({ message: "Failed to submit application" });
  }
});

const port = 3000;

app.listen(port, () => {
  logger.info(`🚀 Server running on port ${port}`);
});
