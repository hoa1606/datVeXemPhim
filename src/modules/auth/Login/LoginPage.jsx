import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../../../aips/user.api';
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
} from '@mui/material';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    taiKhoan: '',
    matKhau: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await userApi.login(formData);
      console.log('Login Success:', response);
      localStorage.setItem('userToken', response.accessToken);
      navigate('/');
    } catch (err) {
      setError(err || 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{
      width: '100%',
      height: '100vh',
      backgroundColor: '#191a1c',
      display: 'flex',
      justifyContent: 'center',
    }}>
      <Box
        sx={{
          width: '100%',
          maxWidth: '400px',
          margin: 'auto',
          padding: '20px',
          border: '1px solid #141b23',
          borderRadius: '8px',
          backgroundColor: '#616468',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          color: 'white',
        }}
      >
        <Typography variant="h5" align="center" >
          Đăng Nhập
        </Typography>
        {error && (
          <Alert severity="error" sx={{ marginBottom: '16px' }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Tài Khoản"
            name="taiKhoan"
            value={formData.taiKhoan}
            onChange={handleChange}
            margin="normal"
            required
            gutterBottom
            sx={{
              color: 'white',
              '& .MuiInputLabel-root': { color: 'white' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#fff' },
                '&:hover fieldset': { borderColor: '#141b23' },
                '&.Mui-focused fieldset': { borderColor: '#fff' },
              },
              '& .MuiInputBase-input': { color: 'white' },
            }}
          />
          <TextField
            fullWidth
            label="Mật Khẩu"
            name="matKhau"
            type="password"
            value={formData.matKhau}
            onChange={handleChange}
            margin="normal"
            required
            sx={{
              color: 'white',
              '& .MuiInputLabel-root': { color: 'white' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#fff' },
                '&:hover fieldset': { borderColor: '#141b23' },
                '&.Mui-focused fieldset': { borderColor: '#fff' },
              },
              '& .MuiInputBase-input': { color: 'white' },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"

            sx={{ marginTop: '16px', backgroundColor: '#0d1017' }}
            disabled={loading}
          >
            {loading ? 'Đang xử lý...' : 'Đăng Nhập'}
          </Button>
        </form>
        <Typography align="center" sx={{ marginTop: '16px' }}>
          Bạn chưa có tài khoản?{' '}
          <Button
            onClick={() => navigate('/register')}
            variant="text"
            color="green"
            size="small"
            sx={{
              color: 'white',
              '&:hover': {
                color: 'black',
              },
            }}
          >
            Đăng Ký
          </Button>
        </Typography>
      </Box>
    </Box>
  );
}

