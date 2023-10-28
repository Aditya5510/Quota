import React from "react";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import QuoteCard from "../components/QuoteCards";
import { Container, TextField, Typography } from "@mui/material";
import CreateBlog from "../components/CreateBlog";
import { Box } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Pagination from "@mui/material/Pagination";

const Home = () => {
  const [blogs, setblogs] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(null);
  const [page, setpage] = useState(1);
  const [blogCount, setblogCount] = useState(0);

  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get(`/api/v1/blog/all-blog?_page=${page}`);
      if (data?.success) {
        setloading(false);
        // console.log(data?.blogs);
        setblogCount(data?.blogCount);
        setblogs(data?.blogs);
      }
    } catch (error) {
      seterror(error);
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, [page]);

  return (
    <div className="Home-main-container">
      <Header />
      <Container sx={{ mt: "4rem" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="h4"
            sx={{
              color: "Black",
              display: "flex",
              width: "90%",
              justifyContent: "flex-start",
              ml: "1.5rem",
              fontSize: { lg: "2rem", md: "1.5rem", sm: "1rem", xs: "1.5rem" },
            }}
          >
            Recent Quotes
          </Typography>
          <CreateBlog />
        </Box>
        <div
          style={{
            width: "97%",
            height: "2%",
            border: "0.4px solid black",
            marginLeft: "15px",
          }}
        />
      </Container>

      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "2rem",
          flexWrap: "wrap",
          mt: "2rem",
        }}
      >
        {loading ? (
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{
              width: "100%",
              height: "100vh",
              bgcolor: "grey.900",
              borderRadius: "10px",
              opacity: "0.3",
            }}
          />
        ) : blogCount === 0 ? (
          <h1>No one has Added any Quotes Just yet.</h1>
        ) : (
          blogs.map((blog) => (
            <QuoteCard
              Quote={blog.content}
              Title={blog.title}
              createdAt={blog.createdAt.slice(0, 10)}
              profile={blog.profile}
              username={blog.user.username}
              id={blog._id}
              isUser={localStorage.getItem("userId") === blog.user._id}
            />
          ))
        )}
        <div
          style={{
            width: "97%",
            height: "2%",
            border: "0.4px solid black",
            marginLeft: "15px",
          }}
        />
        <Container sx={{ justifyContent: "center", display: "flex" }}>
          <Pagination
            count={4}
            variant="outlined"
            color={"error"}
            shape="rounded"
            size="large"
            showFirstButton
            defaultPage={page}
            showLastButton
            sx={{ height: "auto", mb: "20px" }}
            onChange={(e, value) => setpage(value)}
          />
        </Container>
      </Container>
    </div>
  );
};

export default Home;
