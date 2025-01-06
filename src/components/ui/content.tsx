"use client";

import { useState } from "react";
import Card from "./card";
import Greeting from "./greeting";
import Modal from "./modal";
import { type ContentProps } from "@/types/Content";

export default function Content({
    contents
}: {
    contents: ContentProps[]
}) {
    const [modal, setModal] = useState<boolean>(false);
 
    return <div className="text-white p-10">
        <Greeting
            setModal={setModal}
        />
        {
			modal && <Modal setModal={setModal} />
		}
        {
            contents.length ? contents.map((content: ContentProps) => {
                return <Card
                    key={content.id}
                    content={content}
                />
            }) : (
                <div className="text-white">No contents</div>
            )
        }
    </div>    
}