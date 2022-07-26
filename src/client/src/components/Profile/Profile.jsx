import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { Box, TextField, Slider, Switch, Button, Select, MenuItem } from "@mui/material";
import style from "./profile.module.css";


export default function Profile({
  profile,
  updateProfileAction,
  showErrorAction,
  setTriviaAction
}) {

  const navigate = useNavigate();
  useEffect(() => {
    if (profile && !profile.email) {
      navigate("/login");
      return;
    }
  }, [profile, navigate]);

  const [edit, setEdit] = useState(false);
  const [profileObj, setProfileObj] = useState(profile);

  const isDetailsFull = useCallback(() => {
    return Object.keys(profileObj)
      .map((key) => !!profileObj[key])
      .every((field) => !!field);
  }, [profileObj]);

  useEffect(() => {
    setProfileObj(profile);
    if (profile && profile.id && !profile.location) {
      async function setTriviaStatistics(id) {
        await setTriviaAction(id);
      }
      setTriviaStatistics(profile.id);
      showErrorAction("Save your personal details to save your game progress");
    }
    setEdit(!isDetailsFull());
  }, [profile]);

  const handleChange = (event) => {
    setProfileObj({
      ...profileObj,
      [event.target.id || event.target.name]: event.target.value,
    });
  };

  const handlePreferencesAgeRangeChange = (event) => {
    setProfileObj({
      ...profileObj,
      ["preferences"]: {
        ...profileObj.preferences,
        minAge: event.target.value[0],
        maxAge: event.target.value[1],
      },
    });
  };

  const handlGenderChange = (event) => {
    setProfileObj({
      ...profileObj,
      gender: event.target.value,
    });
  };

  const handlePrefGenderChange = (event) => {
    setProfileObj({
      ...profileObj,
      ["preferences"]: {
        ...profileObj.preferences,
        gender: event.target.value,
      },
    });
  };

  const handleRelationsChange = (value) => {
    setProfileObj({
      ...profileObj,
      ["preferences"]: {
        ...profileObj.preferences,
        relation_type: value,
      },
    });
  };

  const handleSave = () => {
    if (isDetailsFull()) {
      updateProfileAction(profileObj);
      setEdit(false);
    } else {
      showErrorAction("You missed some details");
    }
  };

  return profile && profile.id ? (
    <div className={style.profile_container}>
      <div className={style.profile_top_container}>
        <div className={style.profile_picture_container}>
          <img
            className={style.profile_picture}
            src={profileObj.picture}
            alt="profile-picture"
          />
        </div>
        <h1>{profileObj.email}</h1>
      </div>
      <div className={style.info_container}>
        <Box className={style.info_field_container}>
          <TextField
            type={"text"}
            disabled={!edit}
            label="User Name"
            id="userName"
            value={profileObj.userName || ""}
            onChange={handleChange}
          />
        </Box>
        <Box className={style.info_field_container}>
          <Select
            disabled={!edit}
            className={style.gender_select}
            id="gender"
            value={profileObj.gender || ""}
            onChange={handlGenderChange}
          >
            <MenuItem value={"male"}>Male</MenuItem>
            <MenuItem value={"female"}>Female</MenuItem>
            <MenuItem value={"other"}>Other</MenuItem>
          </Select>
          <TextField
            className={style.age_select}
            type={"number"}
            max={55}
            min={18}
            disabled={!edit}
            label="Age"
            id="age"
            value={profileObj.age || ""}
            onChange={handleChange}
          />
        </Box>
        <Box className={style.info_field_container}>
          <TextField
            inputProps={{ inputMode: "tel" }}
            disabled={!edit}
            label="Phone Number"
            id="phone"
            value={profileObj.phone || ""}
            onChange={handleChange}
          />
        </Box>
        <Box className={style.info_field_container}>
          <TextField
            disabled={!edit}
            label="Location"
            id="location"
            value={profileObj.location || ""}
            onChange={handleChange}
          />
        </Box>
      </div>
      <div className={style.preferences_container}>
        <Box className={style.pref_field_container}>
          <h1>Relations</h1>
          <span className={style.rel_pref}>
            <h1>Friendly</h1>
            <Switch
              color="primary"
              disabled={!edit}
              onChange={(e) => {
                handleRelationsChange(e.target.checked ? "romantic" : "friendly");
              }}
              checked={profileObj.preferences.relation_type === "romantic"}
            />
            <h2>Romantic</h2>
          </span>
        </Box>
        <Box className={style.pref_field_container}>
          <h1>Mate Age</h1>
          <span className={style.pref_age_slider_container}>
            <h2>{profileObj.preferences.minAge}</h2>
            <Slider
              disabled={!edit}
              className={style.pref_age_slider}
              value={
                [profileObj.preferences.minAge, profileObj.preferences.maxAge] || [20, 45]
              }
              onChange={handlePreferencesAgeRangeChange}
              valueLabelDisplay="auto"
              min={18}
              max={55}
            />
            <h2>{profileObj.preferences.maxAge}</h2>
          </span>
        </Box>
        <Box className={style.pref_field_container}>
          <h1>Mate Gender</h1>
          <Select
            disabled={!edit}
            className={style.pref_gender_select}
            id="gender"
            value={profileObj.preferences.gender || "any"}
            label="Gender"
            onChange={handlePrefGenderChange}
          >
            <MenuItem value={"male"}>Male</MenuItem>
            <MenuItem value={"female"}>Female</MenuItem>
            <MenuItem value={"any"}>Any</MenuItem>
          </Select>
        </Box>
      </div>
      {edit ? (
        <div className={style.save_cancel_btn_container}>
          <Button
            variant="contained"
            onClick={() => {
              handleSave();
            }}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setProfileObj(profile);
              setEdit(false);
            }}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <div className={style.save_cancel_btn_container}>
          <Button
            variant="contained"
            onClick={() => {
              setEdit(true);
            }}
          >
            Edit
          </Button>
        </div>
      )}
    </div>
  ) : null;
}
