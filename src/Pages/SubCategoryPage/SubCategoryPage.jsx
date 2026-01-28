import { useNavigate, useParams } from "react-router-dom";
import { addSubCategoryRequest, changePageNum, changeSearch, closeModalAdd, closeModalEdit, deleteSubCategoryRequest, editSubCategoryRequest, getIdSubCategoryRequest, getSubCategoryListRequest, openModalAdd } from "./reducer";
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
    TextField,
    Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paging from "../../Components/Paging/Paging";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddSubCategoryModal from "./AddCategoryModal";
import EditSubCategoryModal from "./EditCategoryModal";

export default function SubCategoryPage() {

    const dispatch = useDispatch();

    const {
        search,
        pageNum,
        pageSize,
        subCategoryList,
        subCategoryById,
        modalAdd,
        modalEdit
    } = useSelector(state => state.subCategoryPage);

       const {
        categoryById
    } = useSelector(state => state.categoryPage);

    const totalPages = subCategoryList?.totalPages || 0;

    // local state cho ô input (tránh gọi API liên tục)
    const [searchInput, setSearchInput] = useState(search);

    const { id } = useParams();

    // gọi API khi page/search/pageSize đổi
    useEffect(() => {
        dispatch(getSubCategoryListRequest({
            search,
            id,
            pageNum,
            pageSize
        }));
    }, [dispatch, search, pageNum, pageSize, id]);

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
        dispatch(getIdSubCategoryRequest(id))
    }

    const navigate = useNavigate();

    return (
        <Box p={3}>
            {/* SEARCH BAR */}
            <Box
                mb={2}
                display="flex"
                gap={1}
                alignItems="center"
                justifyContent="space-between"
            >
                <TextField
                    size="small"
                    label="Nhập tên quản lý"
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

            <Typography variant="h6" mb={2} textAlign="center">
                Danh mục: {categoryById.name}
            </Typography>

            {/* TABLE */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Tên</TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="warning"
                                    onClick={() => { dispatch(openModalAdd()) }}
                                >
                                    Thêm
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Button variant="outlined" onClick={() => navigate(-1)}>
                                    Trở về
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {subCategoryList?.content?.length > 0 ? (
                            subCategoryList.content.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell align="right">
                                        <EditIcon
                                            onClick={() => { handelOpenEdit(row.id) }}
                                            sx={{ color: 'green' }}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <DeleteIcon
                                            onClick={() => { dispatch(deleteSubCategoryRequest({id: row.id, categoryId: id})) }}
                                            sx={{ color: 'red' }}
                                        />
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
            <AddSubCategoryModal
                open={modalAdd}
                onClose={() => dispatch(closeModalAdd())}
                onSubmit={(payload) =>
                    dispatch(addSubCategoryRequest({
                        ...payload,
                        listParams: { search, pageNum, pageSize, id }
                    }))
                }
            />

            <EditSubCategoryModal
                open={modalEdit}
                onClose={() => dispatch(closeModalEdit())}
                data={subCategoryById}
                onSubmit={(payload) =>
                    dispatch(editSubCategoryRequest({
                        ...payload,
                        listParams: { search, pageNum, pageSize, id }
                    }))
                }
            />
        </Box>
    );
}
