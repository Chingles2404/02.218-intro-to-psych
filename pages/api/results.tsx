import { NextApiRequest, NextApiResponse } from "next";
import { addStudent, addPassageAnswers } from "../../lib/populate";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { participantId, group, results } = req.body;

  if (!participantId || !group || !results) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const groupNo = Number(group.split("-")[1]);
    const studentId = Number(participantId);
    const parsedResults: Array<{
      passage: string;
      answers: { [key: string]: number };
    }> = JSON.parse(results);

    try {
      await addStudent(studentId, groupNo);
    } catch (error) {
      console.log("Error saving student:", error);
    }

    console.log(parsedResults.length)

    for (let i = 0; i < parsedResults.length; i++) {
      console.log("Attempting to add answer...")
      const { passage, answers } = parsedResults[i];
      await addPassageAnswers(
        studentId,
        Number(passage),
        i + 1,
        answers["1"],
        answers["2"],
        answers["3"],
        answers["4"],
        answers["5"]
      );
    }

    res.status(200).json({ message: "Data saved successfully!" });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ error: "Failed to save data" });
  }
}