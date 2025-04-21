const mongoose = require("mongoose");

const TemoignageSchema = new mongoose.Schema({
  nom: String,
  fonction: String,
  message: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Temoignage", TemoignageSchema);
