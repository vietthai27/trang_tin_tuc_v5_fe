import { Box } from "@mui/material";

function Loading() {
    return (
        <Box className="loading-container">
            <Box className="loading-box">
                <div className="loader"></div>
            </Box>

        </Box>
    );
}

export default Loading;