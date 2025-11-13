import {
    Box,
    Typography,
    Paper,
    List,
    ListItem,
    ListItemText,
    Divider,
    Grid,
    MenuItem,
    Select,
    Button,
    Avatar
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAccountListRequest } from "../AccountPage/redux";
import { useState } from "react";

const BillResult = ({ data }) => {

    const dispatch = useDispatch()
    const accountListData = useSelector(state => state.accountList.accountListData)
    const [selectedBank, setSelectedBank] = useState(null);
    const handleBankSelect = (event) => {
        const bankId = event.target.value;
        const bank = accountListData.find(b => b.id === bankId);
        setSelectedBank(bank);
    };


    if (!data) return null;

    // ✅ Safe defaults so Object.entries() won't break
    const {
        mustPaid = {},
        getPaid = {},
        totalAmount = 0,
        averageAmount = 0
    } = data;



    return (
        <Box
            sx={{
                mt: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
            }}
        >
            <Typography variant="h5" gutterBottom fontWeight="bold">
                💰 Kết quả chia hóa đơn
            </Typography>

            <Paper
                elevation={3}
                sx={{
                    width: "100%",
                    maxWidth: 600,
                    p: 3,
                    borderRadius: 3,
                    backgroundColor: "#fff",
                }}
            >
                {/* Summary section */}
                <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={6}>
                        <Typography variant="subtitle1" color="textSecondary">
                            Tổng tiền
                        </Typography>
                        <Typography variant="h6" fontWeight="bold">
                            {totalAmount.toLocaleString()} ₫
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle1" color="textSecondary">
                            Trung bình
                        </Typography>
                        <Typography variant="h6" fontWeight="bold">
                            {averageAmount.toLocaleString()} ₫
                        </Typography>
                    </Grid>
                </Grid>

                <Divider sx={{ mb: 2 }} />

                {/* Must Pay section */}
                <Typography variant="h6" color="error" gutterBottom>
                    Người phải trả
                </Typography>
                <List dense>
                    {Object.keys(mustPaid).length === 0 ? (
                        <ListItem>
                            <ListItemText primary="Không ai phải trả." />
                        </ListItem>
                    ) : (
                        Object.entries(mustPaid).map(([username, amount]) => (
                            <ListItem key={username}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        width: "100%",
                                    }}
                                >
                                    <ListItemText
                                        primary={username}
                                        secondary={`Số tiền: ${amount.toLocaleString()} ₫`}
                                    />
                                </Box>
                            </ListItem>
                        ))
                    )}
                </List>

                <Divider sx={{ my: 2 }} />

                {/* Get Paid section */}
                <Typography variant="h6" color="success.main" gutterBottom>
                    Người được trả
                </Typography>
                <List dense>
                    {Object.keys(getPaid).length === 0 ? (
                        <ListItem>
                            <ListItemText primary="Không ai được trả." />
                        </ListItem>
                    ) : (
                        Object.entries(getPaid).map(([username, amount]) => (
                            <ListItem
                                key={username}
                                // Set ListItem to column flex to stack the rows
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start", // Align all items to the start (left)
                                    p: 1, // Add some padding
                                    border: '1px solid #f0f0f0', // Optional: for visual separation
                                    borderRadius: 1,
                                    mb: 1.5,
                                }}
                            >
                                {/* Row 1: Account Info and Button */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        width: "100%", // Takes full width of the list item
                                        mb: 1, // Margin below this row
                                    }}
                                >
                                    <ListItemText
                                        primary={username}
                                        secondary={`Số tiền: ${amount.toLocaleString()} ₫`}
                                    />
                                    <Button
                                        color='warning'
                                        onClick={() => { dispatch(getAccountListRequest(username)) }}
                                    >
                                        Lấy mã Qr
                                    </Button>
                                </Box>

                                {/* Conditional Rows (2 and 3) only visible after API call */}
                                {accountListData?.length > 0 && (
                                    <Box sx={{ width: "100%" }}>
                                        {/* Row 2: Bank Select Dropdown */}
                                        <Select
                                            fullWidth
                                            value={selectedBank?.id || ""}
                                            onChange={handleBankSelect}
                                            displayEmpty
                                            sx={{ mb: 1 }} // Margin below the select
                                        >
                                            <MenuItem value="">
                                                <em>Chọn ngân hàng</em>
                                            </MenuItem>
                                            {accountListData.map((bank) => (
                                                <MenuItem key={bank.id} value={bank.id}>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: 1,
                                                        }}
                                                    >
                                                        <Avatar
                                                            src={bank.bankImageUrl}
                                                            alt={bank.bankName}
                                                            sx={{ width: 24, height: 24 }}
                                                        />
                                                        <Typography>{bank.bankName}</Typography>
                                                    </Box>
                                                </MenuItem>
                                            ))}
                                        </Select>

                                        {/* Row 3: QR Code and Account Number */}
                                        {selectedBank && (
                                            <div style={{ width: '100%', display: "flex", flexDirection: "column", alignItems: "center", justifyContent:"center" }}>
                                                <img
                                                    src={selectedBank.qrUrl}
                                                    alt="QR code"
                                                    width={160}
                                                    height={160}
                                                    style={{
                                                        marginBottom: "8px",
                                                        objectFit:"cover" // Added margin for spacing
                                                    }}
                                                />
                                                <Typography variant="body2" color="textSecondary">
                                                    STK: **{selectedBank.accountNumber}**
                                                </Typography>
                                            </div>
                                        )}
                                    </Box>
                                )}
                            </ListItem>
                        ))
                    )}
                </List>
            </Paper>
        </Box>
    );
};

export default BillResult;
