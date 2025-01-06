export type ContentType = "YOUTUBE" | "TWEET" | "DOCUMENT" | "LINK";

export type Tag = {
    id: number,
    tag: string,
    contentId: string
}

export type ContentProps = {
    id: number,
    title: string,
    link: string,
    type: ContentType,
    description: string | null,
    tags: Tag[]
}