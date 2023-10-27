import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import QuoteCards from "../components/QuoteCards";
import { Container, Typography } from "@mui/material";

const YourQuotes = () => {
  const [blogs, setblogs] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(null);
  const [userName, setusername] = useState("");

  const getyourblog = async () => {
    try {
      const id = localStorage.getItem("userId");

      const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);
      if (data?.success) {
        setblogs(data?.userblog.blogs);
        setusername(data?.userblog.username);
        setloading(false);
      }
    } catch (error) {
      seterror(error);
      console.log(error);
    }
  };

  useEffect(() => {
    getyourblog();
  }, []);
  // console.log(blogs);
  return (
    <div className="Home-main-container2">
      <Header />
      <Container sx={{ mt: "4rem" }}>
        <Typography
          variant="h4"
          sx={{
            color: "Black",
            display: "flex",
            width: "100%",
            justifyContent: "flex-start",
            ml: "1.5rem",
          }}
        >
          Your Quotes
        </Typography>
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
          <p>loading...</p>
        ) : (
          blogs.map((blog) => (
            <QuoteCards
              Quote={blog.content}
              Title={blog.title}
              createdAt={blog.createdAt.slice(0, 10)}
              profile={blog.profile}
              username={userName}
              id={blog._id}
              isUser={true}
            />
          ))
        )}
      </Container>
    </div>
  );
};

export default YourQuotes;
