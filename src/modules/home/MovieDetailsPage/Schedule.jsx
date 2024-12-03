import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Button, CircularProgress } from '@mui/material';
import { getTheaterInfo, getScheduleInfo } from '../../../aips/user'; // Import API
import './Schedule.css';

const Schedule = ({ movieId }) => {
    const [heThongRap, setHeThongRap] = useState([]);
    const [lichChieu, setLichChieu] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch thông tin hệ thống rạp
    useEffect(() => {
        const fetchTheaterInfo = async () => {
            try {
                setLoading(true);
                const data = await getTheaterInfo(); // Lấy danh sách hệ thống rạp từ API
                setHeThongRap(data); // Cập nhật dữ liệu hệ thống rạp
            } catch (error) {
                console.error('Error fetching system theaters:', error);
            }
        };

        fetchTheaterInfo();
    }, []);

    // Fetch lịch chiếu cho từng rạp dựa trên maHeThongRap
    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                setLoading(true);
                const schedules = [];
                for (const rap of heThongRap) {
                    const scheduleData = await getScheduleInfo(rap.maHeThongRap); // Lấy lịch chiếu từ API
                    schedules.push({ ...rap, lichChieu: scheduleData }); // Cập nhật dữ liệu lịch chiếu cho từng rạp
                }
                setLichChieu(schedules); // Cập nhật dữ liệu lịch chiếu
                setLoading(false);
            } catch (error) {
                console.error('Error fetching schedules:', error);
                setLoading(false);
            }
        };

        if (heThongRap.length > 0) {
            fetchSchedules();
        }
    }, [heThongRap]); // Chạy lại mỗi khi heThongRap thay đổi

    if (loading) {
        return <CircularProgress />; // Hiển thị loading khi đang tải
    }

    if (!lichChieu.length || !heThongRap.length) {
        return <Typography variant="h6" align="center">Không có lịch chiếu nào.</Typography>;
    }

    return (
        <Box className="schedule-container">
            {lichChieu.map((rap) => (
                <Box key={rap.maHeThongRap} className="schedule-item">
                    {/* Logo và tên rạp */}
                    <Box className="theater-info">
                        <img
                            src={rap.logo}
                            alt={rap.tenHeThongRap}
                            className="theater-logo"
                        />
                        <Typography variant="h6" className="theater-name">
                            {rap.tenHeThongRap}
                        </Typography>
                    </Box>
                    {/* Lịch chiếu
                    <Grid container spacing={1} className="schedule-times">
                        {rap.lichChieu.map((cumRap) =>
                            cumRap.lichChieuPhim.map((lich, idx) => (
                                <Grid item key={idx}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        onClick={() =>
                                            alert(
                                                `Chọn suất chiếu: ${lich.ngayChieuGioChieu}`
                                            )
                                        }
                                    >
                                        {new Date(
                                            lich.ngayChieuGioChieu
                                        ).toLocaleDateString()}{' '}
                                        ~{' '}
                                        {new Date(
                                            lich.ngayChieuGioChieu
                                        ).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </Button>
                                </Grid>
                            ))
                        )}
                    </Grid> */}
                </Box>
            ))}
        </Box>
    );
};

export default Schedule;
