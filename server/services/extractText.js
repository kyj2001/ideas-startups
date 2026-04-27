const fs = require("fs/promises");
const pdfParse = require("pdf-parse");

const extractTextFromPdf = async (filePath) => {
  const buffer = await fs.readFile(filePath);
  const parsed = await pdfParse(buffer);
  const text = parsed.text.trim();

  if (!text) {
    const error = new Error("PDF에서 추출된 텍스트가 없습니다. 스캔본이라면 텍스트를 직접 붙여넣어 주세요.");
    error.status = 422;
    throw error;
  }

  return text;
};

module.exports = {
  extractTextFromPdf,
};
