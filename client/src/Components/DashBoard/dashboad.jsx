import { useEffect, useState } from "react";
import axios from 'axios';
import { backedUrl } from "../Constant";

const DashBoard = () => {
  const [questions, setQuestions] = useState([]);

  const result = Number(localStorage?.getItem("marks"));
  const selectedAnswers = JSON.parse(localStorage.getItem("answers")) || {};
  const id = localStorage.getItem('id');

  useEffect(() => {
    const fetchquestion = async () => {
        try{
            const response = await axios.get(`backedUrl/api/quiz/${id}`);
            setQuestions(response.data);
        }catch(err){
            console.log(err)
        }
    }
    if(id) fetchquestion();
  },[]);

  const getOptionStyle = (option, correct, selected) => {
    if (option === selected && option !== correct) return "bg-red-200 border-red-500";
    if (option === correct) return "bg-green-200 border-green-500";
    return "bg-white border-gray-300";
  };

  const getStatus = (correct, selected) => {
    if (!selected) return { label: "Not Attempted", color: "text-yellow-500" };
    if (selected === correct) return { label: "Correct", color: "text-green-600" };
    return { label: "Wrong", color: "text-red-500" };
  };

  return (
    <div className="w-[100%] lg:w-[70%] md:w-[80%] sm:w-[80%] h-full centered">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 items-center justify-between">
        <div className="test-div py-3">
          <h2 className="text-center font-bold text-xl text-black">
            Your score is {result} out of 10
          </h2>
        </div>

        <div className="test-div">
          <img src={ result >= 6
                ? "https://png.pngtree.com/png-clipart/20230914/original/pngtree-win-clipart-boy-holding-a-trophy-in-an-orange-shirt-with-png-image_12151575.png"
                : "https://img.freepik.com/premium-vector/cute-little-boy-with-crying-tantrum-expression_97632-4503.jpg?semt=ais_hybrid&w=740"
            }
            width={340}
            alt="Result" className="shadow-lg rounded-xl mx-auto" />
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-8">
        <h1 className="text-3xl font-bold mb-2 underline text-center">Question Analysis</h1>

        {questions.map((question, i) => {
          const selected = selectedAnswers[i];
          const { label, color } = getStatus(question.correct_answer, selected);

          return (
            <div key={i} className="mb-6 p-4 border border-gray-300 rounded-lg shadow-sm">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold mb-2 w-[80%]"> {i + 1}. {question.question}</h3>
                <span className={`text-sm font-semibold ${color}`}>{label}</span>
              </div>

              <div className="flex flex-col gap-2">
                {question.options.map((option, j) => (
                  <div key={j} className={`p-2 rounded border ${getOptionStyle(
                      option,question.correct_answer, selected)}`}>{option}</div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashBoard;
