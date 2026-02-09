import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    Stack,
    Button
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import JoditEditor from "jodit-react";
import { getCategoryDataRequest } from "../../Components/Header/reducer";
import { getSubCategoryListRequest } from "../CategoryNewsPage/reducer";
import ImageUploadWithPreview from "../../Components/ImageUploadWithPreview/ImageWithUploadPreview";
import { addNewsRequest, editNewsRequest, getNewsByIdRequest, resetAdd, resetEdit } from "./reducer";
import { useNavigate, useParams } from "react-router-dom";
import { getImagesById } from "../../Components/ImageUploadWithPreview/reducer";

export default function NewsManageEdit() {
    const dispatch = useDispatch();
    const editorRef = useRef(null);
    const navigate = useNavigate();

    const { id } = useParams();

    const { images } = useSelector(state => state.uploadImage);

    // form state
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [subCategoryId, setSubCategoryId] = useState("");
    const [content, setContent] = useState("");

    // redux state
    const categoryList = useSelector(state => state.header.categoryList);
    const { subCategoryList } = useSelector(state => state.categoryNewsPage);

    const { editSuccess, newsById } = useSelector(
        state => state.newsManagePage
    );

    // ✅ Load news + categories
    useEffect(() => {
        dispatch(getNewsByIdRequest(id));
        dispatch(getCategoryDataRequest());
    }, [dispatch, id]);

    // Category change
    const handleChangeCategory = (id) => {
        setCategoryId(id);
        setSubCategoryId("");
        dispatch(getSubCategoryListRequest({ id }));
    };

    // Submit update
    const handleSubmit = () => {
        const payload = {
            id,
            title,
            description,
            subCategoryId,
            content,
            imagesUrl: images.map(img => img.url)
        };

        dispatch(editNewsRequest(payload));
    };

    // Redirect after success
    useEffect(() => {
        if (editSuccess) {
            navigate("/news-manage-page");
            dispatch(resetEdit());
        }
    }, [editSuccess, navigate, dispatch]);

    useEffect(() => {
        if (newsById?.news) {
            const news = newsById.news;

            setTitle(news.title || "");
            setDescription(news.description || "");
            setContent(news.content || "");

            // Set category + subcategory
            setCategoryId(newsById.categoryId || "");
            setSubCategoryId(newsById.subCategoryId || "");

            // Load subcategories based on category
            if (newsById.categoryId) {
                dispatch(
                    getSubCategoryListRequest({ id: newsById.categoryId })
                );
            }

            if (newsById.listImage) {
                dispatch(
                    getImagesById(
                        newsById.listImage
                    )
                );
            }

        }
    }, [newsById, dispatch]);

    return (
        <Box maxWidth={900} mx="auto" p={3}>
            <Typography
                variant="h5"
                margin={3}
                textAlign="center"
                fontWeight={600}
            >
                Sửa bài báo
            </Typography>

            <Stack spacing={2}>
                {/* Title */}
                <TextField
                    fullWidth
                    size="small"
                    label="Tên bài báo"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                {/* Description */}
                <TextField
                    fullWidth
                    size="small"
                    label="Tiêu đề"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                {/* CATEGORY */}
                <FormControl fullWidth size="small">
                    <InputLabel>Danh mục</InputLabel>
                    <Select
                        value={categoryId}
                        label="Danh mục"
                        onChange={(e) =>
                            handleChangeCategory(e.target.value)
                        }
                    >
                        {categoryList.map((e) => (
                            <MenuItem key={e.id} value={e.id}>
                                {e.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* SUB CATEGORY */}
                <FormControl
                    fullWidth
                    size="small"
                    disabled={!subCategoryList.length}
                >
                    <InputLabel>Danh mục con</InputLabel>
                    <Select
                        value={subCategoryId}
                        label="Danh mục con"
                        onChange={(e) =>
                            setSubCategoryId(e.target.value)
                        }
                    >
                        {subCategoryList.map((e) => (
                            <MenuItem key={e.id} value={e.id}>
                                {e.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Images */}
                <ImageUploadWithPreview />

                {/* Content */}
                <Box>
                    <Typography mb={1} fontWeight={500}>
                        Nội dung bài viết
                    </Typography>

                    <Box
                        sx={{
                            "& .jodit-container": {
                                "& img": {
                                    maxWidth: "100% !important",
                                    width: "100% !important",
                                    height: "auto !important",
                                    display: "block !important",
                                    objectFit: "contain !important",
                                },
                                "& figure": {
                                    width: "100% !important",
                                    "& img": {
                                        maxWidth: "100% !important",
                                        width: "100% !important",
                                        height: "auto !important",
                                        display: "block !important",
                                    },
                                },
                                wordWrap: "break-word",
                                overflowWrap: "break-word",
                            },
                        }}
                    >
                        <JoditEditor
                            ref={editorRef}
                            value={content}
                            onBlur={(newContent) => setContent(newContent)}
                            config={{
                                readonly: false,
                                height: "auto",
                                minHeight: 200,
                                autofocus: false,
                                autoHeight: true,
                                placeholder: "Nhập nội dung bài báo...",
                                toolbarAdaptive: false,
                            }}
                        />
                    </Box>
                </Box>

                {/* Submit */}
                <Button
                    variant="contained"
                    size="large"
                    sx={{ mt: 2 }}
                    onClick={handleSubmit}
                >
                    Lưu bài báo
                </Button>
            </Stack>
        </Box>
    );
}
