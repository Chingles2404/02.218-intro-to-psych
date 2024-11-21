import { sql } from '@vercel/postgres'
import { addStudent, addPassageAnswers } from "@/lib/populate"

export default async function Result({participantId, group, results}: {participantId: string, group: string, results: string}) {
    const groupNo = Number(group.split("-")[1]);
    const studentId = Number(participantId);
    const JSONResults = JSON.parse(results)

    console.log(`To add to Students table: ${studentId}, ${groupNo}`);
    addStudent(studentId, groupNo)

    for (var i = 0; i < JSONResults.length; i = i + 1) {
        console.log(
        `To add to Answers table: ${studentId}, ${JSONResults.passage}, ${i + 1}, ${
            JSONResults.answers["1"]
        }, ${JSONResults.answers["2"]}, ${JSONResults.answers["3"]}, ${JSONResults.answers["4"]}, ${
            JSONResults.answers["5"]
        }`
        );
        addPassageAnswers(
        studentId,
        JSONResults.passage,
        i + 1,
        JSONResults.answers["1"],
        JSONResults.answers["2"],
        JSONResults.answers["3"],
        JSONResults.answers["4"],
        JSONResults.answers["5"]
        )
    }

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
}