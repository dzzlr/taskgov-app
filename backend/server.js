const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

// Path ke file JSON
const dataFilePath = path.join(__dirname, process.env.DATA_FILE_PATH || "./data/auditFindings.json");

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Helper function: Read JSON file
const readData = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(dataFilePath, "utf8", (err, data) => {
      if (err) reject(err);
      resolve(JSON.parse(data || "[]"));
    });
  });
};

// Helper function: Write JSON file
const writeData = (data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), (err) => {
      if (err) reject(err);
      resolve();
    });
  });
};

// **API Endpoints**

// Get All Audit Findings
app.get("/api/findings", async (req, res) => {
  try {
    const data = await readData();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to read data" });
  }
});

// Create a new Audit Finding
app.post("/api/findings", async (req, res) => {
  const generateRandomId = () => Math.random().toString(36).substr(2, 9);

  const {
    kategoriAudit,
    namaTemuan,
    penyebab,
    rekomendasi,
    komitmenTindakLanjut,
    batasAkhirKomitmen,
    status,
  } = req.body;

  const newFinding = {
    id: generateRandomId(),
    kategoriAudit,
    namaTemuan,
    penyebab,
    rekomendasi,
    komitmenTindakLanjut,
    batasAkhirKomitmen,
    status,
  };

  try {
    const data = await readData();
    data.push(newFinding);
    await writeData(data);
    res.status(201).json(newFinding);
  } catch (err) {
    res.status(500).json({ error: "Failed to create data" });
  }
});

// Get Audit Finding by ID
app.get("/api/findings/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await readData();
    const finding = data.find((item) => item.id === id);
    if (!finding) {
      return res.status(404).json({ error: "Finding not found" });
    }
    res.json(finding);
  } catch (err) {
    res.status(500).json({ error: "Failed to read data" });
  }
});

// Update Audit Finding by ID
app.put("/api/findings/:id", async (req, res) => {
  const { id } = req.params;
  const {
    kategoriAudit,
    namaTemuan,
    penyebab,
    rekomendasi,
    komitmenTindakLanjut,
    batasAkhirKomitmen,
    status,
  } = req.body;

  try {
    const data = await readData();
    const index = data.findIndex((item) => item.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Finding not found" });
    }

    data[index] = {
      ...data[index],
      kategoriAudit,
      namaTemuan,
      penyebab,
      rekomendasi,
      komitmenTindakLanjut,
      batasAkhirKomitmen,
      status,
    };

    await writeData(data);
    res.json(data[index]);
  } catch (err) {
    res.status(500).json({ error: "Failed to update data" });
  }
});

// Delete Audit Finding by ID
app.delete("/api/findings/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const data = await readData();
    const newData = data.filter((item) => item.id !== id);
    if (data.length === newData.length) {
      return res.status(404).json({ error: "Finding not found" });
    }

    await writeData(newData);
    res.json({ message: "Finding deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete data" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
