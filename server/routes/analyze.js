const express = require("express");

const { analyzeContractText } = require("../services/geminiService");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { contractText } = req.body;

    if (!contractText || typeof contractText !== "string" || !contractText.trim()) {
      return res.status(400).json({
        success: false,
        message: "contractText는 비어 있지 않은 문자열이어야 합니다.",
      });
    }

    const data = await analyzeContractText(contractText);

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
