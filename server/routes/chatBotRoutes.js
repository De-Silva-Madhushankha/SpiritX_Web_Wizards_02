import express from 'express';
import  chatBotController from '../controllers/chatBotController.js';

const chatBotRouter = express.Router();

chatBotRouter.post('/', chatBotController);

export default chatBotRouter;
