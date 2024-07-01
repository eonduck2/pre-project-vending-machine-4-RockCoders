import express from 'express';
import { home, products } from '../controllers/rootController.js';

const rootRouter = express.Router();

rootRouter.get('/', home);
rootRouter.get('/products', products);

export default rootRouter;