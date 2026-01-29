import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategoryRequest, changePageNum, changeSearch, closeModalAdd, closeModalEdit, deleteCategoryRequest, editCategoryRequest, getIdCategoryRequest, getCategoryListRequest, openModalAdd} from "./reducer";
import Paging from "../../Components/Paging/Paging";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCategoryModal from "./AddCategoryModal";
import EditCategoryModal from "./EditCategoryModal";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useNavigate } from "react-router-dom";
import { changeCategoryName } from "../SubCategoryPage/reducer";

export default function CategoryPage() {

    const dispatch = useDispatch();

    const {
        categoryList,
        search,
        pageNum,
        pageSize,
        modalAdd,
        modalEdit,
        categoryById
    } = useSelector(state => state.categoryPage);

    const totalPages = categoryList?.totalPages || 0;

    // local state cho ô input (tránh gọi API liên tục)
    const [searchInput, setSearchInput] = useState(search);

    // gọi API khi page/search/pageSize đổi
    useEffect(() => {
        dispatch(getCategoryListRequest({
            search,
            pageNum,
            pageSize
        }));
    }, [dispatch, search, pageNum, pageSize]);


    // click Search
    const handleSearch = () => {
        dispatch(changePageNum(0));
        dispatch(changeSearch(searchInput));
    };

    // đổi trang
    const handlePageChange = (newPageNum) => {
        dispatch(changePageNum(newPageNum));
    };

    const handelOpenEdit = (id) => {
        dispatch(getIdCategoryRequest(id))
    }

    const navigate = useNavigate()

    const handelOpenSubCategory = (id) => {
        navigate('/sub-menu-page/' + id)
    }

    return (
        <Box p={3}>
            {/* SEARCH BAR */}
            <Box
                mb={2}
                display="flex"
                gap={1}
                alignItems="center"
                justifyContent="flex-start"
            >
                <TextField
                    size="small"
                    label="Nhập tên"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <Button
                    variant="contained"
                    onClick={handleSearch}
                >
                    Tìm kiếm
                </Button>
            </Box>

            {/* TABLE */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Tên</TableCell>
                            <TableCell align="right">
                                <Button
                                    variant="contained"
                                    color="warning"
                                    onClick={() => { dispatch(openModalAdd()) }}
                                >
                                    Thêm
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {categoryList?.content?.length > 0 ? (
                            categoryList.content.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.name}</TableCell>                           
                                    <TableCell>
                                        <Box
                                            display="flex"
                                            gap={1}
                                            alignItems="center"
                                            justifyContent="space-between"
                                        >
                                            <FormatListBulletedIcon onClick={() => { handelOpenSubCategory(row.id) }} />
                                            <EditIcon onClick={() => { handelOpenEdit(row.id) }} sx={{ color: 'green' }} />
                                            <DeleteIcon onClick={() => { dispatch(deleteCategoryRequest(row.id)) }} sx={{ color: 'red' }} />
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
            <AddCategoryModal
                open={modalAdd}
                onClose={() => dispatch(closeModalAdd())}
                onSubmit={(payload) =>
                    dispatch(addCategoryRequest({
                        ...payload,
                        listParams: { search, pageNum, pageSize }
                    }))
                }
            />

            <EditCategoryModal
                open={modalEdit}
                onClose={() => dispatch(closeModalEdit())}
                data={categoryById}
                onSubmit={(payload) =>
                    dispatch(editCategoryRequest({
                        ...payload,
                        listParams: { search, pageNum, pageSize }
                    }))
                }
            />

        </Box>
    );
}
