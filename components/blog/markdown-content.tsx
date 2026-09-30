import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

import { Prose } from "@/components/ui/prose";

// Sanitize runs before highlighting so author HTML is stripped, while the
// classes highlight adds afterwards survive.
const remarkPlugins = [remarkGfm];
const rehypePlugins = [
  rehypeSanitize,
  [rehypeHighlight, { detect: true, ignoreMissing: true }] as never,
];

export function MarkdownContent({ content }: { content: string }) {
  return (
    <Prose>
      <Markdown remarkPlugins={remarkPlugins} rehypePlugins={rehypePlugins}>
        {content}
      </Markdown>
    </Prose>
  );
}
