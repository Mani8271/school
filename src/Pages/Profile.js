import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Avatar,
  IconButton,
  Modal,
  TextField,
  Button,
  MenuItem,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useDispatch, useSelector } from 'react-redux';
import {
  GetuserprofileInitiate,
} from '../redux/actions/userprofile/getprofiledataAction';
import { UpdateprofiledataInitiate } from '../redux/actions/userprofile/updateprofiledataAction';
import { BASE_URL } from '../API/Constants';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userdata = useSelector((state) => state?.userdetails?.data?.data);
  const [profile, setProfile] = useState(null); // Initial state is null
  const [editProfile, setEditProfile] = useState(null); // Initial state is null

  useEffect(() => {
    dispatch(GetuserprofileInitiate());
  }, [dispatch]);

  useEffect(() => {
    if (userdata) {
      const initialProfile = {
        profileImage: userdata?.profilePicture
          ? `${BASE_URL}userdp/${userdata?.profilePicture}`
          : '',
        name: userdata?.firstName ? `${userdata?.firstName} ${userdata?.lastName}` : '',
        role: userdata?.role || '',
        address: userdata?.address || '',
        mobile: userdata?.mobileNumber || '',
        gender: userdata?.userTitle || '',
        email: userdata?.email || '',
      };
      setProfile(initialProfile);
      setEditProfile({ ...initialProfile });
    }
  }, [userdata]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) =>
    setEditProfile({ ...editProfile, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditProfile((prev) => ({
        ...prev,
        profileImage: URL.createObjectURL(file),
        profileFile: file, // store the actual File object
      }));
    }
  };

  let userRole = "User"; // default role if none found
  const userData = localStorage.getItem("user");
  if (userData) {
    const user = JSON.parse(userData);
    userRole = user.role || "User";
  }

  const disableButtons = userRole === "Bus Admin";

  const handleSave = () => {
    if (!editProfile.name || !editProfile.email) return;

    const formData = new FormData();
    formData.append("firstName", editProfile?.name?.split(" ")?.[0] || "");
    formData.append("lastName", editProfile?.name?.split(" ")?.slice(1).join(" ") || "");
    formData.append("email", editProfile.email);
    formData.append("mobileNumber", editProfile.mobile);
    formData.append("userTitle", editProfile.gender);
    formData.append("address", editProfile.address);
    formData.append("role", editProfile.role);

    if (editProfile.profileFile) {
      formData.append("profilePicture", editProfile.profileFile); // must match backend field name
    }

    dispatch(UpdateprofiledataInitiate(formData));
    handleClose();
  };

  if (!profile)
    return <Typography>Loading...</Typography>; // Render loading state

  const imageUrl = userdata.profilePicture
    ? `${BASE_URL}userdp/${userdata.profilePicture}`
    : "https://via.placeholder.com/120"; 

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Profile Container */}
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h5" fontWeight="bold">Profile</Typography>
          <IconButton onClick={handleOpen} aria-label="edit">
            <EditIcon />
          </IconButton>
        </div>

        {/* Profile Image & Name */}
        <div className="flex flex-col items-center text-center">
          <Avatar src={imageUrl} alt="Profile Picture" sx={{ width: 120, height: 120 }} className="mb-4" />
          <Typography variant="h6" fontWeight="bold">{profile.name}</Typography>
          <Typography variant="body1" color="textSecondary">{profile.role}</Typography>
        </div>

        {/* Profile Details */}
        <Box className="mt-4">
          {['address', 'mobile', 'gender', 'email'].map((field) => (
            <Box key={field} className="mb-3">
              <Typography variant="body2" fontWeight="bold" color="textPrimary">
                {field.charAt(0).toUpperCase() + field.slice(1)}:
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {profile[field]}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Conditional Buttons */}
        {!disableButtons && (
          <div className="flex justify-between mt-6 gap-4">
            <Link
              to="/forgot-password"
              className="inline-block px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition duration-200"
            >
              Change Password for Bus Admin
            </Link>
            <Link
              to="/register"
              className="inline-block px-4 py-2 text-sm text-green-600 border border-green-600 rounded-md hover:bg-green-50 transition duration-200"
            >
              Create Bus Admin
            </Link>
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      <Modal open={open} onClose={handleClose} aria-labelledby="edit-profile-modal">
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            bgcolor: "white",
            boxShadow: 3,
            p: 4,
            borderRadius: "12px",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, textAlign: "left" }}>
            Edit Profile
          </Typography>

          {/* Image Upload Section */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
            <Avatar src={editProfile.profileImage} sx={{ width: 150, height: 150, mb: 1 }} />
            <label htmlFor="image-upload">
              <input
                accept="image/*"
                id="image-upload"
                type="file"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <IconButton color="primary" component="span">
                <PhotoCameraIcon />
              </IconButton>
            </label>
          </Box>

          {/* Form Fields */}
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            <TextField label="Name" name="name" value={editProfile.name} onChange={handleChange} fullWidth variant="outlined" />
            <TextField label="Role" name="role" value={editProfile.role} onChange={handleChange} fullWidth variant="outlined" />
            <TextField label="Address" name="address" value={editProfile.address} onChange={handleChange} fullWidth variant="outlined" />
            <TextField label="Mobile" name="mobile" value={editProfile.mobile} onChange={handleChange} fullWidth variant="outlined" />
            <TextField
              select
              label="Gender"
              name="gender"
              value={editProfile.gender}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            >
              <MenuItem value="Mr">Mr</MenuItem>
              <MenuItem value="Miss">Mrs</MenuItem>
              <MenuItem value="Other">Miss</MenuItem>
            </TextField>
            <TextField label="Email" name="email" value={editProfile.email} onChange={handleChange} fullWidth variant="outlined" />
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button onClick={handleClose} color="secondary">Cancel</Button>
            <Button onClick={handleSave} variant="contained" color="primary">Save</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Profile;