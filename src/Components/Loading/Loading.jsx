import { Box, CircularProgress } from "@mui/material";

function Loading() {
    return (
        <Box className="loading-container">
            <CircularProgress className="loading-circle"/>
        </Box>
    );
}

export default Loading;