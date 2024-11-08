import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPremierLeaugeTableRequest } from "./redux"
import { FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { getNextAndPreviousFourYears } from "../../ultil"

const PremierLeauge = () => {

    const dispatch = useDispatch()
    const yearList = getNextAndPreviousFourYears();


    const [seson, setSeson] = useState(yearList[0]);

    const { table } = useSelector(state => state.premierLeauge)

    useEffect(() => {
        dispatch(getPremierLeaugeTableRequest(seson))
    }, [seson])

    const handleChange = (event) => {
        setSeson(event.target.value);
    };

    return (
        <div className="premire-leauge-container">
            <h1 className="component-title">Premire leauge</h1>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Season</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Season"
                    onChange={handleChange}
                    defaultValue={yearList[0]}
                >
                    {yearList.map((year, index) => (
                        <MenuItem key={index} value={year}>
                            {year}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TableContainer component={Paper}>
                <Table style={{ width: "690px" }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Rank</TableCell>
                            <TableCell align="center">Team</TableCell>
                            <TableCell align="center">Points</TableCell>
                            <TableCell align="center">Played</TableCell>
                            <TableCell align="center">Win</TableCell>
                            <TableCell align="center">Draw</TableCell>
                            <TableCell align="center">Lost</TableCell>
                            <TableCell align="center">Form</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {table.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{row.intRank}</TableCell>
                                <TableCell align="left">
                                    <img style={{ width: "30px", height: "30px" }} src={row.strBadge} />
                                    &nbsp;
                                    {row.strTeam}
                                </TableCell>
                                <TableCell align="center">{row.intPoints}</TableCell>
                                <TableCell align="center">{row.intPlayed}</TableCell>
                                <TableCell align="center">{row.intWin}</TableCell>
                                <TableCell align="center">{row.intDraw}</TableCell>
                                <TableCell align="center">{row.intLoss}</TableCell>
                                <TableCell align="center">
                                    <div className="premier-leauge-form-container">
                                        {row.strForm.split('').map((item) => (
                                            <p className={`premier-leauge-form-${item}`}>{item}</p>
                                        ))}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default PremierLeauge