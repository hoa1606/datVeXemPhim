import React, { useState, useEffect } from "react";
import { getTheaterInfo, getScheduleInfo } from "../aips/user";
import "./css/TheaterInfo.css"

const TheaterInfo = () => {
    const [theaterSystems, setTheaterSystems] = useState([]);
    const [selectedTheater, setSelectedTheater] = useState(null);
    const [schedule, setSchedule] = useState([]);


    useEffect(() => {
        const fetchTheaterSystems = async () => {
            try {
                const data = await getTheaterInfo();
                setTheaterSystems(data || []);
                if (data.length > 0) {
                    setSelectedTheater(data[0].maHeThongRap);
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


                                            if (isNaN(showtimeDate)) {
                                                return null;
                                            }

                                            return (
                                                <button key={showtime.maLichChieu} className="showtime-button">
                                                    {showtimeDate.toLocaleString()}
                                                </button>
                                            );
                                        })
                                    ) : (
                                        <p>No showtimes available</p>
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
