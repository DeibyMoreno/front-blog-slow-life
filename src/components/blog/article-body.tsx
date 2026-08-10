import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ArticleBodyProps {
  content: string;
}

export function ArticleBody({ content }: ArticleBodyProps) {
  return (
    <div className="article-body prose prose-lg max-w-none prose-headings:font-display prose-headings:tracking-tight prose-headings:text-ink prose-p:text-stone prose-p:leading-relaxed prose-strong:font-semibold prose-strong:text-ink prose-a:text-forest prose-a:underline-offset-4 prose-blockquote:border-forest prose-blockquote:text-stone prose-blockquote:font-normal prose-blockquote:italic prose-li:text-stone">
      <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
    </div>
  );
}
