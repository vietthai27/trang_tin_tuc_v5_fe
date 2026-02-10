import {
    Box,
    Button,
    Chip,
    Container,
    Divider,
    IconButton,
    TextField,
    Typography
} from "@mui/material";
import {
    addCommentRequest,
    deleteCommentRequest,
    editCommentRequest,
    getNewsDetailRequest,
    likeNewsRequest,
    unlikeNewsRequest
} from "./reducer";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Avatar } from "rsuite";

export default function NewsDetailPage() {
    const dispatch = useDispatch();
    const { id } = useParams();

    const { newsDetail, likeCount, isLiked, comments } = useSelector(state => state.newsDetail);
    const isLoggedIn = useSelector(state => state.app.loginState);
    const username = useSelector(state => state.app.username);

    const [editingId, setEditingId] = useState(null);
    const [editContent, setEditContent] = useState("");
    const [comment, setComment] = useState("");

    useEffect(() => {
        if (username || !isLoggedIn) {
            dispatch(getNewsDetailRequest({ id, username }));
        }
    }, [dispatch, id, username, isLoggedIn]);

    const handleLike = () => {
        if (isLiked) {
            dispatch(unlikeNewsRequest({ id, username }))
        } else {
            dispatch(likeNewsRequest({ id, username }))
        }
    };

    const handleAddComment = () => {
        dispatch(addCommentRequest({ newsId: id, username: username, content: comment }))
        setComment("");
    };

    const handleDeleteComment = (id, newsId) => {
        dispatch(deleteCommentRequest({ id, newsId }));
    };

    const handleEditComment = (commentId, content) => {
        if (!content.trim()) return;
        dispatch(editCommentRequest({ commentId: commentId, newsId: id, username: username, content: content }));
    };

    if (!newsDetail) return null;

    return (
        <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>

            <Typography variant="h3" fontWeight="bold" sx={{ mb: 2 }}>
                {newsDetail.title}
            </Typography>

            <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
                <Chip label={`✍ ${newsDetail.writer}`} />
                <Typography variant="body2" color="text.secondary">
                    {new Date(newsDetail.createdAt).toLocaleString()}
                </Typography>
            </Box>

            <Typography
                variant="h6"
                sx={{ fontStyle: "italic", color: "text.secondary", mb: 3 }}
            >
                {newsDetail.description}
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Box
                sx={{
                    "& img": {
                        maxWidth: "100%",
                        width: "100%",
                        borderRadius: 2,
                        my: 2,
                        height: 'auto'
                    },
                    "& p": {
                        fontSize: "18px",
                        lineHeight: 1.8,
                        mb: 2,
                    },
                }}
                dangerouslySetInnerHTML={{ __html: newsDetail.content }}
            />

            <Divider sx={{ my: 4 }} />

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton
                    color="error"
                    onClick={handleLike}
                    disabled={!isLoggedIn}
                >
                    {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
                <Typography>{likeCount}</Typography>

                {!isLoggedIn && (
                    <Typography variant="caption" color="text.secondary">
                        (Đăng nhập để like)
                    </Typography>
                )}
            </Box>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                Bình luận
            </Typography>

            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                <TextField
                    fullWidth
                    placeholder={
                        isLoggedIn
                            ? "Viết bình luận..."
                            : "Đăng nhập để bình luận"
                    }
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    disabled={!isLoggedIn}
                />
                <Button
                    variant="contained"
                    onClick={handleAddComment}
                    disabled={!isLoggedIn || !comment.trim()}
                >
                    Gửi
                </Button>
            </Box>

            {comments?.length === 0 && (
                <Typography color="text.secondary" sx={{ mt: 2 }}>
                    Chưa có bình luận nào
                </Typography>
            )}

            {comments?.map((c) => {
                const isOwner = c.username === username;
                const isEditing = editingId === c.id;

                return (
                    <Box key={c.id} sx={{ display: "flex", gap: 2, mb: 3 }}>

                        {/* Comment content */}
                        <Box sx={{ flex: 1 }}>
                            {/* Header */}
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                                    <Typography fontWeight="bold">
                                        {c.username}
                                    </Typography>

                                    {isOwner && (
                                        <Chip
                                            label="Bạn"
                                            size="small"
                                            color="primary"
                                            sx={{ height: 18, fontSize: 11 }}
                                        />
                                    )}

                                    <Typography variant="caption" color="text.secondary">
                                        {new Date(c.createdAt).toLocaleString()}
                                    </Typography>
                                </Box>

                                {/* Actions (only owner) */}
                                {isOwner && (
                                    <Box sx={{ display: "flex", gap: 1 }}>
                                        <Typography
                                            variant="caption"
                                            color="primary"
                                            sx={{ cursor: "pointer" }}
                                            onClick={() => {
                                                setEditingId(c.id);
                                                setEditContent(c.content);
                                            }}
                                        >
                                            Sửa
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            color="error"
                                            sx={{ cursor: "pointer" }}
                                            onClick={() => handleDeleteComment(c.id, id)}
                                        >
                                            Xóa
                                        </Typography>
                                    </Box>
                                )}
                            </Box>

                            {/* Content */}
                            <Box
                                sx={{
                                    mt: 0.5,
                                    backgroundColor: "#f5f5f5",
                                    borderRadius: 2,
                                    px: 2,
                                    py: 1.2,
                                }}
                            >
                                {isEditing ? (
                                    <>
                                        <TextField
                                            fullWidth
                                            multiline
                                            minRows={2}
                                            value={editContent}
                                            onChange={(e) =>
                                                setEditContent(e.target.value)
                                            }
                                        />
                                        <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                                            <Button
                                                size="small"
                                                variant="contained"
                                                onClick={() => {
                                                    handleEditComment(c.id, editContent);
                                                    setEditingId(null);
                                                }}
                                            >
                                                Lưu
                                            </Button>
                                            <Button
                                                size="small"
                                                variant="text"
                                                onClick={() => setEditingId(null)}
                                            >
                                                Hủy
                                            </Button>
                                        </Box>
                                    </>
                                ) : (
                                    <Typography sx={{ whiteSpace: "pre-wrap" }}>
                                        {c.content}
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                    </Box>
                );
            })}

        </Container>
    );
}
