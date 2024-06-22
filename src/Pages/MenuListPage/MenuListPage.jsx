import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addMenuListRequest, chageItemId, changeMenuItem, changePageNum, changeSearch, deleteMenuListRequest, editMenuListRequest, getMenuListRequest } from "./redux"
import { Box, Button, IconButton, InputBase, Modal, Pagination, Paper, Stack, Table, TableBody, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { StyledTableCell, StyledTableRow, menuModal } from "../../StyleConfig";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { toast } from "react-toastify";

const MenuListPage = () => {

    const dispatch = useDispatch()

    const { search, pageNum, pageSize } = useSelector(state => state.menuList)

    const menuListData = useSelector(state => state.menuList.menuListData)

    const menuListDataPaging = useSelector(state => state.menuList.menuListDataPaging)

    const listMenuItem = useSelector(state => state.menuList.listMenuItem)

    const itemId = useSelector(state => state.menuList.itemId)

    const menuSearchParams = {
        search: search,
        pageNum: pageNum,
        pageSize: pageSize
    }

    useEffect(() => {
        dispatch(getMenuListRequest(menuSearchParams))
    }, [pageNum])

    const handleChangePage = (event, newPage) => {
        dispatch(changePageNum(newPage))
    };

    const handelSearch = () => {
        dispatch(changePageNum(1))
        dispatch(getMenuListRequest(menuSearchParams))
    }

    const handelAddMenuList = () => {

        if (listMenuItem === null || listMenuItem === '') {
            toast.warn("Chưa nhập dữ liệu")
        } else {
            handleCloseAdd()
            dispatch(addMenuListRequest({ listMenuItem: listMenuItem, ...menuSearchParams }))
        }

    }

    const handelEditMenuList = () => {

        if (listMenuItem === null || listMenuItem === '') {
            toast.warn("Chưa nhập dữ liệu")
        } else {
            handleCloseEdit()
            dispatch(editMenuListRequest({ id: itemId, listMenuItem: listMenuItem, ...menuSearchParams }))
        }

    }

    const [openAdd, setOpenAdd] = React.useState(false);
    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    const [openEdit, setOpenEdit] = React.useState(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    const navigate = useNavigate()

    return (
        <div className='user-list-page'>
            <h1>Quản lý danh mục</h1>
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
            <TableContainer sx={{ maxWidth: "700px", height: "390px" }} component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Tên danh mục</StyledTableCell>
                            <StyledTableCell align="center"></StyledTableCell>
                            <StyledTableCell align="center"></StyledTableCell>
                            <StyledTableCell align="center">
                                <Button color='primary' variant='contained' startIcon={<AddIcon />} onClick={() => {
                                    handleOpenAdd()
                                }}>Thêm</Button>
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {menuListData.map((row) => (
                            <StyledTableRow hover key={row.tenDanhMuc}>
                                <StyledTableCell align="center">{row.tenDanhMuc}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <Button startIcon={<MenuOpenIcon />} color='success' variant='contained' onClick={() => {
                                        navigate(`/subMenuList/${row.id}/${row.tenDanhMuc}`)
                                    }}>Danh mục con</Button>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <Button startIcon={<EditIcon />} color='warning' variant='contained' onClick={() => {
                                        dispatch(changeMenuItem(row.tenDanhMuc)); dispatch(chageItemId(row.id)); handleOpenEdit()
                                    }}>Sửa</Button>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <Button startIcon={<DeleteIcon />} color='error' variant='contained' onClick={() => {
                                        dispatch(deleteMenuListRequest({ id: row.id, ...menuSearchParams }))
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
                    count={menuListDataPaging.totalPages}
                    showFirstButton
                    showLastButton
                    onChange={handleChangePage}
                    page={pageNum} />
            </Stack>
            <Modal
                open={openAdd}
                onClose={handleCloseAdd}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={menuModal}>
                    <h1>Thêm mới danh mục</h1>
                    <TextField onChange={(e) => { dispatch(changeMenuItem(e.target.value)) }} variant="outlined" placeholder="Nhập tên danh mục" />
                    <Button onClick={() => { handelAddMenuList() }} style={{ width: "100px" }} variant="contained" color="primary">Thêm mới</Button>
                </Box>
            </Modal>
            <Modal
                open={openEdit}
                onClose={handleCloseEdit}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={menuModal}>
                    <h1>Sửa danh mục</h1>
                    <TextField onChange={(e) => { dispatch(changeMenuItem(e.target.value)) }} variant="outlined" placeholder={listMenuItem} />
                    <Button onClick={() => { handelEditMenuList() }} style={{ width: "100px" }} variant="contained" color="primary">Sửa</Button>
                </Box>
            </Modal>
        </div>
    )
}

export default MenuListPage