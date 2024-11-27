import fetcher from './fetcher';

// API lấy danh sách phim
export const getBanners = async () => {
    const response = await fetcher.get("/QuanLyPhim/LayDanhSachBanner");
    return response.data.content;
};

// API: Lấy danh sách phim
export const getMovies = async () => {
    const response = await fetcher.get("/QuanLyPhim/LayDanhSachPhim?maNhom=GP01");
    return response.data.content;
};

// API: Lấy thông tin hệ thống rạp
export const getTheaterInfo = async () => {
    const response = await fetcher.get("/QuanLyRap/LayThongTinHeThongRap");
    return response.data.content;
};

// API lấy lịch chiếu phim của cụm rạp
export const getScheduleInfo = async (maHeThongRap) => {
    const response = await fetcher.get(`/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}`);
    return response.data.content;
};


