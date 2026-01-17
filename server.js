const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ROOT ROUTE
app.get("/", (req, res) => {
  res.send("Server is running OK");
});

// GENERATE API
app.post("/generate", (req, res) => {
  const text = req.body.text;

  if (!text) {
    return res.status(400).json({ error: "Text missing" });
  }

  res.json({
    success: true,
    videoUrl:
      "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4"
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
