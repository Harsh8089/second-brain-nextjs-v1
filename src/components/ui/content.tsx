"use client";

import { useState } from "react";
import Greeting from "./greeting";
import Modal from "./modal";
import Sidebar from "./sidebar";

export default function Content({
    contents,
    user
}: {
    contents: any,
    user: any
}) {
	const [modal, setModal] = useState<boolean>(false);

    return <main>
        <div className="ml-[100px]">
			<Greeting
				setModal={setModal}
			/>
			{
				modal ? (
					<Modal 
						setModal={setModal}
					/>
				) : (
					<div>
						
						<p>{JSON.stringify(contents)}</p>
					</div>
				)
			}
		</div>
    </main>
}