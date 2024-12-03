import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Grid, Button } from '@mui/material';
import { getMovieDetails } from '../../../aips/user'; // API để lấy chi tiết phim
import './MovieDetailPage.css'; // CSS tùy chỉnh
import Schedule from './Schedule';
import './Schedule.css'





const MovieDetailPage = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [movie, setMovie] = useState(null); // State lưu chi tiết phim
  const [loading, setLoading] = useState(true); // Trạng thái loading

  // Fetch dữ liệu chi tiết phim
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const data = await getMovieDetails(id); // Gọi API với id
        setMovie(data); // Lưu dữ liệu phim vào state
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <Typography variant="h4" align="center">Đang tải...</Typography>;
  }

  if (!movie) {
    return <Typography variant="h4" align="center">Không tìm thấy thông tin phim!</Typography>;
  }

  return (
    <Box className="movie-detail-page" sx={{ padding: '20px', backgroundColor: '#191a1c', color: 'white' }}>
      <Grid container spacing={4}>
        {/* Phần hình ảnh */}
        <Grid item xs={12} md={4}>
          <img
            src={movie.hinhAnh}
            alt={movie.tenPhim}
            style={{
              width: '100%',
              borderRadius: '10px',
              objectFit: 'cover',
            }}
          />
        </Grid>

        {/* Phần thông tin */}
        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            {movie.tenPhim}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '20px' }}>
            {movie.moTa}
          </Typography>
          <Typography variant="h6" sx={{ marginBottom: '10px' }}>
            Ngày khởi chiếu: {new Date(movie.ngayKhoiChieu).toLocaleDateString()}
          </Typography>

          <Button
            variant="contained"
            sx={{ backgroundColor: '#ff5722' }}
            onClick={() => alert('Chức năng đặt vé đang phát triển!')}
          >
            Đặt vé
          </Button>
        </Grid>
      </Grid>
      <Schedule movieId={id} />
    </Box>

  );
};

export default MovieDetailPage;
