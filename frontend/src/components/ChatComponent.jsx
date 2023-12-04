import {
  Avatar,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import VideocamIcon from "@mui/icons-material/Videocam";
import SendIcon from "@mui/icons-material/Send";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

const ChatComponent = () => {
  return (
    <Box
      sx={{
        // border: "1px solid #242425",
        height: "80vh",
        borderRadius: "10px",
        width: "90vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        className="main-Box-with-border"
        sx={{
          border: "0.2px solid #242425",
          height: "75vh",
          borderRadius: "10px",
          width: "80vw",
          display: "flex",
          justifyContent: "center",

        }}
      >
        <Box
          className="left-Component-scrollable"
          sx={{
            width: { lg: "20%", md: "30%", sm: "30%", xs: "100%" },
            height: "100%",
            borderRight: "1px solid #242425",
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        >
          <Box
            className="left-Header"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "10%",
              borderBottom: "1px solid #242425",
              gap: "10px",
            }}
          >
            <Avatar src="https://your-image-url.com/path-to-image.jpg" />{" "}
            <Typography>Aditya sinha</Typography>
          </Box>
          <Box
            className="userCards-replicate-this"
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              height: "8%",
              padding: "15px",
              gap: "1rem",
              flexWrap: "wrap",
              borderBottom: "1px solid #242425",

            }}
          >
            <Box sx={{    display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",gap:"1rem"}}>
            <Avatar src="https://your-image-url.com/path-to-image.jpg" />{" "}
            <Typography>Aditya sinha</Typography>
            </Box>
            <ChatBubbleIcon sx={{color:"#4ADB9A",height:"15px",width:"15px",backgroundColor:"#5e5959",borderRadius:"50%",padding:"10px",cursor:"pointer"}}/>

          </Box>
          
        </Box>
        <Box
          className="Right-Component"
          sx={{
            width: { lg: "80%", md: "70%", sm: "70%", xs: "0%" },
            height: "100%",
            position: "relative",
          }}
        >
          <Box
            className="Right-Header"
            sx={{
              display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "10%",
              borderBottom: "1px solid #242425",
              gap: "10px",
            }}
          >
            <Box sx={{paddingLeft:"10px",display:"flex",alignItems:"center",gap:"10px"}}>
            <Avatar src="https://your-image-url.com/path-to-image.jpg" />
            <Typography>Aditya sinha</Typography>
            </Box>

            < FiberManualRecordIcon sx={{height:"10px",width:"10px",color:"#45B382",ml:"auto"}}/>Online

           <Box sx={{paddingRight:"10px",display:"flex",alignItems:"center",gap:"10px",marginLeft:"auto"}}>
            <VideocamIcon sx={{padding:"10px",color:"#4ADB9A",backgroundColor:"#3A3A3A",borderRadius:"50%",mr:"10px",cursor:"pointer"}}/>
           
            < LocalPhoneIcon sx={{padding:"10px",color:"#4ADB9A",backgroundColor:"#3A3A3A",borderRadius:"50%",mr:"10px",cursor:"pointer"}}/>
          </Box>
          </Box>
          <Box
            className="MessageBODY"
            sx={{ height: "80%", width: "100%", overflowY: "scroll" }}
          >
            <Typography
              className="leftmessage"
              sx={{
                width: "auto",
                height: "auto",
                display: "flex",
                justifyContent: "flex-start",
                minHeight: "3rem",
                mt: "1rem",
              }}
            >
              <Box
                sx={{
                  ml: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.2rem",
                }}
              >
                <Avatar />
                <Box className="chats">
                  <Typography className="HEADER" sx={{ fontWeight: "bold" }}>
                    Aditys sinha{" "}
                  </Typography>
                  hey there sadasdasd wasfdas <Typography></Typography>
                </Box>{" "}
              </Box>
            </Typography>
            

            <Typography
              className="Rightmessage"
              sx={{
                mt:"1rem",
                width: "auto",
                height: "auto",
                display: "flex",
                justifyContent: "flex-end",
                minHeight: "3rem",
              }}
            >
              <Box
                sx={{
                  mr: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.2rem",
                }}
              >
                <Box className="chats">
                  <Typography className="HEADER" sx={{ fontWeight: "bold" }}>
                    Aditys sinha{" "}
                  </Typography>
                  hey there sadasdasd wasfdas <Typography></Typography>
                </Box>
                <Avatar />{" "}
              </Box>
              
              
            </Typography>
            <Typography
              className="leftmessage"
              sx={{
                width: "auto",
                height: "auto",
                display: "flex",
                justifyContent: "flex-start",
                minHeight: "3rem",
                mt: "1rem",
              }}
            >
              <Box
                sx={{
                  ml: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.2rem",
                }}
              >
                <Avatar />
                <Box className="chats">
                  <Typography className="HEADER" sx={{ fontWeight: "bold" }}>
                    Aditys sinha{" "}
                  </Typography>
                  hey there sadasdasd wasfdas <Typography></Typography>
                </Box>{" "}
              </Box>
            </Typography>
            
            <Box
              type="form"
              sx={{
                position: "absolute",
                bottom: "0px",
                width: "100%",
                display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
                alignItems: "center",
                height: "10%",
              }}
            >
              <TextField
                variant="filled"
                placeholder="Type your message"
                label="Type your message"
                sx={{ width: "90%" }}
              />
              <Button
                variant="contained"
                type="submit"
                endIcon={<SendIcon />}
                sx={{ height: "100%", width: "10%", color: "#4ADB9A" }}
              >
                {" "}
                send
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatComponent;
