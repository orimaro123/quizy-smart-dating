import { Link } from "react-router-dom";
import { useState } from "react";
import "./navbar.css";
import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import PsychologyIcon from "@mui/icons-material/Psychology";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PersonIcon from "@mui/icons-material/Person";

export default function Navbar() {
  //takes the navbar firs value from current window location
  const currentPage = window.location.href.split("/").pop();
  const [value, setValue] = useState(currentPage);

  return (
    <Box>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          component={Link}
          value="quiz"
          to="/quiz"
          label="Quiz"
          icon={<PsychologyIcon sx={{ fontSize: 40 }} />}
        />
        <BottomNavigationAction
          component={Link}
          value="brainmates"
          to="/brainmates"
          label="Brainmates"
          icon={<FavoriteIcon sx={{ fontSize: 40 }} />}
        />
        <BottomNavigationAction
          component={Link}
          value="achievements"
          to="/achievements"
          label="Achievements"
          icon={<EmojiEventsIcon sx={{ fontSize: 40 }} />}
        />
        <BottomNavigationAction
          component={Link}
          value="profile"
          to="/profile"
          label="Profile"
          icon={<PersonIcon sx={{ fontSize: 40 }} />}
        />
      </BottomNavigation>
    </Box>
  );
}
