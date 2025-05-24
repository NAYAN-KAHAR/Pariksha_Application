
import express from 'express';
import quizController from '../Controllers/quizController/quiz.js';


const router = express.Router();

router.get('/quiz/:categoryId', quizController);

export default router;
