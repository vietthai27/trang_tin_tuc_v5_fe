import { Box, Typography, TextField, Button, Avatar, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addAccountRequest, closeModalAddAccount, getBankListRequest } from "./redux";

function AddAccount() {

    const [bankAccount, setBankAccount] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const dispatch = useDispatch();
    const currentUsername = useSelector(state => state.app.username)

    const { listBanks } = useSelector(state => state.accountList)

    useEffect(() => {
        dispatch(getBankListRequest())
    }, [])

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
        if (!bankAccount) {
            toast.warning("Vui lòng nhập tên ngân hàng!");
            return;
        }
        if (!image) {
            toast.warning("Vui lòng chọn ảnh!");
            return;
        }

        dispatch(
            addAccountRequest({
                username: currentUsername,
                bankId: bankId,
                accountNumber: bankAccount,
                qrImage: image
            })
        );
        dispatch(closeModalAddAccount())
    };

    const [bankId, setBankId] = useState('');

    const handleChange = (event) => {
        setBankId(event.target.value);
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
                Thêm tài khoản
            </Typography>

            <TextField
                label="Số tài khoản"
                variant="outlined"
                fullWidth
                value={bankAccount}
                onChange={(e) => setBankAccount(e.target.value)}
            />

            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Ngân hàng</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={bankId}
                        label="Ngân hàng"
                        onChange={handleChange}
                    >
                        {listBanks.map((row) => (
                            <MenuItem value={row.id}>{row.bankName}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

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
                {isDragging ? "Thả ảnh QR ở đây..." : "Kéo thả ảnh QR vào đây hoặc nhấn nút để tải lên"}
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
                </Box>
            )}

            <Button variant="outlined" component="label" sx={{ mt: 2 }}>
                Tải ảnh QR lên
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
    )
}

export default AddAccount