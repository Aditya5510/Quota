import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import { Link } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../Redux/Store";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newdata = new FormData(event.currentTarget);

    try {
      const { data } = await axios.post("/api/v1/user/login", {
        email: newdata.get("email"),
        password: newdata.get("password"),
      });
      //   console.log(newdata.status);
      if (data.success) {
        localStorage.setItem("userId", data?.user._id);
        localStorage.setItem("userName", data?.user.username);
        localStorage.setItem("Profile", data?.user.Profile);

        dispatch(authActions.login());
        alert("Loggin you in");
        navigate("/");
      } else {
        if (data.message === "user not regisred") {
          alert("User not registered,Please register first");
          navigate("/signup");
        }
      }
    } catch (error) {
      alert("Internal Server error ,please try again later.");
      // console.log(error);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            display: { lg: "block", md: "none", sm: "none", xs: "none" },
            height: "100%",
            maxWidth: { lg: "30vw", md: "0", sm: "0", xs: "0" },
            height: { lg: "46vh", md: "0vh", sm: "0", xs: "0" },
            backgroundColor: "transparent",
            borderRadius: "5px",
            border: "0.1px solid black",
            padding: "3rem",
            textAlign: "justify",
            // position: "absolute",
          }}
        >
          Quotations, conversations, and companionship—login to quotA for it all
        </Box>
        <Box
          className="Home-main-container"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* <div className="star1" /> */}
          <Container
            component="Box"
            sx={{
              border: "0.1px solid black",
              borderRadius: "5px",
              maxWidth: { lg: "30vw", md: "30vw", sm: "80vw", xs: "85vw" },
            }}
          >
            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 1 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item sx={{ mt: 3, mb: 4 }}>
                    <Link to="/signup" style={{ color: "black" }}>
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
}
