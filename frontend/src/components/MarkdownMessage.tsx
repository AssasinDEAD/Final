import { useEffect, useState } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";

type Props = {
  content: string;
};

const MarkdownMessage = ({ content }: Props) => {
  const [html, setHtml] = useState("");

  useEffect(() => {
    const renderMarkdown = async () => {
      const rawHtml = await marked.parse(content, { async: true });
      setHtml(DOMPurify.sanitize(rawHtml));
    };
    renderMarkdown();
  }, [content]);

  return (
    <div
      className="prose prose-sm max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default MarkdownMessage;
