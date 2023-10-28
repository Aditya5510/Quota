import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { IconButton } from "@mui/material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import Tooltip from "@mui/material/Tooltip";
import { TextField, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function ModifyBlog({ id }) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [n, setn] = React.useState(false);

  const handleClickOpen = async () => {
    fetchBlog();
    setOpen(true);
  };

  const fetchBlog = async () => {
    try {
      const { data } = await axios.get(`/api/v1/blog/get-blog/${id}`);
      if (data?.success) {
        setTitle(data?.blog.title);
        setContent(data?.blog.content);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newdata = new FormData(e.currentTarget);

    handleClose();
    try {
      const { data } = await axios.put(`/api/v1/blog/update-blog/${id}`, {
        title: newdata.get("Title"),
        content: newdata.get("Quote"),
        Image: "sdasdasd",
      });

      if (data?.success) {
        setn(true);
        alert("Blog Modified successfully");
        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <Tooltip title="Modify this Quote">
        <IconButton
          onClick={handleClickOpen}
          sx={{ position: "absolute", top: "0.1px", left: "0.1px" }}
        >
          <AutoFixHighIcon sx={{ color: "#ad840bbd" }} />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Modify your Quote!"}</DialogTitle>
        <DialogContent sx={{ height: "auto" }}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              name="Title"
              label="Title"
              multiline
              rows={2}
              defaultValue={title}
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              label="Quote"
              name="Quote"
              multiline
              rows={5}
              defaultValue={content}
              autoFocus
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 1 }}
              endIcon={<CreateIcon />}
            >
              Modify
            </Button>
          </Box>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
}
