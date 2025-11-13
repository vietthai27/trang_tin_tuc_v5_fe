import { useDispatch, useSelector } from "react-redux"
import { addBankRequest, changePageNum, changeSearch, closeModalAddBank, closeModalEditBank, deleteBankRequest, getBankListRequest, openModalAddBank, openModalEditBank } from "./redux"
import { useEffect } from "react"
import { Box, Button, IconButton, InputBase, Modal, Pagination, Paper, Stack, Table, TableBody, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { StyledTableCell, StyledTableRow } from "../../StyleConfig"
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddBoxIcon from '@mui/icons-material/AddBox';
import HideImageIcon from '@mui/icons-material/HideImage';
import AddBank from "./AddBank"
import EditBank from "./EditBank"

function BankListPage() {

    const dispatch = useDispatch()
    const bankListData = useSelector(state => state.bankList.bankListData)
    const bankListDataPaging = useSelector(state => state.bankList.bankListDataPaging)
    const { search, pageNum, pageSize, modalAddBank, modalEditBank } = useSelector(state => state.bankList)


    const bankSearchParams = {
        bankName: search,
        pageNumber: pageNum,
        pageSize: pageSize
    }

    useEffect(() => {
        dispatch(getBankListRequest({
            bankName: search,
            pageNumber: pageNum,
            pageSize: pageSize
        }))
    }, [pageNum, pageSize])

    const handleChangePage = (event, newPage) => {
        dispatch(changePageNum(newPage))
    };

    const handelSearch = () => {
        dispatch(changePageNum(1))
        dispatch(getBankListRequest(bankSearchParams))
    }

    return (
        <div className='user-list-page'>
            <h1>Quản lý ngân hàng</h1>
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '80%' }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Tìm kiếm"
                    inputProps={{ 'aria-label': 'Tìm kiếm' }}
                    onChange={(e) => { dispatch(changeSearch(e.target.value)) }}
                />
                <IconButton
                    type="button" sx={{ p: '10px' }}
                    aria-label="search"
                    onClick={() => { handelSearch() }}>
                    <SearchIcon />
                </IconButton>
            </Paper>
            <TableContainer sx={{ width: '95%' }} component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Ngân hàng</StyledTableCell>
                            <StyledTableCell align="center">
                                <Button
                                    startIcon={<AddBoxIcon />}
                                    variant='contained'
                                    color='warning'
                                    onClick={() => {
                                        dispatch(openModalAddBank())
                                    }}
                                >Thêm</Button>
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bankListData.map((row) => (
                            <StyledTableRow hover key={row.bankName}>
                                {/* Bank Name */}
                                <StyledTableCell align="left" sx={{ px: 2 }}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1, // ~5px gap
                                            padding: "10px 0",
                                        }}
                                    >
                                        {row.imageUrl ? (
                                            <img
                                                src={row.imageUrl}
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
                                        <Typography variant="body1">{row.bankName}</Typography>
                                    </Box>
                                </StyledTableCell>
                                {/* Actions */}
                                <StyledTableCell align="center">
                                    <Button
                                        startIcon={<EditIcon />}
                                        variant="contained"
                                        color="primary"
                                        sx={{ mr: 1 }}
                                        onClick={() => { dispatch(openModalEditBank(row.id)) }}
                                    >
                                        Sửa
                                    </Button>
                                    <Button
                                        startIcon={<DeleteIcon />}
                                        variant="contained"
                                        color="error"
                                        onClick={() => { dispatch(deleteBankRequest({id: row.id,searchParams: bankSearchParams})) }}
                                    >
                                        Xóa
                                    </Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
            <Stack spacing={2}>
                <Pagination
                    variant="outlined"
                    color="primary"
                    count={bankListDataPaging.totalPages}
                    showFirstButton
                    showLastButton
                    onChange={handleChangePage}
                    page={pageNum} />
            </Stack>
            <Modal
                open={modalAddBank}
                onClose={() => { dispatch(closeModalAddBank()) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <AddBank />
            </Modal>
            <Modal
                open={modalEditBank}
                onClose={() => { dispatch(closeModalEditBank()) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <EditBank />
            </Modal>
        </div>
    )
}

export default BankListPage;