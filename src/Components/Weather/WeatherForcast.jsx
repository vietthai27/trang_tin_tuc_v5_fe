import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import WaterIcon from '@mui/icons-material/Water';
import WindPowerIcon from '@mui/icons-material/WindPower';
import AirIcon from '@mui/icons-material/Air';
import VisibilityIcon from '@mui/icons-material/Visibility';

function WeatherForecast() {

    const weatherData = useSelector((state) => state.weather.weatherData);
    const relsovedCity = useSelector((state) => state.weather.relsovedCity);

    const todayWeather = weatherData.length > 0 ? weatherData[0] : null

    function formatToday(dateStr) {
        const [year, month, day] = dateStr.split("-");
        return `${day}/${month}/${year}`;
    }

    function formatNextDays(dateStr) {
        const [month, day] = dateStr.substring(5, 10).split("-");
        return `${day}-${month}`;
    }

    function getWeatherIcon(icon) {
        return `/weather-icon/${icon}.png`;
    }

    function getAqiColor(aqi) {
        if (aqi <= 50) return "#00e400";
        if (aqi <= 100) return "#ffff00";
        if (aqi <= 150) return "#ff7e00";
        if (aqi <= 200) return "#ff0000";
        if (aqi <= 300) return "#99004c";
        return "#7e0023";
    }

    return (
        <Box sx={{ width: '90%' }}>
            {todayWeather && (
                <TableContainer sx={{ width: '100%' }} component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={2}>
                                    <Typography>{relsovedCity}</Typography>
                                    <Typography variant="h5" fontWeight={700}>
                                        {formatToday(todayWeather.datetime)}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>

                            {/* Weather Icon + Temp */}
                            <TableRow>
                                <TableCell>
                                    <img
                                        alt="weather-icon"
                                        style={{ width: '60px' }}
                                        src={getWeatherIcon(todayWeather.icon)}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="h4" fontWeight={700}>
                                        {todayWeather.temp} °C
                                    </Typography>
                                </TableCell>
                            </TableRow>

                            {/* Min / Max */}
                            <TableRow>
                                <TableCell>
                                    <Typography color="success.main">
                                        Min: {todayWeather.tempmin} °C
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography color="error.main">
                                        Max: {todayWeather.tempmax} °C
                                    </Typography>
                                </TableCell>
                            </TableRow>

                            {/* Wind + AQI */}
                            <TableRow>
                                <TableCell>
                                    <Typography variant=""                              
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px'
                                        }}
                                    >
                                        <WindPowerIcon /> Wind: {todayWeather.windspeed} Km/h
                                    </Typography>
                                </TableCell>

                                <TableCell align="right">
                                    <Typography variant=""
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'flex-end',
                                            gap: '4px',
                                            color: getAqiColor(todayWeather.aqius)
                                        }}
                                    >
                                        <AirIcon /> AQI(US): {todayWeather.aqius}
                                    </Typography>
                                </TableCell>
                            </TableRow>

                            {/* UV + Humid */}
                            <TableRow>
                                <TableCell>
                                    <Typography variant=""
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px'
                                        }}
                                    >
                                        <VisibilityIcon /> Vis: {todayWeather.visibility} Km
                                    </Typography>
                                </TableCell>

                                <TableCell align="right">
                                    <Typography variant=""
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'flex-end',
                                            gap: '4px'
                                        }}
                                    >
                                        <WaterIcon /> Humid: {todayWeather.humidity}%
                                    </Typography>
                                </TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Next 4 days */}
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'space-between', paddingTop: 1 }}>
                {weatherData.slice(1, 5).map((item, index) => (
                    <Paper
                        key={index}
                        sx={{
                            display: 'flex',
                            gap: 1,
                            alignItems: 'center',
                            flexDirection: 'column',
                            padding: 1,
                            width: '100%',
                            textAlign: 'center'
                        }}
                    >
                        <Typography fontWeight={700}>{formatNextDays(item.datetime)}</Typography>

                        <img
                            alt="weather-icon"
                            style={{ width: '30px' }}
                            src={getWeatherIcon(item.icon)}
                        />

                        <Typography>{item.temp} °C</Typography>
                    </Paper>
                ))}
            </Box>
        </Box>
    );
}

export default WeatherForecast;
