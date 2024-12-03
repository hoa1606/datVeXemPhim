import fetcher from './fetcher';

export const movieApi = {
  getMovieListPagination: async ({ page = 1, pageSize = 10 }) => {
    try {
      const response = await fetcher.get(
        `/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP01&soTrang=${page}&soPhanTuTrenTrang=${pageSize}`
      );

      return response.data.content;
    } catch (error) {
      throw error.response.data;
    }
  },
  deleteMovie: async (movieId) => {
    try {
      const response = await fetcher.delete(`/QuanLyPhim/XoaPhim?MaPhim=${movieId}`);

      return response.data.content;
    } catch (error) {
      throw error.response.data;
    }
  },
  addMovie: async (formData) => {
    try {
      const response = await fetcher.post('/QuanLyPhim/ThemPhimUploadHinh', formData);
      return response.data.content;
    } catch (error) {
      throw error.response.data;
    }
  },
  updateMovie: async (formData) => {
    try {
      const response = await fetcher.post(`/QuanLyPhim/CapNhatPhimUpload`, formData);
      return response.data.content;
    } catch (error) {
      throw error.response.data;
    }
  },
};

export const userAdminApi = {
  getUserListPagination: async ({ page = 1, pageSize = 20 }) => {
    try {
      const response = await fetcher.get(
        `/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?maNhom=GP01&soTrang=${page}&soPhanTuTrenTrang=${pageSize}`
      );

      return response.data.content;
    } catch (error) {
      throw error.response.data;
    }
  },
  deleteUser: async (userId) => {
    try {
      const response = await fetcher.delete(`/QuanLyNguoiDung/XoaNguoiDung?MaPhim=${userId}`);

      return response.data.content;
    } catch (error) {
      throw error.response.data;
    }
  },
  addUser: async (data) => {
    try {
      const response = await fetcher.post('/QuanLyNguoiDung/ThemNguoiDung', data);
      return response.data.content;
    } catch (error) {
      throw error.response.data;
    }
  },
  updateUser: async (formData) => {
    try {
      const response = await fetcher.post('/QuanLyPhim/CapNhatPhimUpload', formData);
      return response.data.content;
    } catch (error) {
      throw error.response.data;
    }
  },
};
