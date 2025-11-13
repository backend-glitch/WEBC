// to run : node server.js
// to stop backend server : ctrl + c int that terminal 

import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors()); // allow frontend requests

// API endpoint to get crypto price
app.get("/crypto", async (req, res) => {
  const { coin } = req.query;
  if (!coin) return res.status(400).json({ error: "No coin provided" });

  try {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// Start server
app.listen(3000, () => console.log("✅ Backend running at http://localhost:3000"));
