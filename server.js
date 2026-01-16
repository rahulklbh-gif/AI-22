const express = require("express");
const { exec } = require("child_process");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

if (!fs.existsSync("videos")) fs.mkdirSync("videos");

app.post("/generate", (req, res) => {
  const text = req.body.text;
  if (!text) return res.json({ error: "No text" });

  const name = Date.now();

  const cmd = `
ffmpeg -f lavfi -i color=c=black:s=720x1280:d=5 \
-vf "drawtext=text='${text.replace(/'/g, "")}':fontcolor=white:fontsize=48:x=(w-text_w)/2:y=(h-text_h)/2" \
videos/${name}.mp4
`;

  exec(cmd, (err) => {
    if (err) return res.json({ error: "FFmpeg error" });

    res.json({
      success: true,
      video: "/videos/" + name + ".mp4"
    });
  });
});

app.use("/videos", express.static("videos"));

app.listen(3000, () => console.log("Server started"));

