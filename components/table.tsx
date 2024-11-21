import { sql } from '@vercel/postgres'
import { seed } from '@/lib/seed'

export default async function Table() {
  let data

  try {
    data = await sql`SELECT * FROM Students;`
    console.log(data)
  } catch (e: any) {
    if (e.message.includes('relation "students" does not exist')) {
      console.log(
        'Table "Students" does not exist, creating it now...'
      )
      // Table is not created yet
      await seed()
      data = await sql`SELECT * FROM Students;`
      console.log(data)
    } else {
      throw e
    }
  }

  try {
    data = await sql`SELECT * FROM Answers;`
    console.log(data)
  } catch (e: any) {
    if (e.message.includes('relation "answers" does not exist')) {
      console.log(
        'Table "Answers" does not exist, creating it now...'
      )
      // Table is not created yet
      await seed()
      data = await sql`SELECT * FROM Answers;`
      console.log(data)
    } else {
      throw e
    }
  }

  return (
    <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
      <p>
        Tables have been created.
      </p>
    </div>
  )
}
