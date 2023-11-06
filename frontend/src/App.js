// import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { createTheme, ThemeProvider } from "@mui/material";
import YourQuotes from "./pages/YourQuotes";

import { useSelector } from "react-redux/es/hooks/useSelector";
import Header from "./components/Header";
import Social from "./pages/Social";

const theme = createTheme({
  palette: {
    primary: { main: "#343435" },
    secondary: { main: "#000000" },
  },
  typography: {
    fontFamily: 'monospace',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 800,
  },
});




function App() {
  const isLogi = useSelector((state) => state.isLogin);
  // console.log(isLogi)
  return (
    <div >
      {/* <MovingBackground /> */}
      <ThemeProvider theme={theme}>  <BrowserRouter>
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/your-quotes" element={<YourQuotes />} />
          <Route path="/Social" element={<Social />} />

        </Routes>

      </BrowserRouter>
      </ThemeProvider>

    </div>
  );
}

export default App;
