import {
    Box,
    Button,
    Paper,
    Switch,
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
import { changeModerRoleRequest, changePageNum, changeSearch, getUserListRequest } from "./reducer";
import Paging from "../../Components/Paging/Paging";

export default function UserPage() {

    const dispatch = useDispatch();

    const {
        userList,
        search,
        pageNum,
        pageSize
    } = useSelector(state => state.userPage);

    const totalPages = userList?.totalPages || 0;

    // local state cho ô input (tránh gọi API liên tục)
    const [searchInput, setSearchInput] = useState(search);

    // gọi API khi page/search/pageSize đổi
    useEffect(() => {
        dispatch(getUserListRequest({
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

    const checkHasModerRole = (roles = []) => {
        return roles.includes("MODER");
    };

    const handleChangeModer = (isModer, userId) => {
        dispatch(
            changeModerRoleRequest({
                setModer: isModer,
                userId: userId
            })
        );
    };

    return (
        <Box p={3}>
            {/* SEARCH BAR */}
            <Box
                mb={2}
                display="flex"
                gap={2}
                alignItems="center"
                justifyContent="space-between"
            >
                <TextField
                    size="small"
                    label="Nhập username"
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
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Moder</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {userList?.content?.length > 0 ? (
                            userList.content.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.username}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell><Switch
                                        checked={checkHasModerRole(row.roles)}
                                        onChange={(e) => handleChangeModer(e.target.checked, row.id)}
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
        </Box>
    );
}
