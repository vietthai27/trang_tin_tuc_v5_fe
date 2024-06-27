import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import JoditEditor from 'jodit-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewsRequest, changeAddContent, changeIdCha, changeIdCon, changeTenBaiBao, changeThumbnail, changeTieuDe, getSubMenuRequeset, searchNewsRequest } from './redux';
import { useNavigate } from 'react-router-dom';

const AddNewsListPage = () => {

    const editor = useRef(null);

    const dispatch = useDispatch()
    const handleChangeIdCha = (event) => {
        dispatch(changeIdCha(event.target.value))
    };
    const handleChangeIdCon = (event) => {
        dispatch(changeIdCon(event.target.value))
    };

    const danhMucBaiBao = useSelector(state => state.menu.danhMucBaiBao)
    const idCha = useSelector(state => state.newsList.idCha)
    const subMenu = useSelector(state => state.newsList.subMenu)
    const idCon = useSelector(state => state.newsList.idCon)
    const addContent = useSelector(state => state.newsList.addContent)

    const { tenBaiBao, tieuDe, thumbnail, } = useSelector(state => state.newsList)
    useEffect(() => {
        dispatch(getSubMenuRequeset(idCha))
    }, [idCha])

    const currentUsername = useSelector(state => state.app.username)
    const addBaiBaoParam = {
        idCon: idCon,
        tenBaiBao: tenBaiBao,
        tieuDe: tieuDe,
        thumbnail: thumbnail,
        noiDung: addContent,
        luotXem: 0,
        tacGia: currentUsername
    }

    const navigate = useNavigate()

    const { search, pageNum, pageSize } = useSelector(state => state.newsList)

    const newsSearchParams = {
        search: search,
        pageNum: pageNum,
        pageSize: pageSize
    }

    const handelAddBaiBao = () => {
        dispatch(addNewsRequest({addParam:addBaiBaoParam,searchParam:newsSearchParams}))
        //dispatch(searchNewsRequest(newsSearchParams))
        navigate("/newsPaperList")
    }

    return (
        <div className='news-list-modify-container'>
            <h1>Thêm mới bài báo</h1>
            <div className='news-list-modify-flex'>
                <TextField fullWidth onChange={(e) => {
                    dispatch(changeTenBaiBao(e.target.value))
                }} variant="outlined" label={"Nhập tên bài báo"} />
                <TextField fullWidth onBlur={(e) => {
                    dispatch(changeThumbnail(e.target.value))
                }} variant="outlined" placeholder={"Kéo ảnh Thumnail vào đây"} />
            </div>

            <div style={{ width: '50%', margin: 'auto' }}>
                <TextField fullWidth onChange={(e) => {
                    dispatch(changeTieuDe(e.target.value))
                }} variant="outlined" label={"Nhập tiêu đề bài báo"} />
            </div>

            <div className='news-list-modify-flex'>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Danh Mục</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={idCha}
                        label="Danh Mục"
                        onChange={handleChangeIdCha}
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
                        value={idCon}
                        label="Danh Mục Con"
                        onChange={handleChangeIdCon}
                    >
                        {subMenu.map((item) => (
                            <MenuItem value={item.id}>{item.tenDanhMucCon}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <div style={{ width: '50%', margin: 'auto' }}>
                <JoditEditor
                    ref={editor}
                    value={addContent}
                    onBlur={newContent => dispatch(changeAddContent(newContent))}
                />
            </div>
            <div style={{ display: 'flex', width: '100%', justifyContent: 'center', margin: '20px', gap:'20px' }}>
                <Button onClick={() => { handelAddBaiBao() }} variant='contained'>Thêm bài báo</Button>
                <Button onClick={() => { navigate("/newsPaperList") }} color='error' variant='contained'>Quay về</Button>
            </div>

        </div>
    )
}

export default AddNewsListPage