import express from 'express';
import { admin, createDB, deleteDB, report, updateDB } from '../controllers/adminController.js';

const adminRouter = express.Router();

adminRouter.get('/', admin);
adminRouter.post('/create', createDB);
adminRouter.post('/update', updateDB);
adminRouter.post('/delete', deleteDB);
adminRouter.get('/report', report);

export default adminRouter;