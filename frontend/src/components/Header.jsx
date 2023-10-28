import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Logo from "../Images/logo (2).png";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import HomeIcon from "@mui/icons-material/Home";
import { useDispatch } from "react-redux";
import { authActions } from "../Redux/Store";
import { useNavigate } from "react-router-dom";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";

function Header() {
  const isLogi = useSelector((state) => state.isLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      alert("success logout");
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const isLogin = useSelector((state) => state.isLogin);

  console.log(localStorage.getItem("userName"));
  const [userName, setUsername] = React.useState(
    localStorage.getItem("userName")
  );

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <AppBar
        position="relative"
        sx={{
          width: { lg: "70vw", md: "70vw", sm: "90vw", xs: "90vw" },
          borderRadius: "10px",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Avatar
              src={Logo}
              sx={{
                display: { xs: "none", md: "flex", lg: "Flex", sm: "none" },
                mr: 1,
              }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              QuotA
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Button
                    textAlign="center"
                    startIcon={<ImportContactsIcon sx={{ color: "#4ADB9A" }} />}
                    LinkComponent={Link}
                    to="/"
                  >
                    AllQuotes
                  </Button>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Button
                    textAlign="center"
                    startIcon={<FormatQuoteIcon sx={{ color: "#4ADB9A" }} />}
                    LinkComponent={Link}
                    to="your-quotes"
                  >
                    YourQuotes
                  </Button>
                </MenuItem>
              </Menu>
            </Box>

            <Avatar
              src={Logo}
              sx={{
                display: { xs: "flex", md: "none", lg: "none", sm: "flex" },
                mr: 1,
              }}
            />
            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              QuotA
            </Typography>
            <Box
              sx={{
                flexGrow: 1,

                display: { xs: "none", md: "flex" },
                justifyContent: "center",
                gap: "3rem",
              }}
            >
              {" "}
              <Link to={"/"} style={{ textDecoration: "none" }}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "0.2rem",
                  }}
                >
                  <ImportContactsIcon sx={{ color: "#4ADB9A" }} /> AllQuotes
                </Button>
              </Link>
              <Link to={"/your-quotes"} style={{ textDecoration: "none" }}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FormatQuoteIcon sx={{ color: "#4ADB9A" }} /> YourQuotes
                </Button>
              </Link>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {/* <Avatar alt="Remy Sharp" src={Logo} /> */}

                  <InsertEmoticonIcon
                    sx={{ height: "35px", width: "35px", color: "#4ADB9A" }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Box>{userName && <>{userName}</>}</Box>
                </MenuItem>
                <MenuItem
                  onClick={handleCloseUserMenu}
                  sx={{ backgroundColor: "#4ADB9A", borderRadius: "1px" }}
                >
                  {isLogi ? (
                    <>
                      {" "}
                      <Typography
                        onClick={handleLogout}
                        textAlign="center"
                        color={"secondary"}
                      >
                        logout
                      </Typography>
                    </>
                  ) : (
                    <>
                      {" "}
                      <Link
                        to={"/login"}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <Typography>login</Typography>
                      </Link>
                    </>
                  )}
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
export default Header;
