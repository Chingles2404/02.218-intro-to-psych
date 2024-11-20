"use client";

import { useState, useEffect } from "react";
import { shuffleArray } from "../app/utils";

const QuestionsComponent = ({ questions, onComplete, group }) => {
  const timeLimit = group === "group-1" ? 10 : null; // 2-minute timer for group-1
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const likertScale = [
    "Strongly Disagree",
    "Disagree",
    "Neutral",
    "Agree",
    "Strongly Agree",
  ];

  useEffect(() => {
    const shuffled = shuffleArray(questions);
    setShuffledQuestions(shuffled);
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
    <div className="p-6">
      <div className="flex justify-between items-end">
        <h1 className="text-lg font-bold">Answer the Questions Below</h1>
        {group === "group-1" && timeLeft !== null && (
          <div
            className="radial-progress"
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
      </div>
      <form>
        <div className="space-y-8">
          {shuffledQuestions.map((question, index) => (
            <div key={question.id} className="mb-6">
              <p className="font-medium mb-4">{`${index + 1}. ${
                question.text
              }`}</p>
              <div className="flex space-x-9">
                {likertScale.map((option, optIndex) => (
                  <label
                    key={optIndex}
                    className="flex flex-col items-center space-y-2 text-center"
                  >
                    <span className="text-sm">{option}</span>
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={option}
                      checked={answers[question.id] === option}
                      onChange={() => handleAnswerChange(question.id, option)}
                      className="radio radio-primary"
                    />
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="btn btn-primary mt-6"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default QuestionsComponent;
