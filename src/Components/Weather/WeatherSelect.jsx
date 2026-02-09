import { Box, Button, FormControl, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { changeInputCity, getWeatherDataRequest } from "./reducer";

function WeatherSelect() {

  const inputCity = useSelector((state) => state.weather.inputCity);

  const dispatch = useDispatch();

  const handleCheckWeather = () => {
    dispatch(getWeatherDataRequest(inputCity));
  }

  return (
    <Box sx={{ minWidth: 120, display: "flex", gap: 1 }}>
      <FormControl fullWidth>
        <TextField
          value={inputCity}
          id="outlined-basic"
          label="Location"
          variant="outlined"
          onChange={(e) => {
            dispatch(changeInputCity(e.target.value));
          }}
        />
      </FormControl>
      <Button variant="outlined" onClick={() => { handleCheckWeather() }}>
        Check
      </Button>
    </Box>
  );
}

export default WeatherSelect;
