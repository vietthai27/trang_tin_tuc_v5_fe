import { Box, Typography, TextField, Button, Avatar } from "@mui/material";
import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addBankRequest, closeModalAddBank, closeModalEditBank, editBankRequest, getBankByIdRequest } from "./redux";

function EditBank() {
    const dispatch = useDispatch();
    const { search, pageNum, pageSize, itemId, bankById } = useSelector(state => state.bankList);

    const [bankName, setBankName] = useState("");
    const [image, setImage] = useState(null); // new uploaded file
    const [preview, setPreview] = useState(null); // preview shown in UI
    const [isDragging, setIsDragging] = useState(false);

    const bankSearchParams = {
        bankName: search,
        pageNumber: pageNum,
        pageSize: pageSize
    };

    // Fetch bank by ID
    useEffect(() => {
        if (itemId) {
            dispatch(getBankByIdRequest(itemId));
        }
    }, [dispatch, itemId]);

    // Pre-fill form with bankById data if available
    useEffect(() => {
        if (bankById && !image) { // only update preview if no new file is selected
            setBankName(bankById.bankName || "");
            setPreview(bankById.imageUrl || null);
        }
    }, [bankById, image]);

    // Handle file selection
    const handleFile = useCallback((file) => {
        if (file) {
            setImage(file); // new file to send
            setPreview(URL.createObjectURL(file)); // show preview
        } else {
            // Reset to original bank image
            setImage(null);
            setPreview(bankById?.imageUrl || null);
        }
    }, [bankById]);

    const handleImageChange = (e) => {
        handleFile(e.target.files[0]);
    };

    // Drag & drop handlers
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

    // Submit form
    const handleSubmit = () => {
        if (!bankName) {
            toast.warning("Vui lòng nhập tên ngân hàng!");
            return;
        }

        dispatch(
            editBankRequest({
                bankId: itemId,
                bankName,
                bankImage: image, // null = keep existing image
                searchParams: bankSearchParams
            })
        );
        dispatch(closeModalEditBank());
    };

    return (
        <Box sx={{
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
        }}>
            <Typography variant="h5" fontWeight={600} align="center">
                Sửa ngân hàng
            </Typography>

            <TextField
                label="Tên ngân hàng"
                variant="outlined"
                fullWidth
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
            />

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

            {preview && (
                <Box sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 1 }}>
                    <Avatar
                        src={preview}
                        alt="Preview"
                        sx={{ width: 140, height: 140, borderRadius: 3, boxShadow: 2 }}
                        variant="rounded"
                    />
                    {image && (
                        <Button
                            onClick={() => handleFile(null)}
                            variant="outlined"
                            color="error"
                            sx={{ height: 40, alignSelf: "center" }}
                        >
                            Hủy ảnh mới
                        </Button>
                    )}
                </Box>
            )}

            <Button variant="outlined" component="label" sx={{ mt: 2 }}>
                Tải ảnh lên
                <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </Button>

            <Button
                variant="contained"
                color="primary"
                sx={{
                    mt: 2,
                    py: 1.5,
                    fontWeight: 600,
                    borderRadius: 2,
                    "&:hover": { backgroundColor: "primary.dark" },
                }}
                onClick={handleSubmit}
            >
                Lưu
            </Button>
        </Box>
    );
}

export default EditBank;
