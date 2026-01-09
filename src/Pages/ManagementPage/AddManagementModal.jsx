import { Box, Button, Checkbox, Modal, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function AddManagementModal({
  open,
  onClose,
  roleList,
  onSubmit
}) {
  const [name, setName] = useState("");
  const [roleIds, setRoleIds] = useState([]);

  useEffect(() => {
    if (open) {
      setName("");
      setRoleIds([]);
    }
  }, [open]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ width: 420, p: 3, bgcolor: "background.paper", borderRadius: 2, mx: "auto", mt: "10%" }}>
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

        {roleList.map(role => (
          <Box key={role.id} display="flex" alignItems="center">
            <Checkbox
              checked={roleIds.includes(role.id)}
              onChange={(e) =>
                setRoleIds(prev =>
                  e.target.checked
                    ? [...prev, role.id]
                    : prev.filter(id => id !== role.id)
                )
              }
            />
            <Typography>{role.roleName}</Typography>
          </Box>
        ))}

        <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
          <Button onClick={onClose}>Hủy</Button>
          <Button
            variant="contained"
            disabled={!name.trim()}
            onClick={() => onSubmit({ management: { name }, roleIds })}
          >
            Thêm
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
