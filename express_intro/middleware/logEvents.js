const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, logName) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    const logDir = path.join(__dirname, "..", "logs");
    if (!fs.existsSync(logDir)) {
      await fsPromises.mkdir(logDir, { recursive: true });
    }

    await fsPromises.appendFile(path.join(logDir, logName), logItem);
  } catch (err) {
    console.error("Error writing log:", err);
  }
};

const logger = (req, res, next) => {
  logEvents(
    `${req.method}\t${req.url}\t${req.headers.origin || "no origin"}`,
    "reqLog.txt"
  );
  console.log(`${req.method} and ${req.path}`);
  next();
};

module.exports = { logEvents, logger };
