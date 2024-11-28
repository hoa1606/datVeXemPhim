import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../routes/path';

const Header = () => {

    const navigate = useNavigate();
    const handleLogin = () => {
        navigate(PATH.LOGIN);
    };

    const handleRegister = () => {
        console.log("register")
    };
    return (
        <AppBar position="fixed" sx={{ backgroundColor: '#191a1c', zIndex: 1201 }}>
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


                <Box sx={{ marginLeft: 'auto', display: 'flex', gap: 2 }}>
                    <Button color="inherit" onClick={handleLogin}>
                        Đăng nhập
                    </Button>
                    <Button color="inherit" onClick={handleRegister}>
                        Đăng ký
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
