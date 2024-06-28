import express, { Request, Response } from "express";
import path from "path";
import __dirname from "../modules/__dirname.js";
import { BaseDataBaseManager } from "../DB/modules/DBMANAGER.js";

const app = express();

//* 미들웨어로 등록하기 위한 경로 설정
const publicPath = path.join(__dirname, "public");
const srcPath = path.join(__dirname, "src");
const distPath = path.join(__dirname, "dist");

//* 환경 변수로 지정된 포트가 없으면 8080을 사용합니다.
const PORT = process.env.PORT ?? 8080;

const dbManager = new BaseDataBaseManager('../../productList.db');

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

interface Product {
  name: string;
  price: number;
}

app.post('/purchase', (req, res) => {
  const products : Product[] = req.body.products;

  if (!Array.isArray(products)) {
    return res.status(400).send('Invalid products list');
  }

  dbManager.createTable("history", {
    "name" : "TEXT",
    "price" : "INTEGER"
  });

  products.forEach(product => {
    const record: Record<string, string | number> = {
      name: product.name,
      price: product.price
    };
    dbManager.createRecord("history", record);
  });

  dbManager.closeConnection()
  res.send('Products added to history');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});