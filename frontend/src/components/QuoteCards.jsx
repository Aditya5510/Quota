import React from "react";
import {
  Avatar,
  Box,
  Container,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ModifyBlog from "./ModifyBlog";

const QuoteCards = ({
  username,
  profile,
  createdAt,
  Quote,
  Title,
  isUser,
  id,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const img =
    "https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGlvbiUyMGhlYWR8ZW58MHx8MHx8fDA%3D";

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/api/v1/blog/delete-blog/${id}`);
      if (data?.success) {
        handleClose();
        alert("Quote deleted successfully");

        window.location.reload();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Box
        sx={{
          width: "350px",
          height: "auto",
          border: "0.1px solid black",
          borderRadius: "5px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "2px",
            }}
          >
            {/* <AccountCircleIcon /> */}
            <Avatar
              src={profile}
              sx={{ ml: "0.5rem", height: "2rem", width: "2rem" }}
            />
            {username}
          </Typography>
          <Typography sx={{ marginLeft: "auto" }}>{createdAt}</Typography>
        </Box>
        <Container
          sx={{
            borderRadius: "5px",
            border: "0.2px solid black",
            width: "350px",

            height: "300px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              inset: "0",

              // zIndex: '-1',
              //   backgroundImage: `url(${img})`,
              backgroundColor: "#4E4E4E",
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
              fontSize: "20px",
              boxShadow: "0 0 5px rgba(0, 0,0,0.5)",
              transition: "all .1s ease-in-out",

              color: "black",
              ":hover": {
                opacity: 0.7,
                transform: "scale(0.98)",
                cursor: "pointer",
              },
            }}
          >
            {isUser && (
              <>
                <div>
                  <IconButton
                    onClick={handleClickOpen}
                    sx={{
                      position: "absolute",
                      top: "0.1px",
                      right: "0.1px",
                    }}
                  >
                    <Tooltip title={"Delete Quote"}>
                      <DeleteIcon sx={{ color: "#df3f3fe3" }} />
                    </Tooltip>
                  </IconButton>{" "}
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {" Are you sure you want to delete this quote?"}
                    </DialogTitle>
                    <DialogContent></DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>No</Button>
                      <Button onClick={handleDelete} autoFocus>
                        Yes
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
                <ModifyBlog id={id} />
              </>
            )}
            <Typography
              variant="h5"
              sx={{ width: "90%", textAlign: "center", wordWrap: "break-word" }}
            >
              {Quote}
            </Typography>
          </Box>
        </Container>
        <Typography
          sx={{
            textAlign: "center",
            width: "100%",
            fontWeight: "bold",
            wordWrap: "break-word",
            height: "auto",
          }}
        >
          {Title}
        </Typography>
      </Box>
    </>
  );
};

export default QuoteCards;
