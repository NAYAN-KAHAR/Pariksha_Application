import { useState } from "react";
import { Link } from "react-router-dom";


const HomePage = () => {
  const [category, setCategory] = useState([
    { quizName: "General Knowledge Test", value: 9 },
    { quizName: "Sports Test", value: 21 },
    { quizName: "History Test", value: 23 },
    { quizName: "Geography Test", value: 22 },
    { quizName: "Science & Nature Test", value: 17 },
    { quizName: "Politics Test", value: 24 },
    { quizName: "Mathodology Test", value: 20 },
    { quizName: "Animals Test", value: 27 },
  ]);

  return (
    <div className="w-full min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-10 grid lg:grid-cols-2 gap-8 items-center">
        <div className="py-6 text-center lg:text-left space-y-5">
          <h2 className="text-4xl font-extrabold leading-snug">
            India’s Structured Online Test Series Platform
          </h2>
          <p className="text-lg font-medium text-gray-600">
            Boost your exam preparation with Test Series for Banking, SSC, RRB & other Govt. Exams
          </p>
        </div>

        <div className="hidden sm:block">
          <img
            src="https://static.vecteezy.com/system/resources/previews/027/483/655/non_2x/of-online-exam-illustration-vector.jpg"
            alt="Online Exam" className="w-full h-auto rounded-xl shadow-md"
          />
        </div>
      </div>

      {/* Test Categories */}
      <div className="container mx-auto px-4 py-8">
        <h3 className="text-2xl font-bold mb-6 text-center">Available Tests</h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {category.map((data, i) => (
            <div key={i}
              className="bg-gradient-to-br from-gray-200 to-white border rounded-lg shadow-md p-5 flex flex-col justify-between"
            >
              <p className="text-lg font-semibold text-center mb-4">{data.quizName}</p>

              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>📄 10 Questions</span>
                <span>⏱ 5 Mins</span>
                <span>🔢 10 Marks</span>
              </div>

              <p className="text-sm text-center font-medium text-blue-600 mb-4">🌐 English</p>

              <Link to={`/test/${data.value}`} className="mt-auto w-full py-2 cursor-pointer bg-gray-700 hover:bg-gray-600 text-white rounded-md transition duration-200 text-center">  Start Now </Link>
            </div>
          ))}
        </div>
      </div>

   
    </div>
  );
};

export default HomePage;
