import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { requestNewsCarousel } from "../../Pages/NewsDetailPage/redux"
import { Carousel } from "react-bootstrap"
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { useNavigate } from "react-router-dom";

const NewsCarosel = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(requestNewsCarousel())
    }, [])

    const newsCarousel = useSelector(state => state.newsDetail.newCarousel)

    return (
        <div className="news-carousel-container">

        <h1>Bài báo mới nhất</h1>

            <Carousel 
            prevIcon={<SkipPreviousIcon className="carousel-button"/>}
            nextIcon={<SkipNextIcon className="carousel-button"/>}
             fade>
                {newsCarousel.map((item) => (
                    <Carousel.Item onClick={() => {navigate("/newsDetail/" + item.id)}}>
                        <img src={item.thumbnail} />
                        <Carousel.Caption>
                            <h3 className="carousel-caption-text">{item.tenBaiBao}</h3>
                            <p className="carousel-caption-text">{item.tieuDe}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}

            </Carousel>
        </div>
    )
}

export default NewsCarosel