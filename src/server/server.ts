import express, { Request, Response } from "express";
import path from "path";
import __dirname from "../modules/__dirname.js";
import dbManager from "../DB/db.js";

const app = express();

interface reqData {
  id : string,
  name : string,
  price : number
}

// *테이블 생성
dbManager.createTable('products', {
  id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
  name: 'TEXT',
  price: 'INTEGER'
});

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

app.get("/", (req, res) => {
  return res.sendFile(path.join(publicPath, "index.html"));
});

// *제품 추가
app.post("/create", (req, res) => {
  const { name, price } = req.body as reqData;
  dbManager.createRecord('products', {
    name : name,
    price : price
  });
  return res.redirect("/");
});

// *제품 수정
app.post('/update', (req, res) => {
  const { id, name, price } = req.body as reqData;
  dbManager.updateRecord('products', 'id', id, {
    name:name,
    price:price
  })
  return res.redirect('/');
})

// *제품 삭제
app.post('/delete', (req, res) => {
  const { id } = req.body;
  dbManager.deleteRecord('products', 'id', id);
  return res.redirect('/');
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});