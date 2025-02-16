// app.ts
import express, { Application } from "express";
import morgan from "morgan";
import cors, { CorsOptions } from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/error.middleware";
import { captureUserLocation } from "./middleware/userDetails.middleware";
import dotenv from "dotenv";
import logger from "./logger/logger";
import { db, testDBConnection } from "./db/database";
import subscriptionRouter from "./routes/subscribe.routes";
import { limiter } from "./middleware/limiter.middleware";
import quizRouter from "./routes/quiz.routes";

dotenv.config();

const app: Application = express();

// Configure Express for Lambda
app.use(express.json({
  limit: '10mb',
  strict: true
}));

app.use(cookieParser());
app.use(morgan("dev"));

// Debug logging middleware (filtered headers)
app.use((req, res, next) => {
  logger.info(`[DEBUG] ${req.method} ${req.url}`);
  const filteredHeaders = { ...req.headers };
  delete filteredHeaders["authorization"];
  logger.info(`[DEBUG] Headers: ${JSON.stringify(filteredHeaders, null, 2)}`);
  next();
});

// Capture user location
app.use(captureUserLocation);

// CORS Configuration
const allowedOrigins: string[] = [
  process.env.FRONTEND_URL_PROD || "",
  process.env.FRONTEND_URL_DEV || "",
].filter((origin) => origin.trim() !== "");

const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 600
};

app.use(cors(corsOptions));

// Database connection (without immediate execution)
const initDatabase = async () => {
  try {
    await testDBConnection();
    logger.info("Database connection established");
  } catch (error) {
    logger.error("Database connection failed:", error);
    throw error; // Let the handler deal with the error
  }
};

// Routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

app.get("/api", (req, res) => {
  res.status(200).json({ message: "API is operational" });
});

app.use("/api/subscription", subscriptionRouter);
app.use("/api/quiz", quizRouter);

app.use(limiter);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
    hint: "Check the API documentation or ensure the route is correct.",
  });
});

// Error handler
app.use(errorHandler);

export { app, initDatabase };
