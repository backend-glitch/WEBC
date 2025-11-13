import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

const apiKey = "YOUR_API_KEY";

app.get("/news", async (req, res) => {
  const query = req.query.q || "";
  let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
  if (query) url += `&q=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

app.listen(3000, () => console.log("✅ Backend running on http://localhost:3000"));
