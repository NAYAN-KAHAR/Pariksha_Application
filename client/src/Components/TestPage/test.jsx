import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';

const TestPage = () => {
    const [questions, setQuestions] = useState([]); // all questions will store here
    const [index, setIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(1800);
    const [isTimerRunning, setIsTimerRunning] = useState(false); // Timer state
    const [selectedAnswers, setSelectedAnswers] = useState({}); // Track user's selected answers
    // const [allCorrect, setAllCorrect] = useState(false); // Check if all answers are correct
    const [loading, setLoading] = useState(true);


    const params = useParams();
    const { id } = params;
    const navigate = useNavigate();

    // Function to fetch quiz questions
    const getCategoryQuestions = async () => {
    
        try {
            const response = await axios.get(`http://localhost:3000/api/quiz/${id}`);
            setQuestions(response.data);
            // console.log(response.data);
            setIsTimerRunning(true);
            setLoading(false);  
        } catch (err) {
            // console.log(err);
            if(err.response.data.message="No token provided"){
                navigate('/');
            }
           
        }
    };

    useEffect(() => {
        getCategoryQuestions();
    }, []); 

  
    
    // Handle option rendering
    const handleOption = (options) => {
        return options.map((item, i) => (
            <div key={i} className="w-[110%] sm:w-[100%] md:w-[100%] lg:w-[100%] m-2 p-1 quiz-head  border border-gray-300 shadow-sm rounded-lg">
                <input className="m-2  " id={`radio-${i}`} name={`question-${index}`}
                    value={item}  // Value to be stored in the state
                    checked={selectedAnswers[index] === item}  // Check if the answer is selected for this question
                    onChange={() => handleInput(item)} // Update the state on selection
                    type="radio" />
                <label htmlFor={`radio-${i}`} className="m-2 cursor-pointer text-[12px] lg:text-sm md:text-sm sm:text-sm font-semibold">{item}</label>
            </div>
        ));
    };

    // Handle change for radio inputs
    const handleInput = (selected) => {
        // console.log('selecte',selectedAnswers)
        setSelectedAnswers((prevSelectedAnswers) => ({
            ...prevSelectedAnswers,
            [index]: selected, // Save the selected answer for the current question
            
        }));
    };

    // Timer functionality
    useEffect(() => {
        if (!isTimerRunning || timeLeft === 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer); // Stop the timer when time runs out
                    setTimeout(() => {
                        handleSubmit(); // this includes navigation
                    }, 0);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer); // stop
    }, [isTimerRunning, timeLeft]);


    const minutes = Math.floor(timeLeft / 60); // extracts minutes
    const seconds = timeLeft % 60; //  extracts seconds

    // Calculate progress based on the current question index
    const progress = ((index + 1) / questions.length) * 100;

    // handle submit all answers 
    const handleSubmit = () => {
        let tempScore = 0;
        questions.forEach((question, idx) => {
            if (selectedAnswers[idx] === question.correct_answer) {
                tempScore += 1;
            }
        });
    
        // Save everything for Dashboard analysis
        localStorage.setItem('marks', tempScore);
        localStorage.setItem('answers', JSON.stringify(selectedAnswers)); //  store object on local storage
        localStorage.setItem('id',id);
        navigate('/dashboard');
    };

    
    
    return (
        <>
            {loading ? (
                <div className="h-full w-full flex items-center flex-center">
                        <div>Loading...</div>
                </div>
            ):(
                <>
                <div className="test-div centered w-[90%] sm:w-[90%] md:w-[90%] lg:w-[80%] 2xl:w-[80%]  h-full ">
                <div className="flex mx-auto">
                    <div className="w-1/4 hidden lg:block md:blcok sm:block ">
                        <h3 className="m-2 text-center text-2xl font-bold quiz-head">Questions Map</h3>
                        {questions && questions.map((_, i) => {
                            return (
                              <button key={i} onClick={() => setIndex(i)} 
                                className={`m-2 rounded h-8 md:w-14 sm:w-12 lg:w-16 cursor-pointer hover:bg-gray-800 text-white ${i === index ? 'bg-gray-400' : 'bg-gray-700'}`}>{i+1}</button>
                            );
                        })}
                    </div>

                    <div className="w-full md:w-1/2 sm:w-1/2 lg:w-1/2">
                        {/* <h3 className="text-center text-[32px] font-bold ">Geography Questions</h3> */}
                        {questions && questions.map((data, i) => {
                            return (
                                <div  key={i}>
                                    {index === i && (
                                        <div className="w-full p-2">
                                            <h3 className="text-sm lg:text-xl md:text-xl sm:text-lg font-bold m-4">{index + 1}. {data.question}</h3>
                                            {handleOption(data.options)}

                                            <div className="w-[120%] sm:w-[100%] md:w-[100%] lg:w-[100%] flex justify-between quiz-head">
                                                <button disabled={index < 1} onClick={() => setIndex(index - 1)} className="bg-gray-700 text-white rounded h-8 w-18 lg:w-25 md:w-20 cursor-pointer hover:bg-gray-600">Previous</button>                   
                                            <button onClick={() => {
                                                if (index === 9) {
                                                    handleSubmit();
                                                } else {
                                                    setIndex(index + 1);
                                                }
                                            }}
                                            className={`text-white rounded h-8  w-18 lg:w-25 md:w-20  cursor-pointer ${index == 9 ? ' bg-red-500 hover:bg-red-400' : ' bg-gray-700 hover:bg-gray-600'}`}
                                        >{index === 9 ? 'Submit' : 'Next'}</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <div className="lg:w-1/4 md:w-1/5 sm:w-1/6">
                        <div className="lg:mt-5 w-20 h-20 timer-div centered flex flex-col lg:flex-row md:flex-row  items-center justify-center
                         bg-gray-700 lg:w-45 lg:h-45 md:w-40 md:h-40 sm:w-27 sm:h-27  rounded-[50%] ">
                            <p className="text-white text-sm lg:text-xl md:text-xl font-bold m-2">{minutes} Min</p>
                            <p className="text-white text-sm lg:text-xl md:text-xl font-bold">{seconds} Sec</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="py-3 progressbar">
                <div className="flex justify-evenly items-center">
                    <p className="font-bold m-1">{index + 1}/{questions.length}</p>
                    <p className="font-bold m-1">{Math.round(progress)}%</p>
                </div>

                <div className="flex items-center justify-center text-center">
                    <div className="w-[90%] lg:w-[40%] md:w-[50%]  h-2 bg-gray-200 rounded-full ">
                        <div className="h-full bg-gray-700 rounded-full"
                            style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
            </div>

                </>
            )}
        </>
    );
};

export default TestPage;

