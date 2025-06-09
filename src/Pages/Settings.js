import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatePasswordInitiate } from "../redux/actions/loginandsignup/updatePasswordAction";

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }

    setError("");

    const formData = {
      password: oldPassword,
      newPassword: newPassword,
    };

     dispatch(updatePasswordInitiate(formData, (success) => {
    if (success) {
    
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      console.log("Password updated successfully");
     }
     }));
}

  return (
    <div className="p-4 sm:p-6 flex justify-center items-center min-h-screen">
      <Box className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <Typography variant="h5" className="font-bold text-left">
          Change Password
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box className="space-y-4 mt-5">
            <TextField
              label="Old Password"
              type="password"
              fullWidth
              variant="outlined"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              placeholder="Enter your old password"
            />
            <TextField
              label="New Password"
              type="password"
              fullWidth
              variant="outlined"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              placeholder="Enter your new password"
            />
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm your new password"
            />

            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}

            <div className="flex justify-center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                className="w-full sm:w-auto px-6 py-2"
              >
                Update Password
              </Button>
            </div>
          </Box>
        </form>
      </Box>
    </div>
  );
};

export default Settings;
