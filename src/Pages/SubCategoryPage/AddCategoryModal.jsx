import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function AddSubCategoryModal({
  open,
  onClose,
  onSubmit
}) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (open) {
      setName("");
    }
  }, [open]);

  const { id } = useParams();

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ width: 350, p: 3, bgcolor: "background.paper", borderRadius: 2, mx: "auto", mt: "10%" }}>
        <Typography variant="h6" mb={2} textAlign="center">
          Thêm màn quản lý
        </Typography>

        <TextField
          fullWidth
          size="small"
          label="Tên quản lý"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
          <Button onClick={onClose}>Hủy</Button>
          <Button
            variant="contained"
            disabled={!name.trim()}
            onClick={() => onSubmit({ idCategory: {id}, subCategory: { name } })}
          >
            Thêm
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
