"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import PassageComponent from "../../components/PassageComponent";
import QuestionsComponent from "../../components/QuestionComponent";
import InstructionComponent from "../../components/InstructionComponent";
import {
  passages as originalPassages,
  breatherPassages,
  samplePassage,
  questions,
  comprehensionQuestions,
} from "../data";
import { shuffleArray } from "../utils";
import Result from "../../components/result";

const Experiment = () => {
  const searchParams = useSearchParams();
  const participantId = searchParams.get("participantId");
  const group = searchParams.get("group");

  const [shuffledPassages, setShuffledPassages] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const randomizedPassages = shuffleArray(originalPassages);
    const randomizedWithBreather = randomizedPassages
      .slice(0, 3)
      .concat(
        breatherPassages.slice(0, 1),
        randomizedPassages.slice(3, 5),
        breatherPassages.slice(1, 2),
        randomizedPassages.slice(5, 7),
        breatherPassages.slice(2),
        randomizedPassages.slice(7)
      );
    const finalPassages = [samplePassage, ...randomizedWithBreather];
    setShuffledPassages(finalPassages);
  }, []);

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

  const handleSurveyComplete = async () => {
    try {
      const payload = {
        participantId,
        group,
        results: JSON.stringify(results),
      };

      const response = await fetch("/api/results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to save results");
      }
    } catch (error) {
      console.error("Error submitting survey:", error);
    }
  };

  if (currentStep >= totalSteps) {
    handleSurveyComplete();
    return (
      <div className="p-6 text-center h-screen justify-center align-center">
        <Result participantId={participantId} group={group} results={results} />
      </div>
    );
  }

  if (stepType === 0) {
    // Instruction before Passage
    return (
      <InstructionComponent
        text={`Please read the following passage carefully. ${
          group === "group-1" ? "You will have 45 seconds to read." : ""
        }`}
        buttonLabel="Start Passage"
        onStart={handleNextStep}
      />
    );
  } else if (stepType === 1) {
    // Passage
    return (
      <PassageComponent
        title={shuffledPassages[currentPassageIndex].title}
        source={shuffledPassages[currentPassageIndex].source}
        passage={shuffledPassages[currentPassageIndex].text}
        currentPassageIndex={currentPassageIndex}
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
            ? "You will have 45 seconds to answer the questions."
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
        questions={questions.concat(
          comprehensionQuestions[shuffledPassages[currentPassageIndex].id]
        )}
        onComplete={handleQuestionsComplete}
        group={group}
      />
    );
  }
};

export default Experiment;
