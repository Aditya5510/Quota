import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { changes } from "../pages/Social";
import { useContext } from "react";

const UserCard = ({ id, user, profile, quotes, request }) => {
  const { change, setchange } = useContext(changes);

  const friendRequest = async () => {
    try {
      const userId = localStorage.getItem("userId");
      //   console.log(userId, friendId);
      const { data } = await axios.post(`/api/v1/user/add-friend/${userId}`, {
        friendId: id,
      });
      if (data.success) {
        setchange(!change);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const friend = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const { data } = await axios.post(
        `/api/v1/user/friend-request/${userId}`,
        {
          friendId: id,
          ans: "true",
        }
      );
      if (data.success) {
        setchange(!change);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const notfriend = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const { data } = await axios.post(
        `/api/v1/user/friend-request/${userId}`,
        {
          friendId: id,
          ans: "false",
        }
      );
      if (data.success) {
        setchange(!change);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      sx={{
        height: "250px",
        width: "200px",
        border: "1px solid black",
        // mt: "200px",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
      }}
    >
      <Avatar src={profile} sx={{ height: "100px", width: "100px" }} />
      <Typography sx={{ mt: "5px" }}>{user}</Typography>
      <Typography sx={{ mt: "5px" }}>Quotes:{quotes}</Typography>
      <Box>
        {!request ? (
          <>
            {" "}
            <Button
              variant={"contained"}
              sx={{ mt: "5px" }}
              onClick={friendRequest}
            >
              Add friend
            </Button>
          </>
        ) : (
          <Box sx={{ display: "flex", gap: "0.1rem" }}>
            {" "}
            <Button variant={"contained"} sx={{ mt: "5px" }} onClick={friend}>
              Accept
            </Button>
            <Button
              variant={"contained"}
              sx={{ mt: "5px" }}
              onClick={notfriend}
            >
              Decline
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default UserCard;
