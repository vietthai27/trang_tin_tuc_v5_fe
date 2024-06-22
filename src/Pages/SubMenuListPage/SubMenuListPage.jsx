import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Box, Button, IconButton, InputBase, Modal, Pagination, Paper, Stack, Table, TableBody, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { StyledTableCell, StyledTableRow, menuModal } from "../../StyleConfig";
import { useNavigate, useParams } from "react-router-dom";
import { addSubMenuListRequest, chageItemId, changePageNum, changeSearch, changeSubMenuItem, deleteSubMenuListRequest, editSubMenuListRequest, getSubMenuListRequest } from "./redux";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { toast } from "react-toastify";

const SubMenuListPage = () => {

    let { tenDanhMuc, idCha } = useParams();

    const dispatch = useDispatch()

    const { search, pageNum, pageSize } = useSelector(state => state.subMenuList)

    const subMenuListData = useSelector(state => state.subMenuList.subMenuListData)

    const subMenuListDataPaging = useSelector(state => state.subMenuList.subMenuListDataPaging)

    const listSubMenuItem = useSelector(state => state.subMenuList.listSubMenuItem)

    const itemId = useSelector(state => state.subMenuList.itemId)

    const subMenuSearchParams = {
        id: idCha,
        search: search,
        pageNum: pageNum,
        pageSize: pageSize
    }

    useEffect(() => {
        dispatch(getSubMenuListRequest(subMenuSearchParams))
    }, [pageNum])

    const handleChangePage = (event, newPage) => {
        dispatch(changePageNum(newPage))
    };

    const handelSearch = () => {
        dispatch(changePageNum(1))
        dispatch(getSubMenuListRequest(subMenuSearchParams))
    }

    const handelAddMenuList = () => {
       
        if (listSubMenuItem === null || listSubMenuItem === '') {
           toast.warn("Chưa nhập dữ liệu")
        } else {
            handleCloseAdd()
            dispatch(addSubMenuListRequest({ idCha: idCha, listSubMenuItem: listSubMenuItem, ...subMenuSearchParams }))
        }  
    }

    const handelEditMenuList = () => {
       
        if (listSubMenuItem === null || listSubMenuItem === '') {
            toast.warn("Chưa nhập dữ liệu")
        } else {
            handleCloseEdit()
            dispatch(editSubMenuListRequest({ itemId: itemId, idCha: idCha, listSubMenuItem: listSubMenuItem, ...subMenuSearchParams }))
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
            <h1>Quản lý danh mục: {tenDanhMuc}</h1>
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
                            <StyledTableCell align="center"> <Button startIcon={<AddIcon />} color='primary' variant='contained' onClick={() => {
                                handleOpenAdd()
                            }}>Thêm</Button></StyledTableCell>
                            <StyledTableCell align="center">
                                <Button color='error' variant='contained' endIcon={<ArrowForwardIosIcon />} onClick={() => {
                                    navigate("/menuList")
                                }}>Trở về</Button>
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {subMenuListData.map((row) => (
                            <StyledTableRow hover key={row.tenDanhMuc}>
                                <StyledTableCell align="center">{row.tenDanhMuc}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <Button color='warning' variant='contained' startIcon={<EditIcon />} onClick={() => {
                                        dispatch(changeSubMenuItem(row.tenDanhMuc));
                                        dispatch(chageItemId(row.id));
                                        handleOpenEdit()

                                    }}>Sửa</Button>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <Button color='error' variant='contained' startIcon={<DeleteIcon />} onClick={() => {
                                        dispatch(deleteSubMenuListRequest({ id: row.id, ...subMenuSearchParams }))
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
                    count={subMenuListDataPaging.totalPages}
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
                    <h1>Thêm mới danh mục con</h1>
                    <TextField onChange={(e) => { dispatch(changeSubMenuItem(e.target.value)) }} variant="outlined" placeholder="Nhập tên danh mục con" />
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
                    <h1>Sửa danh mục con</h1>
                    <TextField onChange={(e) => { dispatch(changeSubMenuItem(e.target.value)) }} variant="outlined" placeholder={listSubMenuItem} />
                    <Button onClick={() => {
                        handelEditMenuList()
                    }} style={{ width: "100px" }} variant="contained" color="primary">Sửa</Button>
                </Box>
            </Modal>
        </div>
    )
}

export default SubMenuListPage