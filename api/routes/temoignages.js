const express = require("express");
const router = express.Router();
const Temoignage = require("../models/Temoignage");

// POST - Ajouter un témoignage
router.post("/", async (req, res) => {
  try {
    const { nom, fonction, message, note, type } = req.body;

    if (!nom || !fonction || !message || !note || !type) {
      return res
        .status(400)
        .json({ success: false, error: "Champs requis manquants." });
    }

    const nouveau = new Temoignage({ nom, fonction, message, note, type });
    await nouveau.save();
    res.status(201).json({ success: true, data: nouveau });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET - Récupérer tous les témoignages
router.get("/", async (req, res) => {
  try {
    const temoignages = await Temoignage.find().sort({ date: -1 });
    res.status(200).json(temoignages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

// DELETE - Supprimer un témoignage
router.delete("/:id", async (req, res) => {
  try {
    await Temoignage.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
