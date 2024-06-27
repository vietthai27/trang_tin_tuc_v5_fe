import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, IconButton, InputBase, Pagination, Paper, Stack, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import { StyledTableCell, StyledTableRow } from '../../StyleConfig';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { changePageNum, changeSearch, deleteNewsRequest, getSubMenuRequeset, searchNewsRequest } from './redux';
import { useNavigate } from 'react-router-dom';

function NewsListPage() {

    const dispatch = useDispatch()
    const newsListData = useSelector(state => state.newsList.newsListData)
    const newsListDataPaging = useSelector(state => state.newsList.newsListDataPaging)
    const { search, pageNum, pageSize } = useSelector(state => state.newsList)

    const newsSearchParams = {
        search: search,
        pageNum: pageNum,
        pageSize: pageSize
    }

    const naviage = useNavigate()

    useEffect(() => {
        dispatch(searchNewsRequest({
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
        dispatch(searchNewsRequest(newsSearchParams))
    }

    return (
        <div className='user-list-page'>
            <h1>Quản lý bài báo</h1>
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Tìm kiếm"
                    inputProps={{ 'aria-label': 'Tìm kiếm' }}
                    onChange={(e) => {
                        dispatch(changeSearch(e.target.value))
                    }}
                />
                <IconButton
                    type="button" sx={{ p: '10px' }}
                    aria-label="search"
                    onClick={() => { handelSearch() }}>
                    <SearchIcon />
                </IconButton>
            </Paper>
            <TableContainer sx={{ maxWidth: "1000px", height: "390px" }} component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Tên bài báo</StyledTableCell>
                            <StyledTableCell align="center">Tác giả</StyledTableCell>
                            <StyledTableCell align="center">Lượt xem</StyledTableCell>
                            <StyledTableCell align="center">Thao tác</StyledTableCell>
                            <StyledTableCell align="center">
                                <Button color='primary' variant='contained' startIcon={<AddIcon />} onClick={() => {
                                    naviage("/addNewsPaperList")
                                }}>Thêm</Button>
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {newsListData.map((row) => (
                            <StyledTableRow hover key={row.username}>
                                <StyledTableCell align="center"><p className='user-list-page-name'>{row.tenBaiBao}</p></StyledTableCell>
                                <StyledTableCell align="center">{row.tacGia}</StyledTableCell>
                                <StyledTableCell align="center">{row.luotXem}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <Button startIcon={<EditIcon />} color='warning' variant='contained' onClick={() => {
                                        naviage("/editNewsPaperList/" + row.id)
                                    }}>Sửa</Button>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <Button startIcon={<DeleteIcon />} color='error' variant='contained' onClick={() => {
                                        dispatch(deleteNewsRequest({id: row.id,...newsSearchParams}))
                                    
                                    }}>Xóa</Button>
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
                    count={newsListDataPaging.totalPages}
                    showFirstButton
                    showLastButton
                    onChange={handleChangePage}
                    page={pageNum} />
            </Stack>
        </div>
    );
}

export default NewsListPage;