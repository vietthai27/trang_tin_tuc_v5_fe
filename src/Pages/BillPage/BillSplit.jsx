import { useState, useEffect } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Paper
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUserListRequest, splitBillRequest } from "./redux";
import BillResult from "./BillResult";

const BillSplit = () => {

    const listUser = useSelector((state) => state.billList.listUser);
    const splitBillResult = useSelector((state) => state.billList.splitBillResult);
    const [selected, setSelected] = useState({});
    const dispatch = useDispatch();

    const handleCheck = (id) => {
        setSelected((prev) => ({
            ...prev,
            [id]: { ...prev[id], checked: !prev[id]?.checked },
        }));
    };

    const handleAmountChange = (id, value) => {
        setSelected((prev) => ({
            ...prev,
            [id]: { ...prev[id], amount: Number(value) },
        }));
    };

    const handleGenerate = async () => {
        const selectedMembers = Object.entries(selected)
            .filter(([_, data]) => data.checked)
            .map(([id, data]) => ({
                id: Number(id),
                memberAmount: data.amount || 0,
            }));
        const payload = { paidAmount: Object.fromEntries(selectedMembers.map(item => [item.id, item.memberAmount])) };
        dispatch(splitBillRequest(payload))    
    };

    useEffect(() => {
        dispatch(getUserListRequest());
    }, [dispatch]);

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                minHeight: "100vh",
                backgroundColor: "#f9fafb",
                py: 6,
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    p: 4,
                    width: "95%",
                    maxWidth: 500,
                    borderRadius: 3,
                    textAlign: "center",
                    backgroundColor: "white",
                }}
            >
                <Typography variant="h4" gutterBottom fontWeight="bold">
                    💸 Chia tiền
                </Typography>

                <FormGroup sx={{ mt: 3 }}>
                    {listUser.map((row) => (
                        <Box
                            key={row.id}
                            sx={{
                                mt: 2,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selected[row.id]?.checked || false}
                                        onChange={() => handleCheck(row.id)}
                                    />
                                }
                                label={row.username}
                            />
                            <TextField
                                label="Số tiền"
                                variant="outlined"
                                type="number"
                                size="small"
                                value={selected[row.id]?.amount}
                                onChange={(e) => handleAmountChange(row.id, e.target.value)}
                                sx={{ width: 120 }}
                            />
                        </Box>
                    ))}
                </FormGroup>

                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 4, py: 1.2, fontWeight: "bold" }}
                    onClick={() => { handleGenerate() }}
                >
                    Chia hóa đơn
                </Button>

                <BillResult data={splitBillResult} />
            </Paper>
        </Box>
    );
};

export default BillSplit;
