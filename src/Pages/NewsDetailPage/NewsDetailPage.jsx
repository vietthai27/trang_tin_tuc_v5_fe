import { Box, Chip, Container, Divider, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { getNewsDetailRequest } from "./reducer"
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function NewsDetailPage() {
    const dispatch = useDispatch()

    const { id } = useParams();

    useEffect(() => {
        dispatch(getNewsDetailRequest(id))
    }, [])

    const { newsDetail } = useSelector(state => state.newsDetail)

    return (
        <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
            {/* ✅ Title */}
            <Typography
                variant="h3"
                fontWeight="bold"
                sx={{ mb: 2, lineHeight: 1.3 }}
            >
                {newsDetail.title}
            </Typography>

            {/* ✅ Meta info */}
            <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
                <Chip label={`✍ ${newsDetail.writer}`} />
                <Typography variant="body2" color="text.secondary">
                    {new Date(newsDetail.createdAt).toLocaleString()}
                </Typography>
            </Box>

            {/* ✅ Description */}
            <Typography
                variant="h6"
                sx={{
                    fontStyle: "italic",
                    color: "text.secondary",
                    mb: 3,
                }}
            >
                {newsDetail.description}
            </Typography>

            <Divider sx={{ mb: 3 }} />

            {/* ✅ News HTML Content */}
            <Box
                sx={{
                    "& img": {
                        maxWidth: "100%",
                        borderRadius: 2,
                        marginTop: 2,
                        marginBottom: 2,
                    },
                    "& p": {
                        fontSize: "18px",
                        lineHeight: 1.8,
                        marginBottom: 2,
                    },
                    "& figure": {
                        textAlign: "center",
                        margin: "20px 0",
                    },
                    "& figcaption": {
                        fontSize: "14px",
                        color: "gray",
                        fontStyle: "italic",
                    },
                }}
                dangerouslySetInnerHTML={{ __html: newsDetail.content }}
            />
        </Container>
    )
}