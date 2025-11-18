// File: BillSplit.jsx

import { useState, useEffect } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    List,
    IconButton,
    // 💡 NEW IMPORTS FOR ACCORDION
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // 💡 ICON IMPORT
import { useDispatch, useSelector } from "react-redux";
import { getUserListRequest, splitBillRequest } from "./redux";
import { toast } from "react-toastify";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const BillSplit = () => {
    const listUser = useSelector((state) => state.billList.listUser);
    const dispatch = useDispatch();

    const [selectUser, setSelectUser] = useState("");
    const [listUserBill, setListUserBill] = useState([]);
    
    // 💡 State to manage Accordion expansion (default to open)
    const [expanded, setExpanded] = useState(true); 

    // Load users from API
    useEffect(() => {
        dispatch(getUserListRequest());
    }, [dispatch]);

    // Set default selected user
    useEffect(() => {
        if (listUser.length > 0) {
            setSelectUser(listUser[0].username);
        }
    }, [listUser]);

    // Add member to the bill list
    const handleAddListUserBill = () => {
        if (!selectUser) return;

        if (listUserBill.some((u) => u.username === selectUser)) {
            toast.warn("Thành viên đã được thêm");
            return;
        }

        const user = listUser.find((u) => u.username === selectUser);

        setListUserBill([
            ...listUserBill,
            {
                username: user.username,
                fullName: user.fullName,
                payments: [] // list of payments
            },
        ]);
    };

    // Add payment
    const handleAddPayment = (username) => {
        setListUserBill((prev) =>
            prev.map((u) =>
                u.username === username
                    ? { ...u, payments: [...u.payments, { title: "", amount: "" }] }
                    : u
            )
        );
    };

    // Update payment field
    const handleUpdatePayment = (username, index, field, value) => {
        setListUserBill((prev) =>
            prev.map((u) => {
                if (u.username === username) {
                    const updatedPayments = [...u.payments];
                    // Ensure amount is treated as a string for input field value
                    updatedPayments[index][field] = field === "amount" ? value : value; 
                    return { ...u, payments: updatedPayments };
                }
                return u;
            })
        );
    };

    // Delete payment
    const handleDeletePayment = (username, index) => {
        setListUserBill((prev) =>
            prev.map((u) =>
                u.username === username
                    ? {
                        ...u,
                        payments: u.payments.filter((_, i) => i !== index),
                    }
                    : u
            )
        );
    };

    // Delete user
    const handleDeleteUser = (username) => {
        setListUserBill((prev) => prev.filter((u) => u.username !== username));
    };

    // Final Split Bill handler with validation
    const handleSplitBill = () => {
        // Basic validation: Check if any user has an empty payment list
        const isValid = listUserBill.every(user => user.payments.length > 0 && user.payments.every(p => p.title && p.amount > 0));

        if (listUserBill.length === 0) {
            toast.error("Vui lòng thêm ít nhất một thành viên.");
            return;
        }

        // if (!isValid) {
        //     toast.error("Vui lòng điền đầy đủ Tên khoản và Số tiền (> 0) cho tất cả các khoản thanh toán.");
        //     return;
        // }

        dispatch(splitBillRequest(listUserBill));
        // Optionally close the accordion after successful dispatch
        setExpanded(false);
    };


    return (
        <Accordion 
            expanded={expanded} 
            onChange={() => setExpanded(!expanded)} 
            defaultExpanded 
            sx={{ m: 2, boxShadow: 3 }}
        >
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#f5f5f5' }}>
                <Typography variant="h6" >🧾 Chi Tiết Các Khoản Chi Tiêu</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 3 }}>
                <Box>
                    {/* Select user + Add member */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 2,
                            maxWidth: 600,
                            mx: "auto",
                            mb: 3,
                        }}
                    >
                        <FormControl fullWidth size="small">
                            <InputLabel>Thành viên</InputLabel>
                            <Select
                                label="Thành viên"
                                value={selectUser}
                                onChange={(e) => setSelectUser(e.target.value)}
                            >
                                {listUser.map((row) => (
                                    <MenuItem key={row.id} value={row.username}>
                                        {row.fullName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Button variant="contained" color="success" onClick={handleAddListUserBill}>
                            Thêm
                        </Button>
                    </Box>

                    {/* User boxes */}
                    {listUserBill.length === 0 ? (
                        <Typography align="center" sx={{ mt: 5, color: "#888" }}>
                            Chưa có thành viên — hãy thêm thành viên để bắt đầu
                        </Typography>
                    ) : (
                        <List sx={{ maxWidth: 700, mx: "auto" }}>
                            {listUserBill.map((user) => (
                                <Box
                                    key={user.username}
                                    sx={{
                                        p: 2,
                                        borderRadius: 2,
                                        mb: 3,
                                        boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
                                        border: "1px solid #e0e0e0",
                                    }}
                                >
                                    {/* Header row */}
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            mb: 2,
                                        }}
                                    >
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                            <AccountCircleIcon sx={{ color: "#1976d2" }} />
                                            <Typography variant="h6">{user.fullName}</Typography>
                                        </Box>

                                        <Box sx={{ display: "flex", gap: 1 }}>
                                            <Button
                                                size="small"
                                                variant="outlined"
                                                endIcon={<AddCircleIcon />}
                                                onClick={() => handleAddPayment(user.username)}
                                            >
                                                Khoản mới
                                            </Button>

                                            <IconButton
                                                color="error"
                                                onClick={() => handleDeleteUser(user.username)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    </Box>

                                    {/* Payment items */}
                                    {user.payments.map((payment, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                display: "flex",
                                                gap: 2,
                                                mb: 2,
                                                alignItems: "center",
                                                p: 1.3,
                                                borderRadius: "8px",
                                                background: "#fafafa",
                                            }}
                                        >
                                            <TextField
                                                label="Tên khoản"
                                                size="small"
                                                fullWidth
                                                value={payment.title}
                                                onChange={(e) =>
                                                    handleUpdatePayment(
                                                        user.username,
                                                        index,
                                                        "title",
                                                        e.target.value
                                                    )
                                                }
                                            />

                                            <TextField
                                                label="Số tiền"
                                                size="small"
                                                type="number"
                                                sx={{ width: 140 }}
                                                value={payment.amount}
                                                onChange={(e) =>
                                                    handleUpdatePayment(
                                                        user.username,
                                                        index,
                                                        "amount",
                                                        e.target.value
                                                    )
                                                }
                                            />

                                            <IconButton
                                                color="error"
                                                onClick={() => handleDeletePayment(user.username, index)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    ))}

                                    {user.payments.length === 0 && (
                                        <Typography sx={{ color: "#999", ml: 1 }}>
                                            Chưa có khoản thanh toán nào
                                        </Typography>
                                    )}
                                </Box>
                            ))}
                        </List>
                    )}

                    <Box textAlign="center" sx={{ mt: 2 }}>
                        <Button variant="contained" onClick={handleSplitBill}>Tính tiền</Button>
                    </Box>
                </Box>
            </AccordionDetails>
        </Accordion>
    );
};

export default BillSplit;