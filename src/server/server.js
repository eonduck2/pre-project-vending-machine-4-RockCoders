import express from "express";
import path from "node:path";
import DataBaseManager from "../DB/modules/DBMANAGER.js";

// * ESM 방식의 __dirname 재정의
const __dirname = path.resolve();

/**
 * @crystal23733 24.06.25
 */
// *데이터베이스 경로 설정
const dbPath = path.join(__dirname, 'src/DB/product.db');

// *데이터베이스 객체 생성
const db = new DataBaseManager(dbPath);

const app = express();

// * 미들웨어로 등록하기 위한 경로 설정
const publicPath = path.join(__dirname, "public");
const srcPath = path.join(__dirname, "src");
const distPath = path.join(__dirname, "dist");

// * 환경 변수로 지정된 포트가 없으면 8080을 사용합니다.
app.set(`PORT`, process.env.PORT ?? 8080);
const PORT = app.get(`PORT`);

// * 미들웨어 등록
app.use(express.static(publicPath));
app.use('/dist', express.static(distPath));
app.use(express.static(srcPath));
app.use(express.urlencoded({extended : true}));

app.get("/", (req, res) => {
  return res.sendFile(path.join(publicPath, "index.html"));
});

app.post("/create", (req, res) => {
  const body = req.body;
  
  return res.redirect("/");
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
