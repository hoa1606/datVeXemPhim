import React, { useState, useEffect } from "react";
import { getTheaterInfo, getScheduleInfo } from "../aips/user";
import "./css/TheaterInfo.css"

const TheaterInfo = () => {
    const [theaterSystems, setTheaterSystems] = useState([]); // Danh sách rạp
    const [selectedTheater, setSelectedTheater] = useState(null); // Rạp được chọn
    const [schedule, setSchedule] = useState([]); // Danh sách lịch chiếu phim

    // Lấy danh sách hệ thống rạp khi component được mount
    useEffect(() => {
        const fetchTheaterSystems = async () => {
            try {
                const data = await getTheaterInfo();
                setTheaterSystems(data || []);
                if (data.length > 0) {
                    setSelectedTheater(data[0].maHeThongRap); // Mặc định chọn rạp đầu tiên
                }
            } catch (error) {
                console.error("Error fetching theater systems:", error);
            }
        };
        fetchTheaterSystems();
    }, []);

    // Lấy lịch chiếu khi chọn rạp
    useEffect(() => {
        if (!selectedTheater) return;
        const fetchSchedule = async () => {
            try {
                const data = await getScheduleInfo(selectedTheater);
                setSchedule(data || []);
            } catch (error) {
                console.error("Error fetching schedule:", error);
            }
        };
        fetchSchedule();
    }, [selectedTheater]);
    console.log(schedule)
    return (
        <div className="theater-schedule-container">
            <div className="theater-list">
                <h3>Danh sách rạp</h3>
                <ul>
                    {theaterSystems.map((theater) => (
                        <li
                            key={theater.maHeThongRap}
                            className={`theater-item ${selectedTheater === theater.maHeThongRap ? "active" : ""}`}
                            onClick={() => setSelectedTheater(theater.maHeThongRap)}
                        >
                            <img
                                src={theater.logo}
                                alt={theater.tenHeThongRap}
                                className="theater-logo"
                            />
                            <p>{theater.tenHeThongRap}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="movieschedule">
                <h3>Phim đang chiếu tại rạp {selectedTheater && theaterSystems.find(t => t.maHeThongRap === selectedTheater)?.tenHeThongRap}</h3>
                <div className="moviecards">
                    {schedule.map((movie) => (
                        <div key={movie.maPhim} className="moviecard">
                            <div className="movie-left">
                                <img src={movie.hinhAnh} alt={movie.tenPhim} className="movie-logo" />
                                <p>{movie.message}</p>
                                <h1>{movie.status}</h1>
                            </div>
                            <div className="movie-right">
                                <h4>{movie.tenPhim}</h4>
                                <div className="showtimes">
                                    {movie.lstLichChieuTheoPhim && movie.lstLichChieuTheoPhim.length > 0 ? (
                                        movie.lstLichChieuTheoPhim.map((showtime) => {
                                            const showtimeDate = new Date(showtime.ngayChieuGioChieu);

                                            // Kiểm tra xem ngày giờ có hợp lệ không
                                            if (isNaN(showtimeDate)) {
                                                return null; // Nếu ngày giờ không hợp lệ, không hiển thị
                                            }

                                            return (
                                                <button key={showtime.maLichChieu} className="showtime-button">
                                                    {showtimeDate.toLocaleString()} {/* Hiển thị thời gian dưới dạng chuỗi */}
                                                </button>
                                            );
                                        })
                                    ) : (
                                        <p>No showtimes available</p> // Nếu không có lịch chiếu, hiển thị thông báo
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>

    );
};
export default TheaterInfo;
