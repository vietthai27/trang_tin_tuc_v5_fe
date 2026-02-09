import { Box, Grid, Typography } from "@mui/material";
import NewsSlider from "../../Components/NewsSlider/NewsSlider";
import FootBallTableSelect from "../../Components/FootballTable/FootBallTableSelect";
import FootBallTableData from "../../Components/FootballTable/FootBallTableData";
import WeatherSelect from "../../Components/Weather/WeatherSelect";
import WeatherForecast from "../../Components/Weather/WeatherForcast";

export default function HomePage() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Slider on top */}
            <Box sx={{mt: 2}}>
                <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', fontWeight: 600 }}>
                    Tin tức mới nhất
                </Typography>
                <NewsSlider/>
            </Box>

            {/* Weather and Football Table - side by side on large, stacked on small */}
            <Grid container spacing={3}>
                {/* Weather Section */}
                <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                        <Typography variant="h5" sx={{ mb: 1, textAlign: 'center', fontWeight: 600, width: '100%' }}>
                            Thời tiết
                        </Typography>
                        <WeatherSelect />
                        <WeatherForecast />
                    </Box>
                </Grid>

                {/* Football Table Section */}
                <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                        <Typography variant="h5" sx={{ mb: 1, textAlign: 'center', fontWeight: 600, width: '100%' }}>
                            Bảng xếp hạng bóng đá
                        </Typography>
                        <FootBallTableSelect />
                        <FootBallTableData />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}