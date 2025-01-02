"use client";

import { useState } from "react";
import Greeting from "./greeting";
import Modal from "./modal";

export default function Content({
    contents,
}: {
    contents: any,
}) {
	const [modal, setModal] = useState<boolean>(false);
	console.log(contents);
    return <main>
        <div className={`ml-72 bg-black px-10 py-10 h-screen`}>
			<Greeting
				setModal={setModal}
			/>
			<div className="text-white">{JSON.stringify(contents)}</div>
		</div>
		{
			modal && <Modal setModal={setModal} />
		}
    </main>
}