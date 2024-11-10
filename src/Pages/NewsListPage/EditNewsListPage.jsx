import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import JoditEditor from 'jodit-react';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editNewsRequest, getSubMenuRequeset } from './redux';
import { useNavigate, useParams } from 'react-router-dom';
import { changIdChaEdit, changeIdConEdit, changeNoiDungEdit, changeTenBaiBaoEdit, changeThumbnailEdit, changeTieuDeEdit, newsDetailRequest } from '../NewsDetailPage/redux';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EditIcon from '@mui/icons-material/Edit';


const EditNewsListPage = ({idBaiBao}) => {

    const editor = useRef(null);



    // const { id } = useParams()

    const data = useSelector(state => state.newsDetail.newsDetail)

    const dispatch = useDispatch()
    const handleChangeIdCha = (event) => {
        dispatch(changIdChaEdit(event.target.value))
    };
    const handleChangeIdCon = (event) => {
        dispatch(changeIdConEdit(event.target.value))
    };

    const danhMucBaiBao = useSelector(state => state.menu.danhMucBaiBao)
    const subMenu = useSelector(state => state.newsList.subMenu)

    useEffect(() => {
        dispatch(newsDetailRequest(idBaiBao))
    }, [])

    useEffect(() => {
        dispatch(getSubMenuRequeset(data.danhMucChaId))
    }, [data.danhMucChaId])

    const currentUsername = useSelector(state => state.app.username)

    const editBaiBaoParam = {
        id: data.id,
        idCon: data.danhMucConId,
        tenBaiBao: data.tenBaiBao,
        tieuDe: data.tieuDe,
        thumbnail: data.thumbnail,
        noiDung: data.noiDung,
        tacGia: currentUsername
    }

    const navigate = useNavigate()

    const { search, pageNum, pageSize } = useSelector(state => state.newsList)

    const newsSearchParams = {
        search: search,
        pageNum: pageNum,
        pageSize: pageSize
    }

    const handelEditBaiBao = () => {
        dispatch(editNewsRequest({ editParam: editBaiBaoParam, searchParams: newsSearchParams }))
        //dispatch(searchNewsRequest(newsSearchParams))
        navigate("/manageSystem")
    }

    return (
        <div className='news-list-modify-container'>
            <h1>Sửa bài báo</h1>
            <div className='news-list-modify-flex'>
                <TextField fullWidth onChange={(e) => {
                    dispatch(changeTenBaiBaoEdit(e.target.value))
                }} variant="outlined" label={"Nhập tên bài báo"}
                    value={data.tenBaiBao}
                />
                <TextField fullWidth onBlur={(e) => {
                    dispatch(changeThumbnailEdit(e.target.value))
                }} variant="outlined" placeholder={"Kéo ảnh Thumnail vào đây"} value={data.thumbnail} />
            </div>

            <div style={{ width: '800px', margin: 'auto' }}>
                <TextField fullWidth onChange={(e) => {
                    dispatch(changeTieuDeEdit(e.target.value))
                }} variant="outlined" label={"Nhập tiêu đề bài báo"} value={data.tieuDe} />
            </div>

            <div className='news-list-modify-flex'>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Danh Mục</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={data.danhMucChaId}
                        label="Danh Mục"
                        onChange={handleChangeIdCha}
                        defaultValue={data.danhMucChaId}
                    >
                        {danhMucBaiBao.map((item) => (
                            <MenuItem value={item.id}>{item.tenDanhMuc}</MenuItem>
                        ))}

                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-con-label">Danh Mục Con</InputLabel>
                    <Select
                        labelId="demo-simple-select-con-label"
                        id="demo-simple-con-select"
                        value={data.danhMucConId}
                        label="Danh Mục Con"
                        onChange={handleChangeIdCon}
                        defaultValue={data.danhMucConId}
                    >
                        {subMenu.map((item) => (
                            <MenuItem value={item.id}>{item.tenDanhMucCon}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <div style={{ width: '800px', margin: 'auto' }}>
                <JoditEditor
                    ref={editor}
                    value={data.noiDung}
                    onBlur={newContent => dispatch(changeNoiDungEdit(newContent))}
                />
            </div>
            <div style={{ display: 'flex', width: '100%', justifyContent: 'center', margin: '20px', gap: '20px' }}>
                <Button startIcon={<EditIcon />} onClick={() => { handelEditBaiBao() }} variant='contained'>Sửa bài báo</Button>
            </div>

        </div>
    )
}

export default EditNewsListPage