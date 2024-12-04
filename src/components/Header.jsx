import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Button,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { PATH } from "../routes/path";
import { logout } from "../store/slices/user.slices";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    setAnchorEl(null);
    navigate("/auth/login");
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogin = () => {
    navigate(PATH.LOGIN);
  };

  const handleRegister = () => {
    console.log("register");
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#191a1c", zIndex: 1201 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Ứng Dụng
        </Typography>

        <Box sx={{ display: 'flex', marginRight: 30, gap: 2 }}>
          <Button color="inherit">Lịch chiếu</Button>
          <Button color="inherit">Cụm rạp</Button>
          <Button color="inherit">Tin tức</Button>
          <Button color="inherit">Ứng dụng</Button>
        </Box>

        {!currentUser ? (
          <>
            <Button color="inherit" onClick={handleLogin}>
              Đăng nhập
            </Button>
            <Button color="inherit" onClick={handleRegister}>
              Đăng ký
            </Button>
          </>
        ) : (
          <>
            <Avatar onClick={handleMenu} sx={{ cursor: "pointer" }}>
              {currentUser.hoTen.charAt(0)}
            </Avatar>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
