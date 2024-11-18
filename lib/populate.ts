import { sql } from '@vercel/postgres'

export async function populate(studentId: number, passageId: number, order: number, question1: number, question2: number, question3: number, question4: number, question5: number) {
  const entry = await sql`
    INSERT INTO answers
    VALUES (${studentId}, ${passageId}, ${order}, ${question1}, ${question2}, ${question3}, ${question4}, ${question5});
  `

  console.log(`Added entry for student ${studentId} on passage ${passageId}`)

  return {
    entry,
  }
}
