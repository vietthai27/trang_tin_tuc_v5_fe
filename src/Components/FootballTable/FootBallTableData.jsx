import { Box, Chip, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useSelector } from "react-redux";

export default function FootBallTableData() {

    const tableData = useSelector((state) => state.footballTable.tableData);

    function getFormColor(form) {
        if (form === 'W') return 'green'
        else if (form === 'D') return '#a9a900'
        else if (form === 'L') return 'red'
        else return 'grey'
    }

    function getPromotionColor(promotion) {
        if (promotion.includes('Champions League')) return 'blue'
        else if (promotion.includes('Europa League')) return 'orange'
        else return 'black'
    }

    return (
        <Box sx={{ width: "100%", overflowX: "auto" }}>
            <TableContainer
                component={Paper}
                sx={{
                    width: "90%",
                    overflowX: "auto",
                    overflowY: "auto",
                    margin: "auto"
                }}
            >
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Rank</TableCell>
                            <TableCell align="right">Point</TableCell>
                            <TableCell align="right">Played</TableCell>
                            <TableCell align="right">Win</TableCell>
                            <TableCell align="right">Loss</TableCell>
                            <TableCell align="right">Draw</TableCell>
                            <TableCell align="right">Scored</TableCell>
                            <TableCell align="right">Scored Against</TableCell>
                            <TableCell align="right">Goal Diffirent</TableCell>
                            <TableCell align="left">Form</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.map((row) => (
                            <TableRow key={row.intRank}>
                                <TableCell sx={{ borderLeft: `2px solid ${getPromotionColor(row.strDescription)}` }}>
                                    <Typography sx={{ display: "flex", gap: 1, alignItems: "center", width: "170px" }}>
                                        {row.intRank}
                                        <img style={{ width: "25px" }} alt="badge" src={row.strBadge} />
                                        {row.strTeam}
                                    </Typography>
                                </TableCell>

                                <TableCell align="right">{row.intPoints}</TableCell>
                                <TableCell align="right">{row.intPlayed}</TableCell>
                                <TableCell align="right">{row.intWin}</TableCell>
                                <TableCell align="right">{row.intLoss}</TableCell>
                                <TableCell align="right">{row.intDraw}</TableCell>
                                <TableCell align="right">{row.intGoalsFor}</TableCell>
                                <TableCell align="right">{row.intGoalsAgainst}</TableCell>
                                <TableCell align="right">{row.intGoalDifference}</TableCell>
                                <TableCell align="right">
                                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                                        {row.strForm.split('').map((e, index) => (
                                            <Typography key={index} fontWeight={700} sx={{ backgroundColor: getFormColor(e), width: '25px', height: '30px', padding: '5px', borderRadius: '5px', textAlign: 'center' }}>{e}</Typography>
                                        ))}
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box>
                <Stack spacing={1} sx={{ width: '50%', margin: 'auto', padding: 1 }}>
                    <Chip label="Champions League" sx={{ backgroundColor: 'blue' }} />
                    <Chip label="Europa League" sx={{ backgroundColor: 'orange' }} />
                </Stack>
            </Box>
        </Box>

    )
}
