import React, { useState } from 'react';
import { Box, Grid, Button, Typography } from '@mui/material';
import { getMovies } from '../aips/user';
import './css/MovieSchedule.css';

const MovieSchedule = () => {
    const [movies, setMovies] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);


    React.useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data = await getMovies();
                setMovies(data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, []);

    const moviesPerPage = 4;

    // chạy carousel
    const handlePrev = () => {
        setCurrentIndex((prev) => Math.max(prev - moviesPerPage, 0));
    };

    const handleNext = () => {
        setCurrentIndex((prev) =>
            Math.min(prev + moviesPerPage, movies.length - moviesPerPage)
        );
    };

    return (
        <Box className="movie-schedule" sx={{ paddingTop: '50px', backgroundColor: '#191a1c', color: 'white' }}>
            <Typography variant="h4" align="center" sx={{ marginBottom: '40px', marginTop: '40px' }}>

            </Typography>
            <Grid container spacing={2}>
                {movies.slice(currentIndex, currentIndex + moviesPerPage).map((movie) => (
                    <Grid item xs={12} sm={6} md={3} key={movie.maPhim}>
                        <Box className="movie-card">
                            <img
                                src={movie.hinhAnh}
                                alt={movie.tenPhim}
                                className="movie-image"
                                style={{
                                    width: '100%',
                                    height: '250px',
                                    objectFit: 'cover',
                                    borderRadius: '10px',
                                }}
                            />
                            <Box className="movie-info" sx={{ marginTop: '10px', fontSize: 40 }}>
                                <Typography variant="p">{movie.tenPhim}</Typography>
                                <Typography variant="body2" fontSize={20} color="white">
                                    {movie.moTa.slice(0, 100)}...
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px', }}>
                <Button
                    variant="outlined"
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    sx={{ marginRight: '10px' }}
                >
                    Prev
                </Button>
                <Button
                    variant="outlined"
                    onClick={handleNext}
                    disabled={currentIndex + moviesPerPage >= movies.length}
                >
                    Next
                </Button>
            </Box>
        </Box >
    );
};

export default MovieSchedule;
