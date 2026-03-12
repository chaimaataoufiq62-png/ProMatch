/**
 * Centralised Winston logger.
 * Import this module in any controller / service that needs logging.
 *
 * Usage:
 *   const logger = require("../utils/logger");
 *   logger.error("Something went wrong", error);
 *   logger.info("Server started");
 */
const winston = require("winston");

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error"
    }),
    new winston.transports.File({
      filename: "logs/combined.log"
    })
  ]
});

module.exports = logger;
