import { useDispatch, useSelector } from "react-redux";
import { newsDetailRequest } from "./redux";
import { useEffect } from "react";
import parse from 'html-react-parser';

function NewsDetailPage() {

    const dispatch = useDispatch()
    
    const data = useSelector(state => state.newsDetail.newsDetail)

    console.log(data);

    

    useEffect(() => {
        dispatch(newsDetailRequest(9))
    }, [])


    return (
        <div >
            {parse(data.noiDung)}
        </div>
    );
}

export default NewsDetailPage;