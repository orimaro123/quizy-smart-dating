import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./routes/LoginPage";
import QuizPage from "./routes/QuizPage";
import BrainmatesPage from "./routes/BrainmatesPage";
import AchievementsPage from "./routes/AchievementsPage";
import ProfilePage from "./routes/ProfilePage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Layout from "./components/Layout/Layout";
import "monday-ui-react-core/dist/main.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#e42f45",
    },
    secondary: {
      main: "#7ca0e5",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="login" element={<LoginPage />} />
              <Route path="quiz" element={<QuizPage />} />
              <Route path="brainmates" element={<BrainmatesPage />} />
              <Route path="achievements" element={<AchievementsPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
