import { useDispatch, useSelector } from "react-redux";
import { newsDetailRequest } from "./redux";
import { useEffect } from "react";
import parse from 'html-react-parser';
import { useParams } from "react-router-dom";

function NewsDetailPage() {

    const dispatch = useDispatch()

    const { id } = useParams()

    const data = useSelector(state => state.newsDetail.newsDetail)

    useEffect(() => {
        dispatch(newsDetailRequest(id))
    }, [])

    console.log(data);


    return (
        <div className="news-detail-container">
            <h1>{data.tenBaiBao}</h1>
            <i>{data.tieuDe}</i>
            <div className="news-detail-container-info">
                <b>Tác giả: {data.tacGia}</b>
                <b>Ngày đăng: {data.ngayDang}</b>
            </div>

            {parse(data.noiDung)}
        </div>
    );
}

export default NewsDetailPage;