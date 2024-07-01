import app from "./server.js";

//* 환경 변수로 지정된 포트가 없으면 8080을 사용합니다.
const PORT = process.env.PORT ?? 8080;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});