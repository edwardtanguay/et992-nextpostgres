"use client";
import axios from "axios";
import { useEffect, useState } from "react";

// const baseUrl = "http://localhost:3055";
const baseUrl = "";

interface note {
	id: number;
	body: string;
	rank: number;
}

interface newNote {
	body: string;
	rank: string;
	app_pin: string;
}

const blankNewNote = {
	body: "",
	rank: "2.5",
	app_pin: "",
};

export default function Home() {
	const [notes, setNotes] = useState<note[]>([]);
	const [newNote, setNewNote] = useState<newNote>(
		structuredClone(blankNewNote)
	);

	const fetchAllNotes = async () => {
		const headers = {
			"Cache-Control": "no-cache",
			Pragma: "no-cache",
			Expires: "0",
		};
		const response = await axios.post(
			`${baseUrl}/api/get-notes`,
			{},
			{
				headers,
			}
		);
		const _notes = response.data;
		setNotes(_notes);
	};

	useEffect(() => {
		fetchAllNotes();
	}, []);

	const handleFieldChange = (fieldIdCode: string, value: string) => {
		switch (fieldIdCode) {
			case "body":
				newNote.body = value;
				break;
			case "rank":
				newNote.rank = value;
				break;
			case "app_pin":
				newNote.app_pin = value;
				break;
		}
		setNewNote(structuredClone(newNote));
	};

	const handleSave = () => {
		(async () => {
			const headers = {
				"Access-Control-Allow-Origin": "*",
				"Content-Type": "application/json",
			};
			try {
				const response = await axios.post(
					`${baseUrl}/api/add-note`,
					newNote,
					{
						headers,
					}
				);
				setNewNote(structuredClone(blankNewNote));
				fetchAllNotes();
			} catch (e: any) {
				alert("Sorry, your note could not be added.");
			}
		})();
	};

	return (
		<main className="p-6">
			<h1 className="text-2xl mb-4">Note Taker</h1>

			<form className="bg-slate-400 p-6 rounded-lg">
				<div className="mb-3">
					<label className="block mb-1" htmlFor="note">
						Note:
					</label>
					<textarea
						value={newNote.body}
						onChange={(e) =>
							handleFieldChange("body", e.target.value)
						}
						spellCheck={false}
						className="w-full"
						id="note"
					/>
				</div>

				<div className="mb-3">
					<label className="block mb-1" htmlFor="rank">
						Rank:
					</label>
					<input
						value={newNote.rank}
						onChange={(e) =>
							handleFieldChange("rank", e.target.value)
						}
						className="w-[3rem] text-right"
						type="text"
						id="rank"
					/>
					<div className="text-xs mt-1 text-slate-700">
						0 = not important, 5 very important, e.g 4.3
					</div>
				</div>

				<div className="mb-3">
					<label className="block mb-1" htmlFor="pin">
						PIN
					</label>
					<input
						value={newNote.app_pin}
						onChange={(e) =>
							handleFieldChange("app_pin", e.target.value)
						}
						className="w-[8rem]"
						type="password"
						id="pin"
					/>
					<div className="text-xs mt-1 text-slate-700">
						enter access pin
					</div>
				</div>

				<div className="mt-6 flex justify-end">
					<button
						onClick={handleSave}
						type="button"
						className="bg-slate-700 px-2 py-1 rounded text-slate-400"
					>
						Save
					</button>
				</div>
			</form>

			<section className="mt-6">
				<h2 className="text-1xl mb-4">
					There are {notes.length} notes:
				</h2>
				<ul>
					{notes.map((note) => {
						return (
							<li
								className="text-blue-950 flex gap-2 mb-3"
								key={note.id}
							>
								<span className="text-yellow-500 bg-slate-600 h-fit w-[1.6rem] p-1 rounded text-xs flex justify-center">
									{Number(note.rank).toFixed(1)}
								</span>
								{note.body}
							</li>
						);
					})}
				</ul>
			</section>
		</main>
	);
}