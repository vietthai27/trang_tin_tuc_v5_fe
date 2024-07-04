import { useDispatch, useSelector } from "react-redux";
import { newsDetailRequest } from "./redux";
import { useEffect, useRef, useState } from "react";
import parse from 'html-react-parser';
import { useParams } from "react-router-dom";

function NewsDetailPage() {

    const dispatch = useDispatch()

    const { id } = useParams()

    const data = useSelector(state => state.newsDetail.newsDetail)

    useEffect(() => {
        dispatch(newsDetailRequest(id))
    }, [])

    const [view, setView] = useState(1)

    // Ref for the element you want to observe
    const targetRef = useRef(null);

    // State to keep track of visibility
    const [isVisible, setIsVisible] = useState(false);

    // Function to call when the div is visible
    const onVisible = () => {
        setView(view + 1);
    };

    useEffect(() => {
        // ... rest of the observer setup

        let timeoutId;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Set a timeout and store its ID
                        timeoutId = setTimeout(() => {
                            setIsVisible(true);
                            onVisible();
                        }, 2000);
                    } else {
                        setIsVisible(false);
                        // Clear the timeout if the element is not visible
                        clearTimeout(timeoutId);
                    }
                });
            },
            { threshold: 0.1 }
        );

        // ... rest of the observer setup
        const target = targetRef.current;
        if (target) {
            observer.observe(target);
        }

        // Cleanup observer and timeout on unmount
        return () => {
            if (target) {
                observer.unobserve(target);
            }
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <div className="news-detail-container">
            <h1>{data.tenBaiBao}</h1>
            <i>{data.tieuDe}</i>
            <div className="news-detail-container-info">
                <b>Tác giả: {data.tacGia}</b>
                <b>Ngày đăng: {data.ngayDang}</b>
            </div>

            {parse(data.noiDung)}
            <div className="view" ref={targetRef}>view: {view}</div>
        </div>
    );
}

export default NewsDetailPage;