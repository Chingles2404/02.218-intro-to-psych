import { sql } from '@vercel/postgres'
import { seed } from '@/lib/seed'

export default async function Table() {
  let data

  try {
    data = await sql`SELECT * FROM Students`
  } catch (e: any) {
    if (e.message.includes('relation "Students" does not exist')) {
      console.log(
        'Table "Students" does not exist, creating it now...'
      )
      // Table is not created yet
      await seed()
      data = await sql`SELECT * FROM Students`
    } else {
      throw e
    }
  }

  try {
    data = await sql`SELECT * FROM Answers`
  } catch (e: any) {
    if (e.message.includes('relation "Answers" does not exist')) {
      console.log(
        'Table "Answers" does not exist, creating it now...'
      )
      // Table is not created yet
      await seed()
      data = await sql`SELECT * FROM Answers`
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
