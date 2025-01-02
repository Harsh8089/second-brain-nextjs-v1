"use client";

import { useRef } from "react";
import Input from "./input";
import Button from "./button";
import axios from "axios";
import { NEXTAPP_URL } from "@/config";
import { CircleX } from "lucide-react";

export default function Modal({
    setModal
}: {
    setModal: any
}) {
    const titleRef = useRef<HTMLInputElement>(null);
    const typeRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);

    const addBrain = async() => {
        try {
            // if(!(titleRef.current && typeRef.current && descriptionRef.current)) return;

            const res = await axios.post(`${NEXTAPP_URL}/api/content`, {
                title: titleRef.current?.value,
                description: descriptionRef.current?.value,
                type: typeRef.current?.value 
            })
            console.log(res);
        } catch (error) {
            console.log(error);   
        }
    }

    return <div className="w-screen h-screen overflow-hidden flex justify-center items-center">
        <div className="w-[50%] min-h-[400px] border-2">
            <div className="flex justify-between items-center">
                <h1>Add Your Second Brain</h1>
                <Button
                    startIcon={<CircleX />}
                    onClick={() => setModal(false)}
                />
            </div>
            <div className="flex flex-col">
                <Input
                    type={"text"}
                    placeholder="title"
                    reference={titleRef}
                />
                <Input
                    type={"text"}
                    placeholder={'youtube | tweet | document | link'}
                    reference={typeRef}
                />
                 <Input
                    type={"text"}
                    placeholder="any description"
                    reference={descriptionRef}
                />
                <Button
                    text="Create Brain"
                    styles=""
                    onClick={addBrain}
                />
            </div>
        </div>
    </div>
}