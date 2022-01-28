import express from 'express';
import HomeController from '../controllers/homeController';
import authentication from '../middlewares/authentication';

const midasRouter = express.Router();
midasRouter.use(authentication)

export default midasRouter.get('/test', HomeController.findAllData);
