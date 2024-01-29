import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
	try {
		const { rows } = await sql`SELECT * FROM Notes ORDER BY rank DESC`;
		return NextResponse.json(rows)
	}
	catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}