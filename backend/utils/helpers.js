const fs = require("fs");
const path = require("path");

const dataFilePath = path.join(__dirname, "../data/findings.json");
const usersFilePath = path.join(__dirname, "../data/users.json");

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

const readUsers = () => {
  return JSON.parse(fs.readFileSync(usersFilePath, "utf8"));
};

// Generate Random ID
const generateRandomId = () => Math.random().toString(36).substr(2, 9);

module.exports = { readData, writeData, readUsers, generateRandomId };