import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBranch } from "../Pages/Branches";
import {
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  IconButton,
  Typography,
  Select,
  FormControl,
} from "@mui/material";
import { Notifications } from "@mui/icons-material";
import Chatbox from "../Pages/Chatbox"; // Import Chatbox component
import { BASE_URL } from "../API/Constants";
import { GetuserprofileInitiate } from "../redux/actions/userprofile/getprofiledataAction";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [notificationCount] = useState(5);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openChatbot, setOpenChatbot] = useState(false);
  useEffect(() => {
      dispatch(GetuserprofileInitiate());
    }, [dispatch]);
  
const userdata = useSelector((state) => state?.userdetails?.data?.data);
  // Available branches
  const branches = ["Main Branch", "City Branch", "Westside Branch"];

  // Handlers
  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleProfileMenuClose = () => setAnchorEl(null);
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userCredentials');
    navigate("/login"); // Redirect to login
  };
 
  const imageUrl = userdata?.profilePicture
    ? `${BASE_URL}userdp/${userdata?.profilePicture}`
    : "https://via.placeholder.com/120";
   

  return (
    <div className="fixed top-0 left-[240px] w-[calc(100%-240px)] h-16 bg-gray-900 text-white shadow-lg z-50 flex items-center justify-between px-4 md:px-6 transition-all duration-300">
      {/* Left Side: Dashboard Title */}
      <Typography variant="h6" className="font-bold">
        ADMIN DASHBOARD
      </Typography>
      <div className="flex items-center space-x-6">
       {/*notifications*/}
       <Tooltip title="Notifications" arrow>
          <IconButton onClick={() => navigate("/notifications")}>
            <Badge color="error" badgeContent={notificationCount} variant="dot">
              <Notifications fontSize="large" className="text-gray-300" />
            </Badge>
          </IconButton>
        </Tooltip>

        {/* Profile */}
        <div>
          <IconButton onClick={handleProfileMenuOpen} className="cursor-pointer">
            <Avatar
              alt="Profile Picture"
              src={
                imageUrl ||
                "https://thumbs.dreamstime.com/b/profile-picture-caucasian-male-employee-posing-office-happy-young-worker-look-camera-workplace-headshot-portrait-smiling-190186649.jpg"
              }
              sx={{ width: 40, height: 40 }}
            />
          </IconButton>

          {/* Profile Menu */}
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleProfileMenuClose}>
            <MenuItem onClick={() => { handleProfileMenuClose(); navigate("/profile"); }}>
              Profile
            </MenuItem>
            <MenuItem onClick={() => { handleProfileMenuClose(); handleLogout(); }}>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </div>

      {/* Chatbox Component */}
      <Chatbox open={openChatbot} onClose={() => setOpenChatbot(false)} userName={userdata?.firstname} />
    </div>
  );
};

export default Navbar;
