const express = require("express");
const multer = require("multer");
const path = require("path");

const { extractTextFromPdf } = require("../services/extractText");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: (req, file, cb) => {
    const safeOriginalName = file.originalname.replace(/[^\w.\-가-힣]/g, "_");
    cb(null, `${Date.now()}-${safeOriginalName}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["application/pdf", "image/jpeg", "image/png"];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new Error("PDF, JPG, PNG 파일만 업로드할 수 있습니다."));
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

router.post("/", upload.single("file"), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "업로드된 파일이 없습니다. field name은 file이어야 합니다.",
      });
    }

    if (req.file.mimetype === "image/jpeg" || req.file.mimetype === "image/png") {
      return res.status(200).json({
        success: false,
        text: "",
        message: "이미지 OCR은 현재 제한적으로 지원합니다. 텍스트를 직접 붙여넣어 주세요.",
      });
    }

    const text = await extractTextFromPdf(req.file.path);

    return res.status(200).json({
      success: true,
      text,
      message: "텍스트 추출이 완료되었습니다.",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
