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

export default function SignUp() {
  const navigate = useNavigate();
  const [file, setFile] = React.useState(null);
  const [image, setImage] = React.useState(null);

  async function imageUploader(event) {
    setFile(event.target.files[0].name);

    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("ml_default", "image");
    // console.log(file);ssss
    formData.append("upload_preset", "new-upload");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dfd7uzelx/image/upload",
        formData
      );
      setImage(response.data.secure_url);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newdata = new FormData(event.currentTarget);

    // console.log(data.get("firstName"));

    try {
      // console.log(image);
      const { data } = await axios.post("/api/v1/user/register", {
        username: newdata.get("firstName"),
        email: newdata.get("email"),
        password: newdata.get("password"),
        Profile: image,
      });
      console.log(data);
      if (data.success) {
        alert("Registrastion successFull,please login ");
        navigate("/login");
      }
    } catch (error) {
      alert("wrong password");
      console.log(error);
    }
  };

  return (
    <Box
      className="Home-main-container"
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
        sx={{
          border: "0.1px solid black",
          borderRadius: "10px",
          maxWidth: { lg: "30vw", md: "30", sm: "80vw", xs: "85vw" },
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
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
