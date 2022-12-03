import React from "react";
import { Stack, TextField, Button } from "@mui/material";

const ProfilePage = () => {
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
          <Button variant="contained">Save Changes</Button>
        </Stack>
      </form>
      <Button variant="outlined" fullWidth sx={{ marginTop: "2rem" }}>
        Back
      </Button>
    </div>
  );
};

export default ProfilePage;
