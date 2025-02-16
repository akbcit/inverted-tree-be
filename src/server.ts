import dotenv from "dotenv";
import { app, initDatabase } from "./app";
import logger from "./logger/logger";

dotenv.config();

// ✅ Start server only if running locally
if (!process.env.AWS_LAMBDA_FUNCTION_NAME) {
  const PORT = 3000;

  // Initialize database and start server
  initDatabase()
    .then(() => {
      const server = app.listen(PORT, () => {
        logger.info(`Server running on port ${PORT}`);
      });

      // Gracefully handle shutdown
      const shutdown = (signal: string) => {
        logger.info(`Received ${signal}. Gracefully shutting down...`);
        server.close(() => {
          logger.info("Server closed.");
          process.exit(0);
        });
      };

      process.on("SIGINT", () => shutdown("SIGINT"));
      process.on("SIGTERM", () => shutdown("SIGTERM"));
      process.on("unhandledRejection", (err: Error) => {
        logger.error("UNHANDLED REJECTION! Shutting down...");
        logger.error(err.stack);
        server.close(() => process.exit(1));
      });
    })
    .catch((error) => {
      logger.error("Failed to initialize database:", error);
      process.exit(1);
    });
}