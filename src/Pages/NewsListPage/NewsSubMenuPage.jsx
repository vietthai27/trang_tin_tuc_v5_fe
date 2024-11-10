import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { changePageNumSubmenu, getNewsBySubMenuRequeset } from "./redux"
import { useNavigate, useParams } from "react-router-dom"
import { IconButton, InputBase, Pagination, Paper, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const NewsSubMenuPage = () => {

    const { id, subMenu } = useParams()

    useEffect(() => {
        dispatch(getNewsBySubMenuRequeset({
            id: id,
            pageNum: pageNumSubmenu,
            pageSize: pageSize
        }))
    }, [id])

    const dispatch = useDispatch()

    const { newsListBySubMenuPaging, newsListBySubMenu, pageNumSubmenu, pageSize } = useSelector(state => state.newsList)

    const handleChangePage = (event, newPage) => {
        dispatch(changePageNumSubmenu(newPage))
    };

    const navigate = useNavigate()

    return (
        <div className='user-list-page'>
            <h1>{subMenu}</h1>
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Tìm kiếm"
                    inputProps={{ 'aria-label': 'Tìm kiếm' }}
                    onChange={(e) => {
                        //dispatch(changeSearch(e.target.value))
                    }}
                />
                <IconButton
                    type="button" sx={{ p: '10px' }}
                    aria-label="search"
                    onClick={() => {
                        //handelSearch() 
                    }}>
                    <SearchIcon />
                </IconButton>
            </Paper>

            {newsListBySubMenu.map((item) => (
                <div className="news-tab" onClick={() => { navigate("/newsDetail/" + item.id) }}>
                    <div className="news-tab-row-1">
                        <img src={item.thumbnail} alt="thumbnail" />
                        <b>{item.tenBaiBao}</b>

                    </div>
                    <div className="news-tab-row-1">
                        <p>Ngày đăng: {item.ngayDang.substring(0, 11)}</p>
                        <p>Lượt xem: {item.luotXem}</p>
                        <i>Tác giả: {item.tacGia}</i>
                    </div>

                </div>
            ))}

            <Stack spacing={2}>
                <Pagination
                    variant="outlined"
                    color="primary"
                    count={newsListBySubMenuPaging.totalPages}
                    showFirstButton
                    showLastButton
                    onChange={handleChangePage}
                    page={pageNumSubmenu} />
            </Stack>
        </div>
    )
}

export default NewsSubMenuPage