import React, { useContext } from "react";
import { Stack, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ProfilePage = () => {
  const { isLoggedIn, userId, login, logout } = useContext(AuthContext);

  const [email, setEmail] = React.useState("");
  const [address, setAddress] = React.useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const [editEmail, isEditEmail] = React.useState(false);
  const [editAddress, isEditAddress] = React.useState(false);

  const toggleEditEmail = () => {
    isEditEmail(true);
  };
  const toggleEditAddress = () => {
    isEditAddress(true);
  };

  const submitChange = async (event) => {
    event.preventDefault();
    const res = await fetch(`http://localhost:5000/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        address: address,
      }),
    });
  };

  return (
    <div style={{ margin: "0 5rem" }}>
      <h1>Profile</h1>
      <form>
        <Stack spacing={2}>
          <div>
            <div style={{ display: "flex" }}>
              <label style={{ width: "50vw" }}>Email: </label>
              <TextField
                sx={{ width: "50vw" }}
                value={email}
                disabled={!editEmail}
                onChange={handleEmailChange}
              />
              <Button variant="contained" onClick={toggleEditEmail}>
                Edit
              </Button>
            </div>
          </div>
          <div>
            <div style={{ display: "flex" }}>
              <label style={{ width: "50vw" }}>Address: </label>
              <TextField
                sx={{ width: "50vw" }}
                value={address}
                disabled={!editAddress}
                onChange={handleAddressChange}
              />
              <Button variant="contained" onClick={toggleEditAddress}>
                Edit
              </Button>
            </div>
          </div>
          <Button variant="contained" onClick={submitChange}>
            Save Changes
          </Button>
        </Stack>
      </form>
      <Button
        variant="outlined"
        fullWidth
        sx={{ marginTop: "2rem" }}
        component={Link}
        to="/home"
      >
        Back
      </Button>
    </div>
  );
};

export default ProfilePage;