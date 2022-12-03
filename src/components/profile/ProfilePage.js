import React, { useContext, useEffect } from "react";
import { Stack, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ProfilePage = () => {
  const { isLoggedIn, userId, login, logout } = useContext(AuthContext);

  const [email, setEmail] = React.useState("");
  const [address, setAddress] = React.useState("");

  const [fetch, setFetch] = React.useState(false);

  async function getUserData() {
    axios
      .get(`http://localhost:5000/${userId}`)
      .then((res) => {
        let data = res.data;
        console.log(data[0]);
        setEmail(data[0]["Email"]);
        setAddress(data[0]["Address"]);
        // setUsername(response.username)
        // setTotalBalance(getTotalBalance(response))
      })
      .catch((err) => {
        console.error(err);
        alert("unable to retrieve user data");
      });
  }

  useEffect(() => {
    getUserData();
  }, [fetch]);

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

  const postData = async () => {
    axios({
      method: "post",
      url: `http://localhost:5000/${userId}`,
      data: {
        email: email,
        address: address,
      },
    })
      .then((res) => {
        console.log(res);
        isEditAddress(false);
        isEditEmail(false);
      })
      .catch((err) => {
        console.error(err);
        alert("unable to post user data");
      });
  };

  const submitChange = async (event) => {
    event.preventDefault();
    postData();
    setFetch((prevState) => !prevState);
    alert("submit done");
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
