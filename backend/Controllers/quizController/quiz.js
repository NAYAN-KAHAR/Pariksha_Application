
import axios from 'axios';
import Quiz from '../../Models/quizModel.js';
import { decode } from 'html-entities'; // decode HTML entities


const quizController =  async (req, res) => {
    const { categoryId } = req.params;

    try {
        // Check if quiz already exists
        let quiz = await Quiz.findOne({ category: categoryId });

        if (!quiz) {
            const response = await axios.get(`https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=medium&type=multiple`);

            const formattedQuestions = response.data.results.map((q) => {
                const options = [...q.incorrect_answers, q.correct_answer];
                options.sort(() => Math.random() - 0.5);

                return {
                    question: decode(q.question),
                    correct_answer: decode(q.correct_answer),
                    options: options.map(option => decode(option)), // see the model
                };
            });

            quiz = await Quiz.create({
                category: categoryId,
                questions: formattedQuestions,
            });
        }

        res.json(quiz.questions);
      
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to get quiz' });
    }
};

export default quizController;
