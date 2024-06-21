import express from "express";
import path from "node:path";

const app = express();

// * ESM 방식의 __dirname 재정의
const __dirname = path.resolve();

// * 미들웨어로 등록하기 위한 경로 설정
const publicPath = path.join(__dirname, "public");
const srcPath = path.join(__dirname, "src");

// * 환경 변수로 지정된 포트가 없으면 8080을 사용합니다.
app.set(`PORT`, process.env.PORT ?? 8080);
const PORT = app.get(`PORT`);

// * 미들웨어 등록
app.use("/public", express.static(publicPath));
app.use("/src", express.static(srcPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
