import DOMPurify from "dompurify";
import parse from "html-react-parser";

export default function HtmlPreview({ content }) {
    const clean = DOMPurify.sanitize(content);
    return <div>{parse(clean)}</div>;
}