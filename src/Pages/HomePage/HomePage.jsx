import React from 'react';
import NewsCarosel from '../../Component/NewsCarousel/NewsCrousel';
import Weather from '../../Component/Weather/Weather';
function HomePage() {
    return (
        <div className='home_page-container'>
            <NewsCarosel />
            <Weather />
        </div>
    );
}

export default HomePage;