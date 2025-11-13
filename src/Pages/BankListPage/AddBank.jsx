import { Box, Typography, TextField, Button, Avatar } from "@mui/material";
import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addBankRequest, closeModalAddBank } from "./redux";

function AddBank() {
    const [bankName, setBankName] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const dispatch = useDispatch();

    const { search, pageNum, pageSize } = useSelector(state => state.bankList)
    const bankSearchParams = {
        bankName: search,
        pageNumber: pageNum,
        pageSize: pageSize
    }

    const handleFile = useCallback((file) => {
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    }, []);

    const handleImageChange = (e) => {
        handleFile(e.target.files[0]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        handleFile(file);
    };

    const handleSubmit = () => {
        if (!bankName) {
            toast.warning("Vui lòng nhập tên ngân hàng!");
            return;
        }
        if (!image) {
            toast.warning("Vui lòng chọn ảnh!");
            return;
        }

        dispatch(
            addBankRequest({
                bankName,
                bankImage: image,
                searchParams: bankSearchParams
            })
        );
        dispatch(closeModalAddBank())
    };

    return (
        <Box
            sx={{
                maxWidth: 350,
                mx: "auto",
                mt: 5,
                p: 4,
                bgcolor: "#fff",
                borderRadius: 3,
                boxShadow: 4,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                fontFamily: "Roboto, sans-serif",
            }}
        >
            <Typography variant="h5" fontWeight={600} align="center">
                Thêm ngân hàng
            </Typography>

            {/* Bank Name */}
            <TextField
                label="Tên ngân hàng"
                variant="outlined"
                fullWidth
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
            />

            {/* Drag & Drop area */}
            <Box
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                sx={{
                    mt: 1,
                    p: 3,
                    border: "2px dashed",
                    borderColor: isDragging ? "primary.main" : "grey.400",
                    borderRadius: 2,
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    bgcolor: isDragging ? "grey.100" : "transparent",
                    color: "text.secondary",
                }}
            >
                {isDragging ? "Thả ảnh ở đây..." : "Kéo thả ảnh vào đây hoặc nhấn nút để tải lên"}
                <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </Box>

            {/* Image Preview */}
            {preview && (
                <Box
                    sx={{
                        mt: 2,
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Avatar
                        src={preview}
                        alt="Preview"
                        sx={{ width: 140, height: 140, borderRadius: 3, boxShadow: 2 }}
                        variant="rounded"
                    />
                </Box>
            )}

            {/* Upload Button */}
            <Button
                variant="outlined"
                component="label"
                sx={{ mt: 2 }}
            >
                Tải ảnh lên
                <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </Button>

            {/* Submit Button */}
            <Button
                variant="contained"
                color="primary"
                sx={{
                    mt: 2,
                    py: 1.5,
                    fontWeight: 600,
                    borderRadius: 2,
                    "&:hover": {
                        backgroundColor: "primary.dark",
                    },
                }}
                onClick={handleSubmit}
            >
                Lưu
            </Button>
        </Box>
    );
}

export default AddBank;
