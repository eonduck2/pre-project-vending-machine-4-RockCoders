import path from 'path';
//* ESM 방식의 __dirname 재정의
const __dirname:string = path.resolve();

export default __dirname;