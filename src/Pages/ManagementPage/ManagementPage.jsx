import {
    Box,
    Button,
    Checkbox,
    Modal,
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
import { addManagementRequest, changePageNum, changeSearch, closeModalAdd, closeModalEdit, deleteManagementRequest, editManagementRequest, getIdManagementRequest, getManagementListRequest, getRoleListRequest, openModalAdd, openModalEdit } from "./reducer";
import Paging from "../../Components/Paging/Paging";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddManagementModal from "./AddManagementModal";
import EditManagementModal from "./EditManagementModal";

export default function ManagementPage() {

    const dispatch = useDispatch();

    const {
        managementList,
        search,
        pageNum,
        pageSize,
        roleList,
        modalAdd,
        modalEdit,
        managementById
    } = useSelector(state => state.managementPage);

    const totalPages = managementList?.totalPages || 0;

    // local state cho ô input (tránh gọi API liên tục)
    const [searchInput, setSearchInput] = useState(search);

    // gọi API khi page/search/pageSize đổi
    useEffect(() => {
        dispatch(getManagementListRequest({
            search,
            pageNum,
            pageSize
        }));
    }, [dispatch, search, pageNum, pageSize]);

    useEffect(() => {
        dispatch(getRoleListRequest())
    }, [])

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
        dispatch(getIdManagementRequest(id))
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
                            <TableCell>Role</TableCell>
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
                        {managementList?.content?.length > 0 ? (
                            managementList.content.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.rolesManage.map(role => (
                                        <Typography>{role.roleName}</Typography>
                                    ))}</TableCell>
                                    <TableCell>
                                        <Box
                                            display="flex"
                                            gap={1}
                                            alignItems="center"
                                            justifyContent="space-between"
                                        >
                                            <EditIcon onClick={() => { handelOpenEdit(row.id) }} sx={{ color: 'green' }} />
                                            <DeleteIcon onClick={() => { dispatch(deleteManagementRequest(row.id)) }} sx={{ color: 'red' }} />
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
            <AddManagementModal
                open={modalAdd}
                onClose={() => dispatch(closeModalAdd())}
                roleList={roleList}
                onSubmit={(payload) =>
                    dispatch(addManagementRequest({
                        ...payload,
                        listParams: { search, pageNum, pageSize }
                    }))
                }
            />

            <EditManagementModal
                open={modalEdit}
                onClose={() => dispatch(closeModalEdit())}
                roleList={roleList}
                data={managementById}
                onSubmit={(payload) =>
                    dispatch(editManagementRequest({
                        ...payload,
                        listParams: { search, pageNum, pageSize }
                    }))
                }
            />

        </Box>
    );
}
