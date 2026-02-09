import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { Box } from "@mui/material";

export default function HtmlPreview({ content }) {
    const clean = DOMPurify.sanitize(content);
    return (
        <Box
            sx={{
                "& img": {
                    maxWidth: "100%",
                    width: "100%",
                    height: "auto",
                    display: "block",
                    borderRadius: 2,
                    marginTop: 2,
                    marginBottom: 2,
                    objectFit: "contain",
                },
                "& p": {
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                },
                "& figure": {
                    textAlign: "center",
                    margin: "20px 0",
                    width: "100%",
                    "& img": {
                        width: "100%",
                        maxWidth: "100%",
                        height: "auto",
                        display: "block",
                    },
                },
                wordWrap: "break-word",
                overflowWrap: "break-word",
                overflow: "hidden",
            }}
        >
            {parse(clean)}
        </Box>
    );
}