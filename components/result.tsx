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
      <p>Participant ID: {participantId}</p>
      <p>Group: {group}</p>
      <pre>{JSON.stringify(results, null, 2)}</pre>
    </div>
  );
};

export default Result;