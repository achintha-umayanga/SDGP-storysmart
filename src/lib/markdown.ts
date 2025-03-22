import { marked } from "marked";

export const parseMarkdown = (text: string) => marked.parse(text);