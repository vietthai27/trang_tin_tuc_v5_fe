import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePageNum, changeSearch, deleteModerRoleRequest, deleteUserRequest, searchUserRequest, setModerRoleRequest } from './redux';
import { Button, IconButton, InputBase, Pagination, Paper, Stack, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import { StyledTableCell, StyledTableRow } from '../../StyleConfig';
import SearchIcon from '@mui/icons-material/Search';

function UserList() {

    const dispatch = useDispatch()
    const userListData = useSelector(state => state.userList.userListData)
    const userListDataPaging = useSelector(state => state.userList.userListDataPaging)
    const { search, pageNum, pageSize } = useSelector(state => state.userList)

    const userSearchParams = {
        search: search,
        pageNum: pageNum,
        pageSize: pageSize
    }

    useEffect(() => {
        dispatch(searchUserRequest({
            search: search,
            pageNum: pageNum,
            pageSize: pageSize
        }))
    }, [pageNum])

    const handleChangePage = (event, newPage) => {
        dispatch(changePageNum(newPage))
    };

    const handelSearch = () => {
        dispatch(changePageNum(1))
        dispatch(searchUserRequest(userSearchParams))
    }

    return (
        <div className='user-list-page'>
            <h1>Quản lý người dùng</h1>
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}
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
            <TableContainer sx={{ maxWidth: "700px", height:"378px" }} component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Tên người dùng</StyledTableCell>
                            <StyledTableCell align="center">Email</StyledTableCell>
                            <StyledTableCell align="center">Quyền MODER</StyledTableCell>
                            <StyledTableCell align="center">Thao tác</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userListData.map((row) => (
                            <StyledTableRow hover key={row.username}>
                                <StyledTableCell align="center">{row.username}</StyledTableCell>
                                <StyledTableCell align="center">{row.email}</StyledTableCell>
                                <StyledTableCell align="center">{
                                    row.hasModerRole === true ?
                                        <Button color='error' variant='contained' onClick={() => {
                                            dispatch(deleteModerRoleRequest({
                                                id: row.id,
                                                pageNum: pageNum,
                                                pageSize: pageSize,
                                                search: search
                                            }))
                                        }}>Hủy quyền</Button> :
                                        <Button color='primary' variant='contained' onClick={() => {
                                            dispatch(setModerRoleRequest({
                                                id: row.id,
                                                pageNum: pageNum,
                                                pageSize: pageSize,
                                                search: search
                                            }))
                                        }}>Đặt quyền</Button>
                                }
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <Button
                                        variant='contained'
                                        color='error'
                                        onClick={() => {
                                            dispatch(deleteUserRequest({
                                                id: row.id,
                                                pageNum: pageNum,
                                                pageSize: pageSize,
                                                search: search
                                            }))
                                        }}
                                    >Xóa</Button>
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
                    count={userListDataPaging.totalPages}
                    showFirstButton
                    showLastButton
                    onChange={handleChangePage}
                    page={pageNum} />
            </Stack>
        </div>
    );
}

export default UserList;