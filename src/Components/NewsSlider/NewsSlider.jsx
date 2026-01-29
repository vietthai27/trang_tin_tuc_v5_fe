import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useDispatch, useSelector } from 'react-redux';
import { getListLatestNewsRequest } from './reducer';
import { useNavigate } from 'react-router-dom';

function SliderImage({ imageSrc }) {
    return (
        <img style={{ width: '100%', height: '40vh', objectFit: 'cover' }} src={imageSrc} />
    )
}

function NewsSlider() {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getListLatestNewsRequest())
    }, [])

    const { listLatestNews } = useSelector(state => state.latestNews)

    return (
        <Carousel
            style={{
                width: "100%",
                maxWidth: "800px",
                margin: "20px auto"
            }}
            fade
        >
            {listLatestNews.map((e) => (
                <Carousel.Item onClick={() => {navigate("/news-detail/" + e.id)}}>
                    <SliderImage imageSrc={e.thumbnail} />
                    <Carousel.Caption>
                        <Box
                            sx={{
                                position: "absolute",
                                bottom: 0,
                                width: "100%",                 // ✅ full width
                                backgroundColor: "rgba(0,0,0,0.4)", // ✅ transparent overlay
                                color: "white",
                                padding: 2,
                                textAlign: "center",
                            }}
                        >
                            <Typography variant="h5" fontWeight="bold">
                                {e.title}
                            </Typography>

                            <Typography variant="body1">
                                {e.description}
                            </Typography>
                        </Box>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default NewsSlider;