import React from "react";
import Header from "../components/Header";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextsmsIcon from "@mui/icons-material/Textsms";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { Container, Tooltip } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import ChatComponent from "../components/ChatComponent";
import UserCard from "../components/UserCard";
import axios from "axios";
import { createContext } from "react";
export const changes = createContext();

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Social = () => {
  const [value, setValue] = React.useState(0);
  const [userData, setUserData] = React.useState([]);
  const [userData1, setUserData1] = React.useState([]);
  const [change, setchange] = React.useState(false);
  const [friendList, setfriednList] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});

  const userDetails = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/user/current-user/${localStorage.getItem("userId")}`
      );
      if (data?.success) {
        setCurrentUser(data?.user);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getUserdata = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/user/show-friends/${localStorage.getItem("userId")}`
      );
      if (data?.success) {
        setUserData(data?.otherUsers);
        setfriednList(data?.friendList);
        // console.log(data?.otherUsers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getRequests = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/user/requests/${localStorage.getItem("userId")}`
      );
      if (data?.success) {
        setUserData1(data?.friendRequestList);
        // console.log(data?.friendRequestList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getUserdata();
    getRequests();
    userDetails();
  }, [value, change]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <changes.Provider value={{ change, setchange }}>
      <div>
        <Header />
        <Box className="nav">
          {" "}
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              display: "flex",
              justifyContent: "center",
              mt: "1rem",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              sx={{ backgroundColor: "#3a3a3a", borderRadius: "10px" }}
            >
              {" "}
              <Tooltip title="Chats">
                <Tab
                  label={
                    <Typography
                      sx={{
                        color: "#ffff",
                        fontWeight: "bold",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        gap: "0.4rem",
                      }}
                    >
                      {" "}
                      <TextsmsIcon sx={{ color: "#4ADB9A" }} />
                      <Typography
                        sx={{
                          display: {
                            lg: "block",
                            md: "block",
                            sm: "block",
                            xs: "none",
                          },
                        }}
                      >
                        {" "}
                        Chats
                      </Typography>
                    </Typography>
                  }
                  {...a11yProps(0)}
                />
              </Tooltip>
              <Tooltip title="Add friend">
                <Tab
                  label={
                    <Typography
                      sx={{
                        color: "#ffff",
                        fontWeight: "bold",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        gap: "0.4rem",
                      }}
                    >
                      {" "}
                      <GroupAddIcon sx={{ color: "#4ADB9A" }} />
                      <Typography
                        sx={{
                          display: {
                            lg: "block",
                            md: "block",
                            sm: "block",
                            xs: "none",
                          },
                        }}
                      >
                        Add friend
                      </Typography>
                    </Typography>
                  }
                  {...a11yProps(1)}
                />
              </Tooltip>
            </Tabs>
          </Box>
          <Box>
            <CustomTabPanel value={value} index={0}>
              <ChatComponent />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <h3 style={{ alignSelf: "center" }}>People</h3>
              <Container
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: ".5em",
                  // border: "1px solid black",
                }}
              >
                {userData?.map((user) => {
                  if (user._id === localStorage.getItem("userId")) {
                    return null;
                  }
                  return (
                    <UserCard
                      key={user._id}
                      id={user._id}
                      user={user.username}
                      profile={user.Profile}
                      quotes={user.blogs.length}
                      requestSent={currentUser.friendRequests.includes(
                        user._id
                      )}
                    />
                  );
                })}
              </Container>
              <br />
              <h3 style={{ alignSelf: "center" }}>friends list</h3>
              <Container
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: ".5em",
                  // border: "1px solid black",
                }}
              >
                {friendList?.map((user) => {
                  if (user._id === localStorage.getItem("userId")) {
                    return null;
                  }
                  return (
                    <UserCard
                      key={user._id}
                      id={user._id}
                      user={user.username}
                      profile={user.Profile}
                      quotes={user.blogs.length}
                      friendList={true}
                    />
                  );
                })}
              </Container>
              <h3 style={{ alignSelf: "center" }}>friends requests</h3>
              <Container
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: ".5em",
                  // border: "1px solid black",
                }}
              >
                {userData1?.map((user) => {
                  if (user._id === localStorage.getItem("userId")) {
                    return null;
                  }
                  return (
                    <UserCard
                      key={user._id}
                      id={user._id}
                      user={user.username}
                      profile={user.Profile}
                      quotes={user.blogs.length}
                      request={true}
                    />
                  );
                })}
              </Container>
            </CustomTabPanel>
          </Box>
        </Box>
      </div>
    </changes.Provider>
  );
};

export default Social;
