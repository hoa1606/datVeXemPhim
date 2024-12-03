import fetcher from './fetcher';

export const userApi = {
  login: async (data) => {
    try {
      const response = await fetcher.post('/QuanLyNguoiDung/DangNhap', data);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  register: async (data) => {
    try {
      const response = await fetcher.post('/QuanLyNguoiDung/DangKy', data);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};