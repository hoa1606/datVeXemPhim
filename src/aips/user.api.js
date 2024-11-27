import fetcher from './fetcher';

export const userApi = {
    login: async (data) => {
        // payload = { taiKhoan: 'string', matKhau: 'string' }
        try {
            const response = await fetcher.post('/QuanLyNguoiDung/DangNhap', data);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    // register, forgotPassword, changePassword, updateProfile, getListUser, deleteUser,...
};