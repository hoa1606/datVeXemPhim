import React from "react";
import { useNavigate } from "react-router-dom";

import { Mutation, useMutation } from "@tanstack/react-query";

import { toast } from "react-hot-toast";

import { useForm } from "react-hook-form";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { userApi } from "../../../aips/user.api";
import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import { setCurrentUser } from '../../../store/slices/user.slices';
import { PATH } from '../../../routes/path';

const schema = yup.object().shape({
  taiKhoan: yup.string().required("Tên đăng nhập không được để trống!"),
  matKhau: yup.string().required("Mật khẩu không được để trống!"),
});

export default function LoginPage() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  

  const { mutate: handleLogin, isPending } = useMutation({
    mutationFn: (formValue) => userApi.login(formValue),
    onSuccess: (data) => {
      toast.success('Đăng nhập thành công');
      const currentUser = data.content;
      dispatch(setCurrentUser(currentUser))
      currentUser.maLoaiNguoiDung === 'QuanTri' ? navigate(PATH.ADMIN) : navigate(PATH.HOME);
    },
    onError: (error) => {
      toast.error(error.content);
    },
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValue: {
      taiKhoan: "",
      matKhau: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (formValue) => {
    handleLogin(formValue);
  };

  return (
    <>
      <Box className="w-1/2 ">
        <Typography
          fontSize={40}
          fontWeight={700}
          textAlign={"center"}
          component="h4"
        >
          Đăng nhập
        </Typography>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <TextField
              {...register("taiKhoan")}
              fullWidth
              placeholder="Tài khoản"
              label="Tài khoản"
              name="taiKhoan"
              error={!!errors.taiKhoan}
              helperText={errors.taiKhoan?.message}
            />
            <TextField
              {...register("matKhau")}
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              fullWidth
              placeholder="Mật khẩu"
              label="Mật khẩu"
              name="matKhau"
              error={!!errors.matKhau}
              helperText={errors.matKhau?.message}
            />
            <Box className="flex gap-6">
              <LoadingButton
                loading={isPending}
                disabled={isPending}
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
              >
                Đăng nhập
              </LoadingButton>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="button"
                onClick={() => navigate('/auth/register')}
              >
                Đăng kí
              </Button>
            </Box>
          </Stack>
        </form>
      </Box>
    </>
  );
}

