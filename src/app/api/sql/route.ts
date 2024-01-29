import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
	try {
		if (process.env.APP_ENV !== 'development') throw Error('not authorized');

		// CREATE NOTES TABLE
		await sql`CREATE TABLE IF NOT EXISTS Notes ( id SERIAL PRIMARY KEY, body varchar(255), rank decimal);`;

		// DELETE NOTES
		// await sql`DELETE FROM NOTES WHERE 1=1;`;

		return NextResponse.json("ok", { status: 200 });
	} catch (error: any) {
		return NextResponse.json(error.message, { status: 500 });
	}
}