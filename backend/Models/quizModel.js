
import mongoose from 'mongoose'

const questionSchema = new mongoose.Schema({
    question: String,
    correct_answer: String,
    options: [String],
});

const quizSchema = new mongoose.Schema({
    category: String,
    questions: [questionSchema],
});

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;