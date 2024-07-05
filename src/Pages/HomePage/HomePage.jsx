import React from 'react';
import NewsCarosel from '../../Component/NewsCarousel/NewsCrousel';
import Weather from '../../Component/Weather/Weather';
import PremierLeauge from '../../Component/PremierLeauge/PremierLeauge';
function HomePage() {
    return (
        <div className='home_page-container'>
            <div className='home_page-row1'>
                <PremierLeauge />
                <NewsCarosel />
                <Weather />
            </div>

        </div>
    );
}

export default HomePage;