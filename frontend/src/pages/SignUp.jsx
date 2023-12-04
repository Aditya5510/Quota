import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import img from"../Images/logo (2).png"

export default function SignUp() {
  const navigate = useNavigate();
  const [file, setFile] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const [suck, setSuck] = React.useState(true);

  async function imageUploader(event) {
    setSuck(false);
    setFile(event.target.files[0].name);

    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("ml_default", "image");

    formData.append("upload_preset", "new-upload");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dfd7uzelx/image/upload",
        formData
      );
      setImage(response.data.secure_url);
      if (response.data.secure_url) {
        setSuck(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newdata = new FormData(event.currentTarget);

    // console.log(data.get("firstName"));

    try {
      console.log(image);
      const { data } = await axios.post("/api/v1/user/register", {
        username: newdata.get("firstName"),
        email: newdata.get("email"),
        password: newdata.get("password"),
        Profile: image,
      });
      // console.log(data);
      if (data.success) {
        alert("Registrastion successFull,please login ");
        navigate("/login");
      }
    } catch (error) {
      alert("Server Error");
      // console.log(error);
    }
  };

  return (
    <Box
     
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        component="main"
        className="main-Box-with-border"
      
        sx={{
          border: "0.01px solid black",
          borderRadius: "10px",
          maxWidth: { lg: "30vw", md: "30", sm: "80vw", xs: "85vw" },
          backgroundColor:"#bcd4cb6a"
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
           <Avatar sx={{ m: 1 }} src={img}/>
          
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Name"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>

            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextField
                name="upload-photo"
                type="file"
                sx={{ mt: "1rem" }}
                onChange={imageUploader}
              />
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!suck}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item sx={{ mb: 4 }}>
                <Link to="/login" style={{ color: "black" }}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
