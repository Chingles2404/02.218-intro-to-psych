"use client";

interface ResultProps {
  participantId: string;
  group: string;
  results: Array<{
    passage: string;
    answers: { [key: string]: number };
  }>;
}

const Result: React.FC<ResultProps> = ({ participantId, group, results }) => {
  return (
    <div>
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
    </div>
  );
};

export default Result;