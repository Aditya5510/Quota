import { Avatar, Box, Container, Typography } from "@mui/material";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import Person2Icon from "@mui/icons-material/Person2";
import EmailIcon from "@mui/icons-material/Email";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

const Profile = ({ id, Profile, Quotes, username, email }) => {
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      const id = localStorage.getItem("userId");
      const res = await axios.delete(`/api/v1/user/delete-user/${id}`);

      if (res.data.success) {
        localStorage.clear();
        alert("User deleted successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container
        className="main-Box-with-border"
        sx={{
          width: { lg: "50%", md: "50%", sm: "80%", xs: "90%" },
          mt: { lg: "19vh", md: "20vh", sm: "10vh", xs: "10vh" },
          border: "0.1px solid black",
          borderRadius: "5px",
          display: "flex",
          flexDirection: { lg: "row", md: "row", sm: "column", xs: "column" },
          justifyContent: "space-around",
          alignItems: "center",
          padding: "1rem",
          position: "relative",
        }}
      >
        <Avatar src={Profile} sx={{ height: "100px", width: "100px" }} />
        <Box
          sx={{
            width: {
              lg: "^0%",
              md: "70%",
              sm: "100%",
              xs: "100%",
              mt: "0.5rem",
            },
          }}
        >
          {" "}
          <Box sx={{ width: "100%", display: "flex" }}>
            <Typography
              sx={{
                backgroundColor: "#343435",
                color: "white",
                padding: "5px",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <PeopleAltIcon /> Friends:23
            </Typography>
            <Typography
              sx={{
                marginLeft: "auto",
                backgroundColor: "#343435",
                color: "white",
                padding: "8px",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <FormatQuoteIcon /> Quotes:25
            </Typography>
          </Box>
          <Box sx={{ mt: "1rem" }}>
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              {" "}
              <Person2Icon sx={{ color: "#343435" }} />
              {username}
            </Typography>
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <EmailIcon sx={{ color: "#343435" }} />
              {email}
            </Typography>
          </Box>
        </Box>
        <Typography
          onClick={handleDelete}
          sx={{
            color: "#000000",
            backgroundColor: "#232222",
            fontWeight: "bold",
            bottom: { lg: "10%", md: "10%", sm: "10%", xs: "80%" },
            right: { lg: "12.1%", md: "4%", sm: "4%", xs: "4%" },
            position: "absolute",
            cursor: "pointer",
            borderRadius: "10px",
            padding: "8px",
            background: "transparent",
            justifyContent: "center",
            display: "flex",
            opacity: "0.9",
            border: "2px solid #ce8250",
            display: "flex",
            justifyContent: "center",
            gap: "0.5rem",

            transition: "all .2s ease-in-out",
            ":hover": {
              transform: "scale(1.01)",
              background: "#080808",
              color: "#d31b1b",
            },
          }}
        >
          <DeleteIcon />{" "}
        </Typography>
      </Container>
    </>
  );
};

export default Profile;
