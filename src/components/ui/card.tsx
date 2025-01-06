import React from 'react';
import { 
ExternalLink, 
Youtube, 
Twitter 
} from 'lucide-react';
import { Tag, type ContentProps } from '@/types/Content';

export default function Card({
    content
}: {
    content: ContentProps
}) {
    return (
        <div className="w-80 h-[24rem] bg-slate-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="h-48 rounded-t-lg">
                {content.type === "YOUTUBE" && (
                    <div className="w-full h-full rounded-t-lg">
                        <iframe 
                            className="w-full h-full rounded-t-lg"
                            src={content.link.replace('watch?v=', 'embed/')}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        />
                    </div>
                )}
                {content.type === "TWEET" && (
                    <div className="w-full h-full flex items-center justify-center bg-blue-500">
                        <Twitter className="w-12 h-12 text-white" />
                    </div>
                )}
                {content.type === "DOCUMENT" && (
                    <div className="w-full h-full flex items-center justify-center bg-emerald-600">
                        <img
                            src="/api/placeholder/320/192"
                            alt="Document preview"
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
                {content.type === "LINK" && (
                    <div className="w-full h-full flex items-center justify-center bg-purple-600">
                        <ExternalLink className="w-12 h-12 text-white" />
                    </div>
                )}
            </div>

            <div className="p-4 flex flex-col h-[12rem] bg-slate-800">
                <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white line-clamp-2">
                        {content.title}
                    </h3>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                        {content.type.toLowerCase()}
                    </span>
                </div>

                {content.description && (
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
                        {content.description}
                    </p>
                )}

                <div className="mt-auto">
                    <div className="flex flex-wrap gap-2">
                        {content.tags?.map((tag: Tag) => (
                            <span
                                key={tag.id}
                                className="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200"
                            >
                                #{tag.tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}