import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { getBanners } from '../aips/user';

const Banner = () => {
    const [banner, setBanner] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const banners = await getBanners();
                if (banners && banners.length > 0) {
                    setBanner(banners[0]);
                }
            } catch (error) {
                console.error('Error fetching banners:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBanner();
    }, []);

    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '400px',
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (!banner) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '400px',
                    backgroundColor: '#f0f0f0',
                }}
            >
                <Typography variant="h6">Không có dữ liệu banner</Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: '600px',
                backgroundImage: `url(${banner.hinhAnh})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: '#fff',
                    textAlign: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    padding: '20px',
                    borderRadius: '8px',
                }}
            >
            </Box>
        </Box>
    );
};

export default Banner;
