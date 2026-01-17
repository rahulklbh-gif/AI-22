const express = require("express");
const cors = require("cors");

const app = express();

// ✅ CORS allow (VERY IMPORTANT)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
}));

// ✅ JSON body read
app.use(express.json());

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// ✅ VIDEO GENERATE ROUTE
app.post("/generate", async (req, res) => {
  try {
    const text = req.body.text;

    if (!text) {
      return res.status(400).json({ error: "Text missing" });
    }

    // 🔥 DEMO video (test ke liye)
    const demoVideo =
      "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4";

    res.json({
      success: true,
      videoUrl: demoVideo
    });

  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ PORT (Render requirement)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
