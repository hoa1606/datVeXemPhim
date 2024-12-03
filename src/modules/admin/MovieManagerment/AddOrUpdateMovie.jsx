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

export default function AddOrUpdateMovie({ isOpen, onClose, dataEdit, onSubmit }) {
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
      tenPhim: '',
      trailer: '',
      moTa: '',
      danhGia: '',
      ngayKhoiChieu: null,
      trangThai: true,
      hot: false,
      hinhAnh: null,
    },
  });

  const fieldHinhAnh = watch('hinhAnh');

  const previewImage = (file) => {
    if (typeof file === 'string' && file.startsWith('http')) {
      return file;
    }
    const url = file ? URL.createObjectURL(file) : '';
    return url;
  };

  useEffect(() => {
    if (dataEdit) {
      setValue('tenPhim', dataEdit.tenPhim);
      setValue('trailer', dataEdit.trailer);
      setValue('moTa', dataEdit.moTa);
      setValue('danhGia', dataEdit.danhGia);
      setValue('ngayKhoiChieu', dataEdit.ngayKhoiChieu);
      setValue('trangThai', dataEdit.dangChieu);
      setValue('hot', dataEdit.hot);
      setValue('hinhAnh', dataEdit.hinhAnh);
    }
  }, [dataEdit]);

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth='lg'>
      <form className='w-[550px]' onSubmit={handleSubmit((data) => onSubmit(data, dataEdit?.id))}>
        <DialogTitle>{dataEdit ? 'Edit movie' : 'Add movie'}</DialogTitle>
        <Stack spacing={4} p={3}>
          <TextField label='Movie name' fullWidth {...register('tenPhim')} />
          <TextField label='Trailer' fullWidth {...register('trailer')} />
          <TextField label='Descriptions' multiline minRows={4} fullWidth {...register('moTa')} />
          <TextField label='Review' fullWidth {...register('danhGia')} />

          <Controller
            name='ngayKhoiChieu'
            control={control}
            render={({ field }) => {
              return (
                <DatePicker
                  format='DD/MM/YYYY'
                  onChange={(date) => {
                    const formatDate = dayjs(date).format('DD/MM/YYYY');
                    field.onChange(formatDate);
                  }}
                  defaultValue={
                    dataEdit?.ngayKhoiChieu
                      ? dayjs(format(dataEdit?.ngayKhoiChieu, 'dd/MM/yyy'), 'DD/MM/YYYY')
                      : null
                  }
                />
              );
            }}
          />

          <Stack direction='row' alignItems='center' justifyContent='space-between'>
            <Controller
              name='trangThai'
              control={control}
              render={({ field }) => {
                return (
                  <RadioGroup
                    row
                    {...field}
                    defaultValue={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.value === 'true');
                    }}
                  >
                    <FormControlLabel value={true} control={<Radio />} label='Showing' />
                    <FormControlLabel value={false} control={<Radio />} label='Coming soon' />
                  </RadioGroup>
                );
              }}
            />

            <FormControlLabel control={<Checkbox {...register('hot')} />} label='Hot' />
          </Stack>

          <Box
            sx={{
              height: 200,
              border: '1px dashed gray',
              borderRadius: 2,
              cursor: 'pointer',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
            onClick={() => {
              !fieldHinhAnh && inputFileRef.current.click();
            }}
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            {!fieldHinhAnh ? (
              <>
                <CloudUploadIcon sx={{ width: 40, height: 40 }} />
                <Typography fontSize={24} fontWeight={600}>
                  Upload image
                </Typography>
              </>
            ) : (
              <Box width='100%' height='100%' position='relative'>
                <IconButton
                  sx={{ position: 'absolute', top: 4, right: 4, zIndex: 10 }}
                  onClick={() => {
                    setValue('hinhAnh', null);
                  }}
                >
                  <DeleteOutlined />
                </IconButton>
                <img src={previewImage(fieldHinhAnh)} className='w-full h-full object-cover' />
              </Box>
            )}
          </Box>

          <input
            type='file'
            accept='.png, .jpg, .jpeg'
            hidden
            ref={inputFileRef}
            onChange={(event) => {
              setValue('hinhAnh', event.target.files[0]);
            }}
          />
        </Stack>

        <DialogActions>
          <Button onClick={onClose }>Cancel</Button>
          <Button type='submit' >{dataEdit ? 'Save Changes' : 'Add'}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}