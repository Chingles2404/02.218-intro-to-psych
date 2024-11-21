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
        <div className="mt-6 text-left">
            <h2 className="text-lg font-bold">Your Responses:</h2>
            <pre className="bg-gray-100 p-4 rounded-md mt-4">
                {JSON.stringify(results, null, 2)}
            </pre>
        </div>
    </div>
  );
};

export default Result;