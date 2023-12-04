import React from "react";
import {
  Avatar,
  Box,
  Container,
  Typography,
  IconButton,
  Tooltip,
  Badge,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ModifyBlog from "./ModifyBlog";
import CommentIcon from "@mui/icons-material/Comment";
import Comment from "./Comments";

const QuoteCards = ({
  username,
  profile,
  createdAt,
  Quote,
  Title,
  isUser,
  id,
  likes,
  likebyuser,
}) => {
  const [open, setOpen] = React.useState(false);
  const [like, setlike] = React.useState(likes);
  // console.log(Quote);
  const [userLike, setuserlike] = React.useState(likebyuser);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const likeHandler = async () => {
    if (userLike) {
      setuserlike(false);
      setlike(like - 1);
    } else {
      setuserlike(true);
      setlike(like + 1);
    }
    const { data } = axios.post(
      `/api/v1/blog/like-blog?Uid=${localStorage.getItem("userId")}&Bid=${id}`
    );
  };

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
      <Box className="main-Box-with-border"
        sx={{
          width: "350px",
          height: "auto",
          border: "0.1px solid black",
          borderRadius: "5px",
          backgroundColor:"#343435",
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
              color:"white"
            }}
          >
            <Avatar
              src={profile}
              sx={{ ml: "0.5rem", height: "2rem", width: "2rem" ,  }}
            />
            {username}
          </Typography>
          <Typography sx={{ marginLeft: "auto", marginRight: "8px",    color:"white" }}>
            {createdAt}
          </Typography>
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
            className="Quote"
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              overflowY: "scroll ",
              backgroundColor:"#bcd4cbb1",
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              justifyContent: "center",
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
            <Typography
              variant="h6"
              sx={{
                width: "90%",
                textAlign: "justify",
                wordWrap: "break-word",
                letterSpacing: "2px",
                paddingTop: "1rem",
              
              }}
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
            color:"white"
          }}
        >
          {Title}
        </Typography>
        <div style={{ height: "01px", backgroundColor: "black" }} />
        <Typography
          sx={{
            width: "100%",
            height: "auto",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            position: "relative",
          }}
        >
          {" "}
          <IconButton onClick={likeHandler}>
            <Badge badgeContent={like} sx={{color:"white"}}>
              {userLike ? (
                <ThumbUpIcon
                  sx={{
                    height: "20px",
                    width: "20px",
                  
                    border: "1px solid black",
                    borderRadius: "50%",
                    padding: "5px",
                    backgroundColor: "#4ADB9A",
                    color:"white"
                  }}
                />
              ) : (
                <ThumbUpIcon
                  sx={{
                    height: "20px",
                    width: "20px",
                    color: "#4ADB9A",
                    border: "1px solid black",
                    borderRadius: "50%",
                    padding: "5px",
                    transition: "all .2s ease-in-out",
                    ":hover": {
                      backgroundColor: "#4ADB9A",
                      color:"white"
                    },
                  }}
                />
              )}
            </Badge>
          </IconButton>
          <IconButton>
            <Comment id={id} quote={Quote} />
          </IconButton>
          {isUser && (
            <>
              {" "}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "auto",
                }}
              >
                <ModifyBlog id={id} />
                <IconButton onClick={handleClickOpen}>
                  <Tooltip title={"Delete Quote"}>
                    <DeleteIcon
                      sx={{
                        color: "#df3f3fe3",
                        border: "1px solid black",
                        borderRadius: "50%",
                        padding: "5px",
                      }}
                    />
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
              </Box>
            </>
          )}
        </Typography>
      </Box>
    </>
  );
};

export default QuoteCards;
