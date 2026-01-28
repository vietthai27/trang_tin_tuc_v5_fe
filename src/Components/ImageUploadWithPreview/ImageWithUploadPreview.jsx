import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    IconButton,
    TextField,
    Typography
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { deleteImageRequest, uploadImageRequest } from "./reducer";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function ImageUploadWithPreview() {

    const { images, uploading } = useSelector(state => state.uploadImage)

    const dispatch = useDispatch()

    const handleUploadImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        dispatch(uploadImageRequest(file))
    };

    const copyUrl = (url) => {
        navigator.clipboard.writeText(url);
        toast.success("Đã copy URL");
    };

    return (
        <Box>

            <Button
                variant="contained"
                component="label"
                disabled={uploading}
                sx={{ mb: 2 }}
            >
                Upload Image
                <input hidden type="file" accept="image/*" onChange={handleUploadImage} />
            </Button>


            <Box display="flex" gap={2} flexWrap="wrap">
                {images.map((img) => (
                    <Card key={img.id} sx={{ width: 260 }}>
                        <CardMedia
                            component="img"
                            height="150"
                            image={img.url}
                            alt="uploaded"
                        />
                        <CardContent>
                            <Typography variant="subtitle2" gutterBottom>
                                Image URL
                            </Typography>

                            <Box display="flex" alignItems="center" gap={1}>
                                <TextField
                                    size="small"
                                    value={img.url}
                                    fullWidth
                                    InputProps={{ readOnly: true }}
                                />
                                <IconButton onClick={() => copyUrl(img.url)}>
                                    <ContentCopyIcon fontSize="small" />
                                </IconButton>
                                <IconButton onClick={() => dispatch(deleteImageRequest(img.url))}>
                                    <DeleteOutlineIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Box>

        </Box>
    );
}
