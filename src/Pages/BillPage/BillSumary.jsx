// File: BillSumary.jsx

import { useEffect, useMemo, useState } from 'react';
import {
    Container,
    Typography,
    Card,
    List,
    ListItem,
    ListItemText,
    Divider,
    Chip,
    Box,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Grid, // Added Grid for proper top section rendering
    // Add AttachMoneyIcon if used in the summary section
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { useSelector, useDispatch } from 'react-redux';
import { getAccountListRequest } from '../AccountPage/redux'; // Action for saga

// --- Helper Functions ---
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
    }).format(amount);
};

// --- Main Component ---
const BillSummary = () => {
    const dispatch = useDispatch();

    const transactions = useSelector((state) => state.billList.splitBillResult) || [];

    // 💡 NEW SELECTOR: Get the map of all fetched accounts keyed by receiver
    const qrAccountsMap = useSelector((state) => state.billList.accountListDataByUser || {});

    const [expandedPanel, setExpandedPanel] = useState(false);
    const [selectedReceiver, setSelectedReceiver] = useState(null); 
    // Initialize selectedAccount to an empty object for safe checking
    const [selectedAccount, setSelectedAccount] = useState({}); 

    // 💡 NEW MEMO: Dynamically get the account list for the currently selected receiver
    const currentAccountList = useMemo(() => {
        // Retrieve the list from the map based on the active receiver
        return selectedReceiver ? qrAccountsMap[selectedReceiver] || [] : [];
    }, [selectedReceiver, qrAccountsMap]); // Recalculate if receiver or map changes


    // 🎯 UPDATED useEffect: Automatically select the first account when the *current* list arrives
    useEffect(() => {
        if (currentAccountList.length > 0) {
            // Check if the currently selected account ID matches the first account's ID
            if (!selectedAccount.id || selectedAccount.id !== currentAccountList[0].id) {
                // Set the first item as the default selection
                setSelectedAccount(currentAccountList[0]);
            }
        }
    }, [currentAccountList]); // Dependency: Run this effect whenever the current list changes

    // --- Handlers ---
    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpandedPanel(isExpanded ? panel : false);
        // Reset selected receiver details when closing an accordion
        if (!isExpanded) {
            setSelectedReceiver(null);
            setSelectedAccount({});
        }
    };

    const handleFetchQR = (toUser) => {
        setSelectedReceiver(toUser);
        setSelectedAccount({}); // Reset selection to trigger useEffect based on new currentAccountList

        // 💡 UPDATED LOGIC: Check if data is already in the map
        if (qrAccountsMap[toUser] && qrAccountsMap[toUser].length > 0) {
            // Data is already loaded, useEffect will automatically select the first one
            return;
        }

        // Data not loaded, dispatch action.
        // The action payload must include the receiver's name for the saga/reducer to use.
        // Assuming getAccountListRequest is set up to handle an object payload:
        dispatch(getAccountListRequest({ receiver: toUser }));
    };

    const handleAccountChange = (event) => {
        const accountId = event.target.value;
        // Search in the current list
        const account = currentAccountList.find(a => a.id === accountId);
        setSelectedAccount(account);
    };


    // --- Memoized Calculation (Unchanged) ---
    const { netBalances, groupedTransactions, totalDebt, totalCredit } = useMemo(() => {
        if (!Array.isArray(transactions) || transactions.length === 0) {
            return {
                netBalances: {},
                groupedTransactions: {},
                totalDebt: 0,
                totalCredit: 0
            };
        }
        
        const balances = {};
        const groups = {};

        transactions.forEach(t => {
            balances[t.fromUser] = (balances[t.fromUser] || 0) - t.amount;
            balances[t.toUser] = (balances[t.toUser] || 0) + t.amount;

            if (!groups[t.fromUser]) {
                groups[t.fromUser] = { total: 0, transactions: [] };
            }
            groups[t.fromUser].total += t.amount;
            groups[t.fromUser].transactions.push(t);
        });

        const debtorsCalc = Object.entries(balances).filter(([, amount]) => amount < 0);
        const creditorsCalc = Object.entries(balances).filter(([, amount]) => amount > 0);

        const totalDebt = debtorsCalc.reduce((sum, [, amount]) => sum + Math.abs(amount), 0);
        const totalCredit = creditorsCalc.reduce((sum, [, amount]) => sum + amount, 0);

        return { netBalances: balances, groupedTransactions: groups, totalDebt, totalCredit };
    }, [transactions]);
    
    // --- QR Code Display Component (Unchanged logic, just uses accounts prop) ---
    const QRDetailComponent = ({ accounts, selectedAccount }) => {
        const currentAccount = selectedAccount && selectedAccount.id ? selectedAccount : {}; 
        
        if (!accounts || accounts.length === 0) {
            return <Typography color="text.secondary" sx={{ mt: 2 }}>Không có tài khoản ngân hàng nào được tìm thấy.</Typography>;
        }

        return (
            <Box sx={{ mt: 2, p: 2, border: '1px solid #ccc', borderRadius: 1, width: '100%', mb: 2 }}>
                {/* 💡 FIX APPLIED HERE: Added minWidth for display consistency */}
                <FormControl fullWidth size="small" sx={{ mb: 2, minWidth: 200 }}>
                    <InputLabel id="bank-select-label">Chọn Tài Khoản Ngân Hàng</InputLabel>
                    <Select
                        labelId="bank-select-label"
                        value={currentAccount.id || ''}
                        label="Chọn Tài Khoản Ngân Hàng"
                        onChange={handleAccountChange}
                    >
                        {accounts.map((account) => (
                            <MenuItem key={account.id} value={account.id}>
                                <img
                                    src={account.bankImageUrl}
                                    alt={account.bankName}
                                    style={{ width: 24, height: 24, marginRight: 8, borderRadius: '50%' }}
                                />
                                {account.bankName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {currentAccount.id && (
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                            Tên Ngân Hàng: {currentAccount.bankName}
                        </Typography>
                        <Typography variant="body1" color="primary">
                            Số Tài Khoản: **{currentAccount.accountNumber}**
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            Quét mã QR để chuyển tiền
                        </Typography>
                        {/* QR Image */}
                        <Box
                            component="img"
                            src={currentAccount.qrUrl}
                            alt={`QR Code for ${currentAccount.bankName}`}
                            sx={{
                                width: '100%',
                                maxWidth: 200,
                                height: 'auto',
                                border: '1px solid #eee',
                                padding: 1,
                                margin: '0 auto'
                            }}
                        />
                    </Box>
                )}
            </Box>
        );
    };

    // --- Main Render ---
    return (
        <Container maxWidth="md" sx={{ mb: 2 }}>
            <Card variant="outlined">
                <Box>
                    {Object.entries(groupedTransactions).map(([fromUser, data]) => (
                        <Accordion
                            key={fromUser}
                            expanded={expandedPanel === fromUser}
                            onChange={handleAccordionChange(fromUser)}
                            disableGutters
                            sx={{ borderBottom: 1, borderColor: 'divider', '&:last-child': { borderBottom: 'none' } }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`${fromUser}-content`}
                                id={`${fromUser}-header`}
                                sx={{ '&:hover': { bgcolor: 'action.hover' }, minHeight: 60 }}
                            >
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                                    <Typography variant="h6" >
                                        **{fromUser}** (Tổng trả)
                                    </Typography>
                                    <Chip
                                        label={formatCurrency(data.total)}
                                        color="error"
                                        size="medium"
                                        sx={{ mr: 2 }}
                                    />
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails sx={{ p: 0, borderTop: 1, borderColor: 'divider' }}>
                                <List dense disablePadding>
                                    {data.transactions.map((t, index) => (
                                        <ListItem
                                            key={index}
                                            sx={{ py: 0.5, pl: 4, pr: 2, flexDirection: 'column', alignItems: 'flex-start' }}
                                        >
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 1 }}>
                                                <ListItemText
                                                    primary={
                                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                            <Typography variant="body2" component="span" color="text.secondary">
                                                                Thanh toán cho
                                                            </Typography>
                                                            <Typography variant="body2" component="span" fontWeight="medium" sx={{ ml: 0.5 }}>
                                                                ** {t.toUser} **
                                                            </Typography>
                                                        </Box>
                                                    }
                                                    secondary={
                                                        <Typography variant="body2" color="green" component="span" fontWeight="medium" sx={{ ml: 0.5 }}>
                                                            Số tiền: {formatCurrency(t.amount)}
                                                        </Typography>
                                                    }
                                                />
                                                <Button
                                                    size="small"
                                                    variant="contained"
                                                    color="warning"
                                                    onClick={() => handleFetchQR(t.toUser)}
                                                    endIcon={<QrCodeScannerIcon />}
                                                    sx={{ textTransform: 'none', margin: 1 }}
                                                >
                                                    Lấy mã QR
                                                </Button>
                                            </Box>

                                            {/* 👇 CONDITIONAL QR/BANK SELECT DISPLAY 👇 */}
                                            {selectedReceiver === t.toUser && (
                                                <QRDetailComponent
                                                    accounts={currentAccountList} // 💡 PASS THE CURRENT MEMOIZED LIST
                                                    selectedAccount={selectedAccount}
                                                />
                                            )}
                                        </ListItem>
                                    ))}
                                </List>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>
            </Card>
        </Container>
    );
};

export default BillSummary;