import * as React from "react";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import CommentIcon from "@mui/icons-material/Comment";
import { Avatar, Box, TextField, Container, Badge } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Slide from "@mui/material/Slide";
import axios from "axios";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ShareIcon from "@mui/icons-material/Share";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CommentsCard = ({ Profile, Username, Content }) => {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          mt: "1rem",
          gap: "0.4rem",
          alignItems: "flex-start",
          height: "auto",
          border: "1px solid black",
          padding: "1rem",
          borderRadius: "1rem",
        }}
      >
        <Avatar src={Profile} sx={{ height: "30px", width: "30px" }} />
        <Typography sx={{ fontSize: "15px", textAlign: "justify" }}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              position: "relative",
              gap: "3rem",
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>{Username}</Typography>
            <Box
              sx={{
                right: "10px",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <ThumbUpIcon
                sx={{
                  height: "15px",
                  width: "15px",
                  padding: "2px",
                  cursor: "pointer",
                  border: "1px solid black",
                  borderRadius: "50%",
                }}
              />
              <ShareIcon
                sx={{
                  height: "15px",
                  width: "15px",
                  padding: "3px",
                  cursor: "pointer",
                  border: "1px solid black",
                  borderRadius: "50%",
                }}
              />
            </Box>
          </Box>
          {Content}
        </Typography>
      </Box>
    </div>
  );
};
const initialBlogState = {
  _id: "",
  title: "",
  content: "",
  Image: "",
  user: {
    _id: "",
    username: "",
    email: "",
    Profile: "",
    blogs: [],
    createdAt: "",
    updatedAt: "",
  },
  likes: 0,
  likedBy: [],
  createdAt: "",
  updatedAt: "",
  comments: [],
};

export default function Comment({ id, quote }) {
  const [open, setOpen] = React.useState(false);
  const [allcomments, setcomment] = React.useState([]);
  const [postHolder, setpostHolder] = React.useState(initialBlogState);
  const [x, setx] = React.useState(0);
  console.log(quote);
  console.log(id);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    fetchComments();
    fetchpostHolder();
  }, [open, x]);

  const fetchpostHolder = async () => {
    try {
      const { data } = await axios.get(`/api/v1/blog/get-blog/${id}`);
      if (data?.success) {
        setpostHolder(data?.blog);
        console.log(data?.blog);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComments = async () => {
    try {
      const { data } = await axios.get(`/api/v1/blog/get-comments/${id}`);
      if (data?.success) {
        setcomment(data?.comments);
        // setx(data.comments[0].text);
        // console.log(data.comments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePost = async (e) => {
    try {
      e.preventDefault();
      const newdata = new FormData(e.currentTarget);
      const UserId = localStorage.getItem("userId");
      const BlogId = id;

      const { data } = await axios.post("/api/v1/blog/comment-blog", {
        BlogId: BlogId,
        UserId: UserId,
        content: newdata.get("Comment"),
      });
      if (data.success) {
        alert("Comment added successfully");
        setx(1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <React.Fragment>
      <Badge badgeContent={allcomments.length} color="primary">
        <CommentIcon
          onClick={handleClickOpen}
          sx={{
            height: "20px",
            width: "20px",
            color: "#db654a",
            border: "1px solid black",
            borderRadius: "50%",
            padding: "5px",
            ":hover": {
              backgroundColor: "#838e89",
            },
          }}
        />
      </Badge>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullScreen
        TransitionComponent={Transition}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, height: "5vh", borderRadius: "5px" }}
          className="Dialogue"
          id="customized-dialog-title"
        >
          Comments
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon sx={{ color: "black" }} />
        </IconButton>
        <DialogContent
          dividers
          sx={{ display: "flex", flexWrap: "wrap" }}
          className="Dialogue"
        >
          {" "}
          <Box
            sx={{
              borderRadius: "10px",
              border: "0.2px solid black",
              height: { lg: "100%", md: "100%", sm: "40%", xs: "50%" },
              width: { lg: "40%", md: "40%", sm: "100%", xs: "100%" },
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
                backgroundColor: "#4E4E4E",
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
                variant="h5"
                sx={{
                  width: "90%",
                  textAlign: "justify",
                  wordWrap: "break-word",
                  paddingTop: "1rem",
                }}
              >
                {quote}
              </Typography>
            </Box>
          </Box>
          <Box
            dividers
            sx={{
              height: { lg: "100%", md: "100%", sm: "60%", xs: "50%" },
              width: { lg: "50%", md: "40%", sm: "90%", xs: "90%" },
              paddingLeft: "20px",
              mt: { lg: "0px", md: "0px", sm: "0px", xs: "10px" },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
              <Avatar
                src={postHolder.user.Profile}
                sx={{ height: "50px", width: "50px" }}
              />
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {postHolder.user.username}'s Quote
              </Typography>
            </Box>
            <div
              style={{
                height: "1px",
                width: "100%",
                backgroundColor: "black",
                marginTop: "2px",
              }}
            />

            {allcomments.map((comment) => (
              <>
                <CommentsCard
                  Content={comment.text}
                  Profile={comment.user.Profile}
                  Username={comment.user.username}
                />
              </>
            ))}
          </Box>
        </DialogContent>
        <DialogActions
          className="Dialogue"
          sx={{
            minHeight: "10vh",
            height: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component={"form"}
            onSubmit={handlePost}
            sx={{
              width: "100%",
              mr: "auto",
              paddingLeft: "10px",
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextField
              id="filled-basic"
              label="Add a comment"
              variant="standard"
              fullWidth
              multiline
              name="Comment"
            />
            <Button autoFocus type="submit" endIcon={<SendIcon />}>
              Post
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
