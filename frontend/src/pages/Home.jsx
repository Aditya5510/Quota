import React from "react";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import QuoteCard from "../components/QuoteCards";
import { Container, TextField, Typography } from "@mui/material";
import CreateBlog from "../components/CreateBlog";
import { Box } from "@mui/material";

const Home = () => {
  const [blogs, setblogs] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(null);

  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("/api/v1/blog/all-blog");
      if (data?.success) {
        // console.log(data?.blogs);
        setblogs(data?.blogs);
        setloading(false);
      }
    } catch (error) {
      seterror(error);
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div className="Home-main-container">
      <Header />
      <Container sx={{ mt: "4rem" }}>
        <Box sx={{ display: "flex" }}>
          <Typography
            variant="h4"
            sx={{
              color: "Black",
              display: "flex",
              width: "90%",
              justifyContent: "flex-start",
              ml: "1.5rem",
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
        {loading == "true" && error == "true" ? (
          <p>Loading...</p>
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
      </Container>
    </div>
  );
};

export default Home;
