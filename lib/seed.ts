import { sql } from '@vercel/postgres'

export async function seed() {
  const createTable = await sql`
    CREATE TABLE IF NOT EXISTS Students (
      studentId INT PRIMARY KEY,
      groupId INT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Answers (
      studentId INT NOT NULL REFERENCES Students(studentId),
      passageId INT NOT NULL,
      orderNo INT NOT NULL,
      question1 TEXT NOT NULL,
      question2 TEXT NOT NULL,
      question3 TEXT NOT NULL,
      question4 TEXT NOT NULL,
      question5 TEXT NOT NULL,
      PRIMARY KEY (studentId, passageId)
    );
    `

  console.log(`Created "answers" table`)

  return {
    createTable,
  }
}
