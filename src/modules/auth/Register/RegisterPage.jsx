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

const schema = yup.object().shape({
  taiKhoan: yup.string().required("Tên đăng nhập không được để trống!"),
  matKhau: yup.string().required("Mật khẩu không được để trống!"),
  hoTen: yup.string().required("Họ tên không được để trống!"),
  email: yup.string().email("Email không hợp lệ!").required("Email không được để trống!"),
  soDt: yup.string().matches(/^[0-9]+$/, "Số điện thoại chỉ được chứa các số!").required("Số điện thoại không được để trống")
});

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate: handleRegister, isPending } = useMutation({
    mutationFn: (formValue) => {
      userApi.register(formValue);
      console.log("object");
    },
    onSuccess: (data) => {
      toast.success("Đăng ký thành công");
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
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "GP01",
      hoTen: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (formValue) => {
    handleRegister(formValue);
  };

  return (
    <Box className="w-1/2">
      <Typography fontSize={40} fontWeight={700} textAlign="center" component="h4">
        Đăng ký
      </Typography>
      <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <TextField
            {...register("taiKhoan")}
            fullWidth
            placeholder="Tài khoản"
            label="Tài khoản"
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
                    aria-label={showPassword ? "Ẩn mật khẩu" : "Hiển thị mật khẩu"}
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
            error={!!errors.matKhau}
            helperText={errors.matKhau?.message}
          />
          <TextField
            {...register("email")}
            fullWidth
            placeholder="Email"
            label="Email"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            {...register("soDt")}
            fullWidth
            placeholder="Số điện thoại"
            label="Số điện thoại"
            error={!!errors.soDt}
            helperText={errors.soDt?.message}
          />
          <TextField
            {...register("hoTen")}
            fullWidth
            placeholder="Họ tên"
            label="Họ tên"
            error={!!errors.hoTen}
            helperText={errors.hoTen?.message}
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
              Đăng ký
            </LoadingButton>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="button"
              onClick={() => navigate("/auth/login")}
            >
              Đăng nhập
            </Button>
          </Box>
        </Stack>
      </form>
    </Box>
  );
}