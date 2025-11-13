import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModalAddAccount, closeModalEditAccount, deleteAccountRequest, getAccountListRequest, openModalAddAccount, openModalEditAccount } from "./redux";
import { Box, Button, Card, CardActions, CardContent, Modal, Typography } from "@mui/material";
import HideImageIcon from '@mui/icons-material/HideImage';
import AddAccount from "./AddAccount";
import EditAccount from "./EditAccount";

function AccountPage() {

    const dispatch = useDispatch()
    const currentUsername = useSelector(state => state.app.username)
    const accountListData = useSelector(state => state.accountList.accountListData)
    const { modalAddAccount, modalEditAccount } = useSelector(state => state.accountList)

    const loginState = useSelector(state => state.app.loginState)

    useEffect(() => {
        if (currentUsername) {
            dispatch(getAccountListRequest(currentUsername));
        }
    }, [currentUsername]);

    return (
        <div>
            {loginState ? (
                <div className='user-list-page'>
                    <h1>Quản lý tài khoản</h1>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => { dispatch(openModalAddAccount()) }}
                        >Thêm</Button>
                    </Box>
                    {accountListData.map((row) => (
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    Số tài khoản: {row.accountNumber}
                                </Typography>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'left',
                                    gap: 2,
                                }}>
                                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                                        Ngân hàng: {row.bankName}
                                    </Typography>
                                    {row.bankImageUrl ? (
                                        <img
                                            src={row.bankImageUrl}
                                            alt={row.bankName}
                                            style={{
                                                width: 30,
                                                height: 30,
                                                borderRadius: 4,
                                                objectFit: "cover",
                                            }}
                                        />
                                    ) : (
                                        <HideImageIcon />
                                    )}
                                </Box>

                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'left',
                                    gap: 2,
                                }}>
                                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>QR CODE</Typography>
                                    {row.qrUrl ? (
                                        <img
                                            src={row.qrUrl}
                                            alt={row.bankName}
                                            style={{
                                                width: 100,
                                                height: 100,
                                                borderRadius: 4,
                                                objectFit: "cover",
                                            }}
                                        />
                                    ) : (
                                        <HideImageIcon />
                                    )}
                                </Box>
                            </CardContent>
                            <CardActions>
                                <Button
                                    variant="contained"
                                    color="warning"
                                    onClick={() => { dispatch(openModalEditAccount({ id: row.id, bankId: row.bankId })) }}
                                >
                                    Sửa
                                </Button>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => { dispatch(deleteAccountRequest({ id: row.id, username: currentUsername })) }}
                                >
                                    Xóa
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
                    <Modal
                        open={modalAddAccount}
                        onClose={() => { dispatch(closeModalAddAccount()) }}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <AddAccount />
                    </Modal>
                    <Modal
                        open={modalEditAccount}
                        onClose={() => { dispatch(closeModalEditAccount()) }}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <EditAccount />
                    </Modal>
                </div>
            ) : (
                <img style={{ width: '100%', padding:'10px' }} alt="login-please" src="https://i0.wp.com/dpicanada.ca/wp-content/uploads/2022/10/SITE-SIGN-SITE-FACILITY-VISITORS-PLEASE-SIGN-IN-SITE-0007.png?fit=392%2C392&ssl=1" />
            )}


        </div>
    )
}

export default AccountPage