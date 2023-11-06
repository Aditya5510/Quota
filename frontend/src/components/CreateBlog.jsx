import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Tooltip from "@mui/material/Tooltip";
import { TextField, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function CreateBlog() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newdata = new FormData(e.currentTarget);

    handleClose();
    try {
      const id = localStorage.getItem("userId");

      const { data } = await axios.post("/api/v1/blog/add-blog", {
        title: newdata.get("Title"),
        content: newdata.get("Quote"),
        Image: "sdasdasd",
        user: id,
      });

      if (data?.success) {
        console.log(data);
        alert("Blog added successfully");
        window.location.reload();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Tooltip title="Add a Quote">
        <IconButton variant="outlined" onClick={handleClickOpen}>
          <AddCircleIcon
            sx={{
              height: "40px",
              width: "40px",
              color: "#343435",
              backgroundColor: " #4ADB9A",
              borderRadius: "500px",
              padding: "1px",
            }}
          />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Add your Quote here!"}</DialogTitle>
        <DialogContent sx={{ height: "auto" }}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              name="Title"
              label="Title"
              multiline
              rows={2}
              defaultValue="Title goes here"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Quote"
              name="Quote"
              multiline
              rows={5}
              defaultValue="Quote goes here"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 1 }}
              endIcon={<CreateIcon />}
            >
              Create
            </Button>
          </Box>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
}
