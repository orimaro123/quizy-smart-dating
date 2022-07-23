import { Link } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import PsychologyIcon from "@mui/icons-material/Psychology";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EqualizerIcon from "@mui/icons-material/Equalizer";
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
          label="quiz"
          icon={<PsychologyIcon />}
        />
        <BottomNavigationAction
          component={Link}
          value="brain-mates"
          to="/brain-mates"
          label="brain mates"
          icon={<FavoriteIcon />}
        />
        <BottomNavigationAction
          component={Link}
          value="statistic"
          to="/statistic"
          label="statistic"
          icon={<EqualizerIcon />}
        />
        <BottomNavigationAction
          component={Link}
          value="profile"
          to="/profile"
          label="profile"
          icon={<PersonIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}
