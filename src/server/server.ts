import express, { Request, Response } from "express";
import path from "path";
import __dirname from "../modules/__dirname.js";
import { BaseDataBaseManager } from "../DB/modules/DBMANAGER.js";

const app = express();


//* 미들웨어로 등록하기 위한 경로 설정
const publicPath = path.join(__dirname, "..", "..", "public");
const srcPath = path.join(__dirname, "..", "src");
const distPath = path.join(__dirname, "..", "dist");

//* 환경 변수로 지정된 포트가 없으면 8080을 사용합니다.
const PORT = process.env.PORT ?? 8080;

//* db class 호출
const dbManager = new BaseDataBaseManager('../../productList.db');


//* 미들웨어 등록
app.use(express.static(publicPath));
app.use('/dist', express.static(distPath));
app.use(express.static(srcPath));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  return res.sendFile(path.join(publicPath, "index.html"));
});



dbManager.createTable("products", {"id":"INTEGER" ,"name": "TEXT", "price": "INTEGER"});

// dbManager.readRecordsAll('products', false)  // 모든 상품 데이터를 조회합니다. (log를 false로 설정하여 console에 로깅하지 않습니다)


app.get("/products", (req, res) => {
  //직렬구조 보장
  dbManager.db.serialize(()=>{
    dbManager.createTable("products", {"id":"INTEGER" ,"name": "TEXT", "price": "INTEGER"});
    dbManager.readRecordsAll('products', false)  // 모든 상품 데이터를 조회합니다. (log를 false로 설정하여 console에 로깅하지 않습니다)
    .then((products) => {
      res.json(products);  // 조회된 상품 데이터를 JSON 형식으로 클라이언트에 응답합니다.
    })
    .catch((err) => {
      console.error('Error fetching products:', err);
      res.status(500).json({ error: 'Failed to fetch products' });
    });
  });
});


app.post("/create", (req: Request, res: Response) => {
  const body = req.body;
  console.log(body); //* 요청된 폼 데이터가 제대로 출력됩니다.
  return res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});