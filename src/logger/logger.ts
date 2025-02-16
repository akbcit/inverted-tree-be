import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'debug', // Ensure all logs are printed
  transport: {
    target: 'pino-pretty',
    options: { colorize: true } // Pretty logs in development
  }
});

logger.info("🚀 App started! Logger initialized successfully.");

export default logger;
