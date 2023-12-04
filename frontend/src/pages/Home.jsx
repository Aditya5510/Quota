import React from "react";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import QuoteCard from "../components/QuoteCards";
import { Container, Typography } from "@mui/material";
import CreateBlog from "../components/CreateBlog";
import { Box } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Pagination from "@mui/material/Pagination";
import Host from "../config.js";

const Home = () => {
  const [blogs, setblogs] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(null);
  const [page, setPage] = useState(1);
  const [blogCount, setblogCount] = useState(0);
  const blogsPerPage = 6;

  const getAllBlogs = async () => {
    const token = localStorage.getItem("token");

    //65453afa26e67de416a4df4a
    //65453afa26e67de416a4df4a
    // console.log(localStorage.getItem("userId"));
    const userId = localStorage.getItem("userId");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.get(
        `/api/v1/blog/all-blog?page=${page}&limit=${blogsPerPage}&cuser=${userId}`
      );
      // console.log(data.blogs[0].likedByCurrentUser);
      // console.log(data.blogs[0].likes);
      // console.log(data);
      // console.log(data.blogs);
      if (data?.success) {
        setloading(false);
        setblogCount(data?.blogCount);
        setblogs(data?.blogs);
      }
    } catch (error) {
      seterror(error);
      // console.log(error);
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
            Your Feed
          </Typography>
          <CreateBlog />
        </Box>
        <div
          style={{
            width: "97%",
            height: "1px",
            backgroundColor: "black",
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
            animation="pulse"
            sx={{
              width: "100%",
              height: "100vh",
              bgcolor: "grey.900",
              borderRadius: "10px",
              opacity: "0.3",
            }}
          />
        ) : blogCount === 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2>No one has Added any Quotes Just yet.</h2>
          </Box>
        ) : (
          blogs.map((blog) => (
            <QuoteCard
              Quote={blog.content}
              Title={blog.title}
              createdAt={blog.createdAt.slice(0, 10)}
              profile={blog.user.Profile}
              username={blog.user.username}
              id={blog._id}
              isUser={localStorage.getItem("userId") === blog.user._id}
              likes={blog.likes}
              likebyuser={blog.likedByCurrentUser}
            />
          ))
        )}
        <div
          style={{
            width: "97%",
            height: "1px",
            backgroundColor: "black",
            marginLeft: "15px",
          }}
        />
        <Container sx={{ justifyContent: "center", display: "flex" }}>
          {blogCount > 0 && (
            <Pagination
              count={Math.ceil(blogCount / blogsPerPage)} // Calculate the total number of pages based on the count of blog posts and posts per page
              page={page}
              onChange={(e, value) => setPage(value)}
              size="large"
              color="primary"
              sx={{ height: "auto", mb: "20px" }}
            />
          )}
        </Container>
      </Container>
    </div>
  );
};

export default Home;
