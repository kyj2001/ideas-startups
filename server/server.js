const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const uploadRouter = require("./routes/upload");
const analyzeRouter = require("./routes/analyze");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "전월세 계약서 AI 체크 서비스 API 서버가 실행 중입니다.",
  });
});

app.use("/api/upload", uploadRouter);
app.use("/api/analyze", analyzeRouter);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "요청한 API 경로를 찾을 수 없습니다.",
  });
});

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "서버 오류가 발생했습니다.",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
