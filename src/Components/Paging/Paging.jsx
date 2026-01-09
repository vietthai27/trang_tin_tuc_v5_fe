import { Pagination, Stack } from "@mui/material";

export default function Paging({
    page,          
    totalPages,    
    onPageChange,  
    color = "primary",
    variant = "outlined",
    disabled = false
}) {
    const handleChange = (event, value) => {
                onPageChange(value - 1);
    };

    return (
        <Stack spacing={2} alignItems="center">
            <Pagination
                count={totalPages}
                page={page + 1}
                onChange={handleChange}
                color={color}
                variant={variant}
                disabled={disabled}
                showFirstButton
                showLastButton
            />
        </Stack>
    );
}
