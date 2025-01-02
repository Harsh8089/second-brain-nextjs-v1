"use client";

import { useRef, useState } from "react";
import Input from "./input";
import Button from "./button";
import axios from "axios";
import { NEXTAPP_URL } from "@/config";
import { X } from "lucide-react";

type Content = "youtube" | "tweet" | "document" | "link";

export default function Modal({
    setModal
}: {
    setModal: any
}) {
    const titleRef = useRef<HTMLInputElement>(null); 
    const descriptionRef = useRef<HTMLTextAreaElement>(null);

    const [type, setType] = useState<Content>("youtube");
    
    const tagRef = useRef<HTMLInputElement>(null);
    const [tags, setTags] = useState<string[]>([]);

    const addBrain = async() => {
        try {
            const res = await axios.post(`${NEXTAPP_URL}/api/content`, {
                title: titleRef.current?.value,
                description: descriptionRef.current?.value,
                type: type.toUpperCase(),
            })
            console.log(res);
        } catch (error) {
            console.log(error);   
        }
    }

    const createTags = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.value.includes(',')) {
            if(tagRef.current) {
                const newTag = tagRef.current.value.replace(',', '')
                setTags(function (currTags) {
                    return [...currTags, newTag];
                })
                tagRef.current.value = '';
            }
        }
    }

    const removeTag = (index: number) => {
        setTags(function (currTags) {
            return currTags.filter((tag, idx) => idx !== index);
        })
    }

    return <div className="w-screen h-screen backdrop-blur-md fixed left-0 top-0 overflow-hidden flex justify-center items-center z-20">
        <div className="w-[55%] min-h-[400px] bg-slate-950 border-slate-800 border-[1px] rounded-lg py-6 px-4 overflow-hidden">
            <div className="flex justify-between items-center border-b-[1px] border-slate-700 pb-4">
                <h1 className="text-white font-semibold text-3xl">Add Your Second Brain</h1>
                <div className="bg-[#7f1d1d] p-1 rounded-md flex items-center justify-center">
                    <Button
                        startIcon={<X className="text-white w-6 h-6"/>}
                        onClick={() => setModal(false)}
                    />
                </div>
            </div>
            <div className="flex flex-col mt-8">
                <div className="w-full flex flex-col gap-2">
                    <p className="text-xl text-white font-semibold tracking-tight">Title</p>
                    <Input
                        type="text"
                        placeholder="Enter a title"
                        reference={titleRef}
                        style="bg-slate-900 px-4 py-2 placeholder:text-slate-400 placehoder:text-lg text-lg outline-none text-white rounded-md"
                    />
                </div>
                
                <div className="w-full flex flex-col gap-2 mt-4">
                    <p className="text-xl text-white font-semibold tracking-tight">Type</p>
                    <div className="grid grid-cols-4 gap-4 bg-slate-900 p-4 rounded-md">
                        {["youtube", "tweet", "document", "link"].map((radio, idx) => (
                            <label 
                                key={idx}
                                htmlFor={radio}
                                className={`flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer transition-all duration-200 ${
                                    type === radio 
                                        ? "bg-gradient-to-t from-blue-800 to-indigo-500 text-white" 
                                        : "hover:bg-slate-800"
                                }`}
                            >
                                <Input 
                                    type="radio" 
                                    id={radio} 
                                    value={radio}
                                    checked={type === radio}
                                    onChange={(event: any) => setType(event.target.value)}
                                    style="hidden"
                                />
                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                    type === radio 
                                        ? "border-white" 
                                        : "border-slate-400"
                                }`}>
                                    {type === radio && (
                                        <div className="w-2 h-2 bg-white rounded-full" />
                                    )}
                                </div>
                                <span className={`font-medium ${
                                    type === radio 
                                        ? "text-white" 
                                        : "text-slate-400"
                                }`}>
                                    {radio[0].toUpperCase() + radio.slice(1)}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col mt-4">
                    <p className="text-xl text-white font-semibold tracking-tight">Tags</p>
                    <div className="flex gap-2 my-2">
                        {
                            tags.map((tag, idx) => {
                                return <Button
                                    key={idx}
                                    text={tag}
                                    endIcon={<X className="w-3 h-3" />}
                                    style="flex gap-1 items-center justify-center text-slate-300 text-sm bg-slate-800 px-2 py-1 rounded-md"
                                    onClick={() => removeTag(idx)}
                                />   
                            })
                        }
                    </div>
                    <Input
                        type={"text"}
                        placeholder="Enter tags seperated by comma"
                        reference={tagRef}
                        style="bg-slate-900 px-4 py-2 placeholder:text-slate-400 placehoder:text-lg text-lg outline-none text-white rounded-md"
                        onChange={createTags}
                    />
                </div>

                <div className="w-full flex flex-col gap-2 mt-4">
                    <label htmlFor="description">
                        <p className="text-xl text-white font-semibold tracking-tight">Description</p>
                        <textarea 
                            id="description"
                            placeholder="Enter any description"
                            rows={4}
                            className="bg-slate-900 w-full px-4 py-2 placeholder:text-slate-400 placehoder:text-lg text-lg outline-none text-white rounded-md"
                            ref={descriptionRef}
                        />
                    </label>
                </div>

                <Button
                    text="Create Brain"
                    style="mt-8 w-48 flex justify-center items-center bg-gradient-to-t from-blue-800 to-indigo-500 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 text-md"
                    onClick={addBrain}
                />
            </div>
        </div>
    </div>
}