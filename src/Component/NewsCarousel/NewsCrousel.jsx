import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { requestNewsCarousel } from "../../Pages/NewsDetailPage/redux"
import { Carousel } from "react-bootstrap"

const NewsCarosel = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(requestNewsCarousel())
    }, [])

    const newsCarousel = useSelector(state => state.newsDetail.newCarousel)

    return (
        <div className="news-carousel-container">

        <h1>Bài báo mới nhất</h1>

            <Carousel fade>
                {newsCarousel.map((item) => (
                    <Carousel.Item>
                        <img src={item.thumbnail} />
                        <Carousel.Caption>
                            <h3>{item.tenBaiBao}</h3>
                            <p>{item.tieuDe}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}

            </Carousel>
        </div>
    )
}

export default NewsCarosel