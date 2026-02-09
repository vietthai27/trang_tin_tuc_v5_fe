import { Box, Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { changeLeauge, changeSeason, getAllLeaugeRequest, getTableDataRequest } from "./reducer";

export default function FootBallTableSelect() {

    const leauge = useSelector(state => state.footballTable.leauge);
    const season = useSelector(state => state.footballTable.season);
    const leaugeData = useSelector(state => state.footballTable.leaugeData);

    const dispatch = useDispatch();

    const startSeason = "2025-2026";

    const [startYear] = startSeason.split("-").map(Number);

    const seasons = Array.from({ length: 11 }, (_, i) => {
        const y1 = startYear - i;
        const y2 = y1 + 1;
        return `${y1}-${y2}`;
    });

    const handleGetTableData = () => {
        dispatch(getTableDataRequest({
            leaugeId: leauge,
            season: season
        }));
    }

    useEffect(() => {
        dispatch(getAllLeaugeRequest());
    }, [dispatch])

    return (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', width: '80%' }}>
            <FormControl fullWidth variant="outlined" sx={{ m: 1 }}>
                <InputLabel id="demo-simple-select-standard-label">Leauge</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    label="Leauge"
                    value={leauge}
                    onChange={(e) => { dispatch(changeLeauge(e.target.value)) }}

                >
                    {leaugeData.map((item, index) => (
                        <MenuItem key={index} value={item.idLeague}>{item.strLeague}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth variant="outlined" sx={{ m: 1 }}>
                <InputLabel id="demo-simple-select-filled-label">Season</InputLabel>
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    label="Season"
                    value={season}
                    onChange={(e) => { dispatch(changeSeason(e.target.value)) }}
                >
                    {seasons.map((item, index) => (
                        <MenuItem key={index} value={item}>{item}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button variant="outlined" onClick={() => { handleGetTableData() }}>Check</Button>
        </Box>
    )
}