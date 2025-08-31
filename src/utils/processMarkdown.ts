import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";

export async function processMarkdown(markdown: string) {
  const processed = await remark().use(remarkGfm).use(remarkHtml).process(markdown);
  return processed.toString();
}
