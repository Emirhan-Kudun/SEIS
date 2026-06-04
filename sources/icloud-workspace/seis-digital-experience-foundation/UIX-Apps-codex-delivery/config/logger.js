// Structured logging configuration
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const LOG_DIR = path.join(ROOT, "..", "logs");
const ENV = process.env.NODE_ENV || "development";
const LOG_LEVEL = process.env.LOG_LEVEL || "info";

const LEVELS = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3
};

async function ensureLogDir() {
  try {
    await mkdir(LOG_DIR, { recursive: true });
  } catch (err) {
    console.error("Failed to create log directory:", err);
  }
}

function formatTimestamp() {
  return new Date().toISOString();
}

function shouldLog(level) {
  return LEVELS[level] <= LEVELS[LOG_LEVEL];
}

async function writeLogFile(entry) {
  try {
    await ensureLogDir();
    const filename = path.join(LOG_DIR, `${new Date().toISOString().split("T")[0]}.log`);
    await appendFile(filename, JSON.stringify(entry) + "\n", "utf8");
  } catch (err) {
    console.error("Failed to write log:", err);
  }
}

function createLogEntry(level, message, data = {}) {
  return {
    timestamp: formatTimestamp(),
    level,
    environment: ENV,
    message,
    ...data,
    pid: process.pid
  };
}

export const logger = {
  error(message, data) {
    if (shouldLog("error")) {
      const entry = createLogEntry("error", message, data);
      console.error(JSON.stringify(entry));
      writeLogFile(entry).catch(() => {});
    }
  },

  warn(message, data) {
    if (shouldLog("warn")) {
      const entry = createLogEntry("warn", message, data);
      console.warn(JSON.stringify(entry));
      writeLogFile(entry).catch(() => {});
    }
  },

  info(message, data) {
    if (shouldLog("info")) {
      const entry = createLogEntry("info", message, data);
      console.log(JSON.stringify(entry));
      writeLogFile(entry).catch(() => {});
    }
  },

  debug(message, data) {
    if (shouldLog("debug")) {
      const entry = createLogEntry("debug", message, data);
      console.debug(JSON.stringify(entry));
      writeLogFile(entry).catch(() => {});
    }
  }
};
