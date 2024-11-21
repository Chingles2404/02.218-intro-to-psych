"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import PassageComponent from "../../components/PassageComponent";
import QuestionsComponent from "../../components/QuestionComponent";
import InstructionComponent from "../../components/InstructionComponent";
import { passages as originalPassages, questions } from "../data";
import { shuffleArray } from "../utils";
import { addStudent, addPassageAnswers } from "../../lib/populate"

const Experiment = () => {
  const searchParams = useSearchParams();
  const participantId = searchParams.get("participantId");
  const group = searchParams.get("group");

  const [shuffledPassages, setShuffledPassages] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const randomizedPassages = shuffleArray(originalPassages);
    setShuffledPassages(randomizedPassages);
  }, []);

  useEffect(() => {
    if (currentStep >= totalSteps) {
      const groupNo = Number(group?.split("-")[1]);
      const studentId = Number(participantId);
  
      console.log(`To add to Students table: ${studentId}, ${groupNo}`);
      addStudent(studentId, groupNo).catch(console.error);
  
      results.forEach((result, index) => {
        console.log(
          `To add to Answers table: ${studentId}, ${result.passage}, ${index + 1}, ${
            result.answers["1"]
          }, ${result.answers["2"]}, ${result.answers["3"]}, ${result.answers["4"]}, ${
            result.answers["5"]
          }`
        );
        addPassageAnswers(
          studentId,
          result.passage,
          index + 1,
          result.answers["1"],
          result.answers["2"],
          result.answers["3"],
          result.answers["4"],
          result.answers["5"]
        ).catch(console.error);
      });
    }
  }, [currentStep, totalSteps, group, participantId, results]);  

  const totalSteps = shuffledPassages.length * 4;
  const stepType = currentStep % 4;
  const currentPassageIndex = Math.floor(currentStep / 4);

  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleQuestionsComplete = (answers) => {
    const updatedResults = [
      ...results,
      {
        passage: shuffledPassages[currentPassageIndex].id,
        answers,
      },
    ];
    setResults(updatedResults);
    handleNextStep();
  };

  if (currentStep >= totalSteps) {
    return (
      <div className="p-6 text-center h-screen justify-center align-center">
        <h1 className="text-xl font-bold">Survey Complete!</h1>
        <p className="text-gray-700 mt-4">
          Thank you for participating in the survey.
        </p>
        <p className="mt-2">
          Participant ID: <strong>{participantId}</strong>
        </p>
        <p className="mt-2">
          Group: <strong>{group}</strong>
        </p>
        <div className="mt-6 text-left">
          <h2 className="text-lg font-bold">Your Responses:</h2>
          <pre className="bg-gray-100 p-4 rounded-md mt-4">
            {JSON.stringify(results, null, 2)}
          </pre>
        </div>
      </div>
    );
  }

  if (stepType === 0) {
    // Instruction before Passage
    return (
      <InstructionComponent
        text={`Please read the following passage carefully. ${
          group === "group-1" ? "You will have 2 minutes to read." : ""
        }`}
        buttonLabel="Start Passage"
        onStart={handleNextStep}
      />
    );
  } else if (stepType === 1) {
    // Passage
    return (
      <PassageComponent
        passage={shuffledPassages[currentPassageIndex].text}
        group={group}
        onComplete={handleNextStep}
      />
    );
  } else if (stepType === 2) {
    // Instruction before Questions
    return (
      <InstructionComponent
        text={`Please answer the following questions based on the passage you just read. ${
          group === "group-1"
            ? "You will have 2 minutes to answer the questions."
            : ""
        }`}
        buttonLabel="Start Questions"
        onStart={handleNextStep}
      />
    );
  } else if (stepType === 3) {
    // Questions
    return (
      <QuestionsComponent
        questions={questions}
        onComplete={handleQuestionsComplete}
        group={group}
      />
    );
  }
};

export default Experiment;
