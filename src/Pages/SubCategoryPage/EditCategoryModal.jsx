import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function EditSubCategoryModal({
  open,
  onClose,
  data,
  onSubmit
}) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (open && data) {
      setName(data.name);
    }
  }, [open, data]);

  const { id } = useParams();

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ width: 350, p: 3, bgcolor: "background.paper", borderRadius: 2, mx: "auto", mt: "10%" }}>
        <Typography variant="h6" mb={2} textAlign="center">
          Sửa màn quản lý
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
            onClick={() =>
              onSubmit({
                id: data.id,
                subCategory: { name },
                idCategory: {id}
              })
            }
          >
            Sửa
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
