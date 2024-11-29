"use client";

import { useState, useEffect } from "react";
import { shuffleArray } from "../app/utils";

const QuestionsComponent = ({ questions, onComplete, group }) => {
  const timeLimit = group === "group-1" ? 45 : null;
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const likertScale = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
  ];

  useEffect(() => {
    const shuffled = shuffleArray(questions);
    setShuffledQuestions(shuffled);
    console.log(questions);
    setAnswers(
      shuffled.reduce((acc, question) => {
        acc[question.id] = "";
        return acc;
      }, {})
    );
  }, [questions]);

  useEffect(() => {
    if (group === "group-1" && timeLeft === 0) {
      handleAutoSubmit();
    }
    if (group === "group-1" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, group]);

  // update the answer for the specific question
  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleSubmit = () => {
    if (Object.values(answers).some((answer) => answer === "")) {
      alert("Please answer all questions before submitting.");
      return;
    }
    onComplete(answers);
  };

  const handleAutoSubmit = () => {
    console.log("Auto-submitting due to timeout.");
    onComplete(answers);
  };

  return (
    <div className="p-6 h-min-screen flex justify-center">
      {group === "group-1" && timeLeft !== null && (
        <div
          className="radial-progress fixed top-5 right-5"
          style={{
            "--value": (timeLeft / timeLimit) * 100,
            "--size": "4rem",
            "--thickness": "0.5rem",
          }}
          role="progressbar"
        >
          {timeLeft}s
        </div>
      )}
      <div className="max-w-[700px] flex flex-col justify-center items-center">
        <h1 className="text-lg font-bold mb-4">Answer the Questions Below</h1>
        <form>
          <div className="space-y-8">
            {shuffledQuestions.map((question, index) => (
              <div key={question.id} className="mb-6">
                <p className="font-medium mb-4">{`${index + 1}. ${
                  question.text
                }`}</p>
                <div className="flex flex-col space-y-4">
                  {
                    question.id < 4 ? (
                      <div className="flex space-x-4">
                        <div className="text-sm mt-1">{question.answers[0]}</div>
                        {likertScale.map((option, optIndex) => (
                          <label
                            key={optIndex}
                            className="flex flex-col items-center space-y-2 text-center"
                          >
                            <input
                              type="radio"
                              name={`question-${question.id}`}
                              value={option}
                              checked={answers[question.id] === option}
                              onChange={() => handleAnswerChange(question.id, option)}
                              className="radio radio-primary"
                            />
                            <span className="text-sm mt-1">{option}</span>
                          </label>
                        ))}
                        <div className="text-sm mt-1">{question.answers[1]}</div>
                      </div>
                    ) : (
                      question.answers.map((option, optIndex) => (
                        <label
                          key={optIndex}
                          className="flex items-center space-x-4"
                        >
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            value={option}
                            checked={answers[question.id] === option}
                            onChange={() => handleAnswerChange(question.id, option)}
                            className="radio radio-primary"
                          />
                          <span className="text-sm">{option}</span>
                        </label>
                      ))
                    )
                  }
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button
              type="button"
              className="btn btn-primary mt-6"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionsComponent;
