"use client";

import { useState, useEffect } from "react";

const PassageComponent = ({ title, source, passage, onComplete, group }) => {
  const timeLimit = group === "group-1" ? 45 : null;
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  useEffect(() => {
    if (group === "group-1" && timeLeft === 0) {
      onComplete();
    }

    if (group === "group-1") {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, group]);

  return (
    <div className="p-4 flex items-center justify-center">
      {group === "group-1" && (
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
      <div className="max-w-[600px]">
        <h1 className="text-lg font-bold">Read the Passage</h1>
        <div className="p-5 my-5 rounded-md bg-gray-300 w-full">
          <p><b><u>{title}</u></b></p>
          <p><i>Source: {source}<br /><br /></i></p>
          <p>
            {passage.split("\n").map((line, index) => (
              <p key={index}>{line}<br /></p>
            ))}
          </p>
        </div>
        {group === "group-2" && (
          <div className="text-center">
            <button
              type="button"
              className="btn btn-primary mt-4"
              onClick={onComplete}
            >
              Proceed
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PassageComponent;
