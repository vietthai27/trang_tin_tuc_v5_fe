import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { changePageNum, deleteNewsRequest, getListNewsRequest } from "./reducer";
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import Paging from "../../Components/Paging/Paging";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function NewsManageList() {

    const {
        listNews,
        searchTitle,
        searchDescription,
        pageNum,
        pageSize
    } = useSelector(state => state.newsManagePage);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getListNewsRequest({
            title: searchTitle,
            description: searchDescription,
            pageNum,
            pageSize
        }));
    }, [dispatch, searchTitle, searchDescription, pageNum, pageSize]);



    const totalPages = listNews?.totalPages || 0;

    const handlePageChange = (newPageNum) => {
        dispatch(changePageNum(newPageNum));
    };

    const navigate = useNavigate()

    return (
        <Box p={1}>
            <Typography variant="h5" margin={3} textAlign="center" fontWeight={600}>
                Danh sách bài báo
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Tên</TableCell>
                            <TableCell>Ngày tạo</TableCell>
                            <TableCell>Tác giả</TableCell>
                            <TableCell align="right">
                                <Button
                                    variant="contained"
                                    color="warning"
                                    onClick={() => { navigate('/news-manage-page-add') }}
                                >
                                    Thêm
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {listNews?.content?.length > 0 ? (
                            listNews.content.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell><p style={{ width: '150px', textOverflow: 'ellipsis', overflow: 'hidden', textWrap: 'nowrap', margin: 0 }} v>{row.title}</p></TableCell>
                                    <TableCell> {new Date(row.createdAt).toLocaleDateString("vi-VN")}</TableCell>
                                    <TableCell>{row.writer}</TableCell>
                                    <TableCell>
                                        <Box
                                            display="flex"
                                            gap={1}
                                            alignItems="center"
                                            justifyContent="space-between"
                                        >
                                            <EditIcon
                                                onClick={() => { navigate(`/news-manage-page-edit/${row.id}`) }}
                                                sx={{ color: 'green' }} />
                                            <DeleteIcon
                                                onClick={() => { dispatch(deleteNewsRequest(row.id)) }}
                                                sx={{ color: 'red' }} />
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} align="center">
                                    Không có dữ liệu
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* PAGINATION */}
            <Box mt={3} display="flex" justifyContent="center">
                <Paging
                    page={pageNum}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </Box>
        </Box>
    )
}