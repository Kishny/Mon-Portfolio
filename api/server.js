const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connecté"))
  .catch((err) => console.error("Erreur MongoDB:", err));

app.use("/api/temoignages", require("./routes/temoignages"));

const PORT = process.env.PORT || 5001; // ← change 5000 en 5001
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
