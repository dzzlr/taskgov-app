const fs = require("fs");
const path = require("path");

const dataFilePath = path.join(__dirname, "../data/findings.json");

// Read JSON file
const readData = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(dataFilePath, "utf8", (err, data) => {
      if (err) reject(err);
      resolve(JSON.parse(data || "[]"));
    });
  });
};

// Write JSON file
const writeData = (data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), (err) => {
      if (err) reject(err);
      resolve();
    });
  });
};

// Generate Random ID
const generateRandomId = () => Math.random().toString(36).substr(2, 9);

module.exports = { readData, writeData, generateRandomId };