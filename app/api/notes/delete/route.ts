import db from '@/lib/db';

export async function POST(req: Request) {
  const { id } = await req.json();
  try {
    const result = await db.notes.delete({
      where: {
        id,
      },
    });
    console.log(result)
  } catch (error) {
    console.log(error)
    
  }

  return Response.json({ message: 'ok', status: 200 });
}
