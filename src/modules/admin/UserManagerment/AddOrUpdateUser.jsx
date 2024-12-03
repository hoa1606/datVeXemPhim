import React, { useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Controller, useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { DeleteOutlined } from '@mui/icons-material';
import { format } from 'date-fns';

export default function AddOrUpdateUser({ isOpen, onClose, dataEdit, onSubmit }) {

  const inputFileRef = useRef(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      hoTen: '',
      email: '',
      taiKhoan: '',
      matKhau: '',
      soDt: '',
      maLoaiNguoiDung: '',
    },
  });


  useEffect(() => {
    if (dataEdit) {
      setValue('hoTen', dataEdit.hoTen);
      setValue('email', dataEdit.email);
      setValue('taiKhoan', dataEdit.taiKhoan);
      setValue('matKhau', dataEdit.matKhau);
      setValue('soDt', dataEdit.soDt);
      setValue('maLoaiNguoiDung', dataEdit.maLoaiNguoiDung);
    }
  }, [dataEdit]);


  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth='lg'>
      <form className='w-[550px]' onSubmit={handleSubmit((data) => onSubmit(data, dataEdit?.id))}>
        <DialogTitle>{dataEdit ? 'Edit user' : 'Add user'}</DialogTitle>
        <Stack spacing={4} p={3}>
          <TextField label='Họ và tên' fullWidth {...register('hoTen')} />
          <TextField label='Email' fullWidth {...register('email')} />
          <TextField label='Tài Khoản' fullWidth {...register('taiKhoan')} />
          <TextField label='Mật khẩu' fullWidth {...register('matKhau')} />
          <TextField label='Số điện thoại' fullWidth {...register('soDt')} />
          <TextField label='Loại người dùng' fullWidth {...register('maLoaiNguoiDung')} />

        </Stack>

        <DialogActions>
          <Button onClick={onClose }>Cancel</Button>
          <Button type='submit' >{dataEdit ? 'Save Changes' : 'Add'}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}