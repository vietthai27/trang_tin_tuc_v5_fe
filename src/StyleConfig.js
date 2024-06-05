import { TableCell, TableRow, styled, tableCellClasses } from "@mui/material";

export const boxStyleLogin = {
    width:"250px",
    margin: "10% auto",
    backgroundColor: "white",
    boxShadow: 10,
    display: "flex",
    flexDirection: "column",
    height: "400px",
    justifyContent: "space-evenly",
    padding: "1rem 3rem",
    borderRadius: "15px"
}

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
  