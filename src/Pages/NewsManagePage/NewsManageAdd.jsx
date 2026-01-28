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
import { addNewsRequest, resetAdd } from "./reducer";
import { useNavigate } from "react-router-dom";

export default function NewsManageAdd() {
    const dispatch = useDispatch();
    const editorRef = useRef(null);

    const { images } = useSelector(state => state.uploadImage)

    // form state
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [subCategoryId, setSubCategoryId] = useState("");
    const [content, setContent] = useState("");

    // redux state
    const categoryList = useSelector(state => state.header.categoryList);
    const { subCategoryList } = useSelector(state => state.categoryNewsPage);


    const {
        addSuccess
    } = useSelector(state => state.newsManagePage);

    useEffect(() => {
        dispatch(getCategoryDataRequest());
    }, [dispatch]);

    const handleChangeCategory = (id) => {
        setCategoryId(id);
        setSubCategoryId("");
        dispatch(getSubCategoryListRequest({ id }));
    };

    const handleSubmit = () => {
        const payload = {
            title,
            description,
            subCategoryId,
            content,
            imagesUrl: images.map(img => img.url)
        };

        dispatch(addNewsRequest(payload))
    };

    useEffect(() => {
        if (addSuccess)
            navigate('/news-manage-page')
        dispatch(resetAdd())
    }, [addSuccess])

    const navigate = useNavigate()


    return (
        <Box maxWidth={900} mx="auto" p={3}>
            <Typography variant="h5" margin={3} textAlign="center" fontWeight={600}>
                Thêm bài báo
            </Typography>

            <Stack spacing={2}>
                <TextField
                    fullWidth
                    size="small"
                    label="Tên bài báo"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

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
                        onChange={(e) => handleChangeCategory(e.target.value)}
                    >
                        {categoryList.map(e => (
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
                        onChange={(e) => setSubCategoryId(e.target.value)}
                    >
                        {subCategoryList.map(e => (
                            <MenuItem key={e.id} value={e.id}>
                                {e.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <ImageUploadWithPreview />

                {/* 📝 JODIT EDITOR */}
                <Box>
                    <Typography mb={1} fontWeight={500}>
                        Nội dung bài viết
                    </Typography>

                    <JoditEditor
                        ref={editorRef}
                        value={content}
                        onBlur={(newContent) => setContent(newContent)}
                        config={{
                            readonly: false,
                            height: 400,
                            placeholder: "Nhập nội dung bài báo...",
                            toolbarAdaptive: false
                        }}
                    />
                </Box>

                {/* SUBMIT */}
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
