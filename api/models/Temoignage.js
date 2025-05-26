const mongoose = require("mongoose");

const TemoignageSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  fonction: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  note: {
    type: Number,
    min: 1,
    max: 5,
    default: 5, // tu peux aussi ne pas mettre de défaut et le rendre obligatoire
  },
  type: {
    type: String,
    enum: ["particulier", "entreprise"],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Temoignage", TemoignageSchema);
