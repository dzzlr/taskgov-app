const express = require("express");
const { readData, writeData, generateRandomId } = require("../utils/helpers");

const router = express.Router();

// Get All Audit Findings
router.get("/", async (req, res) => {
  try {
    const data = await readData("../data/tasks.json");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to read data" });
  }
});

// Create a new Audit Finding
router.post("/", async (req, res) => {
  const {
    namaTugas,
    catatan,
    tanggal,
    status,
    pic
  } = req.body;

  const newTask = {
    id: generateRandomId(),
    namaTugas,
    catatan,
    tanggal,
    status,
    pic
  };

  try {
    const data = await readData("../data/tasks.json");
    data.push(newTask);
    await writeData(data, "../data/tasks.json");
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: "Failed to create data" });
  }
});

// Get Audit Finding by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await readData("../data/tasks.json");
    const finding = data.find((item) => item.id === id);
    if (!finding) return res.status(404).json({ error: "Finding not found" });
    res.json(finding);
  } catch (err) {
    res.status(500).json({ error: "Failed to read data" });
  }
});

// Update Audit Finding by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    namaTugas,
    catatan,
    tanggal,
    status,
    pic
  } = req.body;

  try {
    const data = await readData("../data/tasks.json");
    const index = data.findIndex((item) => item.id === id);
    if (index === -1) return res.status(404).json({ error: "Finding not found" });

    data[index] = { ...data[index], namaTugas, catatan, tanggal, status, pic };
    await writeData(data, "../data/tasks.json");
    res.json(data[index]);
  } catch (err) {
    res.status(500).json({ error: "Failed to update data" });
  }
});

// Delete Audit Finding by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const data = await readData("../data/tasks.json");
    const newData = data.filter((item) => item.id !== id);
    if (data.length === newData.length) return res.status(404).json({ error: "Finding not found" });

    await writeData(newData, "../data/tasks.json");
    res.json({ message: "Finding deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete data" });
  }
});

module.exports = router;