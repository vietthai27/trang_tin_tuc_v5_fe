import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteModerRoleRequest, getAllUserRequest, setModerRoleRequest } from './redux';
import { Button, Checkbox, FormControlLabel, FormGroup, Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material';
import { StyledTableCell, StyledTableRow } from '../../StyleConfig';

function UserList() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllUserRequest({
            pageNum: 0,
            pageSize: 2
        }))
    }, [dispatch])

    const handleChangePage = (event, newPage) => {
        dispatch(getAllUserRequest({
            pageNum: newPage - 1,
            pageSize: 2
        }))
    };


    const userListData = useSelector(state => state.userList.userListData)
    const userListDataPaging = useSelector(state => state.userList.userListDataPaging)



    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="right">Tên người dùng</StyledTableCell>
                            <StyledTableCell align="right">Email</StyledTableCell>
                            <StyledTableCell align="right">Quyền MODER</StyledTableCell>
                            <StyledTableCell align="right">Thao tác</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userListData.map((row) => (
                            <StyledTableRow hover key={row.username}>
                                <StyledTableCell align="right">{row.username}</StyledTableCell>
                                <StyledTableCell align="right">{row.email}</StyledTableCell>
                                <StyledTableCell align="right">{
                                    row.hasModerRole === true ?
                                        <Button color='error' variant='contained' onClick={() => {
                                            dispatch(deleteModerRoleRequest({
                                                id: row.id,
                                                pageNum: 0,
                                                pageSize: 2
                                            }))
                                        }}>Hủy quyền</Button> :
                                        <Button color='primary' variant='contained' onClick={() => {
                                            dispatch(setModerRoleRequest({
                                                id: row.id,
                                                pageNum: 0,
                                                pageSize: 2
                                            }))
                                        }}>Đặt quyền</Button>
                                }
                                </StyledTableCell>
                                <StyledTableCell align="right"><Button>Xóa</Button></StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>

            </TableContainer>
            <Stack spacing={2}>
                <Pagination variant="outlined" color="primary" count={userListDataPaging.totalPages} showFirstButton showLastButton onChange={handleChangePage} />
            </Stack>
        </div>
    );
}

export default UserList;