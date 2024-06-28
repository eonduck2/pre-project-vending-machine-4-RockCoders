import express, { Request, Response } from "express";
import path from "path";
import __dirname from "../modules/__dirname.js";
import dbManager from "../DB/db.js";
import morgan from "morgan";

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
app.use(morgan('dev'));
app.use(express.static(publicPath));
app.use('/dist', express.static(distPath));
app.use(express.static(srcPath));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.sendFile(path.join(publicPath, "index.html"));
});

app.get('/admin', (req, res) => {
  return res.sendFile(path.join(publicPath, "admin.html"));
})

// *제품 추가
app.post("/create", (req, res) => {
  const { name, price } = req.body as reqData;
  dbManager.createRecord('products', {
    name : name,
    price : price
  });
  return res.redirect('/admin');
});

// dbManager.readRecordsAll('products', false)  // 모든 상품 데이터를 조회합니다. (log를 false로 설정하여 console에 로깅하지 않습니다)


app.get("/products", (req, res) => {
  //직렬구조 보장
  dbManager.db.serialize(()=>{
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

// *제품 수정
app.post('/update', (req, res) => {
  const { id, name, price } = req.body as reqData;
  dbManager.updateRecord('products', 'id', id, {
    name:name,
    price:price
  })
  return res.redirect('/admin');
})

// *제품 삭제
app.post('/delete', (req, res) => {
  const { id } = req.body;
  dbManager.deleteRecord('products', 'id', id);
  return res.redirect('/admin');
})

interface Product {
  name: string;
  price: number;
}

app.post('/purchase', (req, res) => {
  dbManager.db.serialize(()=> {
    const products : Product[] = req.body.products;

    // * 배열이 아닌 경우 err
    if (!Array.isArray(products)) {
      return res.status(400).send('유효한 변수 타입이 아닙니다.');
    }

    // * history Table 생성
    dbManager.createTable("history", {
      "name" : "TEXT",
      "price" : "INTEGER"
    });

    // * products 배열을 받아서 각각의 레코드 생성
    products.forEach(product => {
      // * 각 레코드의 형식 변환
      const record: Record<string, string | number> = {
        name: product.name,
        price: product.price
      };
      // * history 테이블에 레코드 추가
      dbManager.createRecord("history", record);
    });

    // * 데이터베이스 연결 종료
    dbManager.closeConnection()
    res.send('데이터베이스 연결 종료');
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});