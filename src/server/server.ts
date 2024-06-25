import express, { Request, Response } from "express";
import path from "path";
import DataBaseManager from "../DB/modules/DBMANAGER.js";  // 데이터베이스 모듈 경로는 환경에 맞게 수정 필요

//* ESM 방식의 __dirname 재정의
const __dirname = path.resolve();

//* 데이터베이스 경로 설정
const dbPath = path.join(__dirname, 'src/DB/product.db');

//* 데이터베이스 객체 생성
const db = new DataBaseManager(dbPath);

const app = express();

//* 미들웨어로 등록하기 위한 경로 설정
const publicPath = path.join(__dirname, "public");
const srcPath = path.join(__dirname, "src");
const distPath = path.join(__dirname, "dist");

//* 환경 변수로 지정된 포트가 없으면 8080을 사용합니다.
const PORT = process.env.PORT ?? 8080;

//* 미들웨어 등록
app.use(express.static(publicPath));
app.use('/dist', express.static(distPath));
app.use(express.static(srcPath));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  return res.sendFile(path.join(publicPath, "index.html"));
});

app.post("/create", (req: Request, res: Response) => {
  const body = req.body;
  console.log(body); //* 요청된 폼 데이터가 제대로 출력됩니다.
  return res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});