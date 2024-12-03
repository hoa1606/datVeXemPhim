import React, { useEffect, useState } from 'react';
import useDebounce from '../../../hooks/useDebounce';


import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userAdminApi } from "../../../aips/movie.api";
import {
  Box,
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Pagination,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Breadcrumbs,
} from "@mui/material";
import { format } from "date-fns";
import SyncOutlinedIcon from "@mui/icons-material/SyncOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { LoadingButton } from "@mui/lab";
import toast from "react-hot-toast";
import { Add, PlusOne } from "@mui/icons-material";
import AddOrUpdateUser from "./AddOrUpdateUser";
import useOpen from "../../../hooks/useOpen";

export default function UserManagementPage() {
  // const [searchValues, setSearchValues] = useState('');

  // const { debouncedValue } = useDebounce(searchValues, 500);

  // useEffect(() => {
  //   if (searchValues) {
  //     console.log('searchValues', searchValues);
  //   }
  // }, [searchValues]);

  // useEffect(() => {
  //   console.log('debouncedValue', debouncedValue);
  // }, [debouncedValue]);

  const [page, setPage] = useState(1);

  const { open, handleClickOpen, onClose } = useOpen();

  const [isAddOrUpdate, setIsAddOrUpdate] = useState(false);
  const [dataEdit, setDataEdit] = useState(null);
  const [userId, setUserId] = useState(null);

  const queryClient = useQueryClient();

  const handleClose = () => {
    if (!isPending) {
      onClose();
      setUserId(null);
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userList", page],
    queryFn: () => userAdminApi.getUserListPagination({ page }),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (id) => userAdminApi.deleteUser(id),
    onError: (error) => {
      toast.success("Xóa người dùng thất bại. Vui lòng thử lại");
    },
    onSuccess: (response) => {
      toast.success("Xóa người dùng thành công");
      queryClient.refetchQueries(["userList", page]);
    },
    onSettled: () => {
      onClose();
      setUserId(null);
    },
  });

  const { mutate: mutateAddUser } = useMutation({
    mutationFn: (formData) => userAdminApi.addUser(formData),
    onError: (error) => {
      toast.success("Thêm người dùng thất bại. Vui lòng thử lại");
    },
    onSuccess: (response) => {
      toast.success("Thêm người dùng thành công");
      queryClient.refetchQueries(["userList", page]);
      setIsAddOrUpdate(false);
    },
  });

  const { mutate: mutateUpdateUser } = useMutation({
    mutationFn: (formData) =>{ userAdminApi.updateUser(formData);
      console.log("call api:  ",formData);
    },
    onError: (error) => {
      toast.success("Sửa người dùng thất bại. Vui lòng thử lại");
    },
    onSuccess: (response) => {
      toast.success("Sửa người dùng thành công");
      queryClient.refetchQueries(["userList", page]);
      setIsAddOrUpdate(false);
    },
  });

  const items = data?.items || [];
  const count = data?.totalPages || 0;

  const handleDeleteUser = () => {
    mutate(userId);
  };

  const handleAddOrEditUser = (formValues) => {
    if (dataEdit) {
      
      // goi api cap nhat phim
    } else {
      const formData = new FormData();
      formData.append("maNhom", "GP01");
      formData.append("hoTen", formValues.hoTen);
      formData.append("email", formValues.email);
      formData.append("taiKhoan", formValues.taiKhoan);
      formData.append("matKhau", formValues.matKhau);
      formData.append("soDt", formValues.soDt);
      formData.append("maLoaiNguoiDung", formValues.maLoaiNguoiDung);
      mutateAddUser(formData);
    }
  };

  return (
    <Box>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={4}
      >
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="text.primary">Admin</Typography>
          <Typography color="text.primary">Dashboard</Typography>
          <Typography color="text.primary">Movie Management</Typography>
        </Breadcrumbs>

        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => {
            setIsAddOrUpdate(true);
            setDataEdit(null);
          }}
        >
          Add user
        </Button>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 200 }}>Họ tên</TableCell>
              <TableCell sx={{ width: 120 }}>Email</TableCell>
              <TableCell sx={{ width: 220 }}>Tài khoản</TableCell>
              <TableCell>Số điện thoại</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => {
              return (
                <TableRow key={item.taiKhoan}>
                  <TableCell>{item.hoTen}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.taiKhoan}</TableCell>
                  <TableCell>{item.matKhau}</TableCell>
                  <TableCell>{item.soDt}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={2}>
                      <IconButton
                        onClick={() => {
                          setDataEdit(item);
                          console.log(item);
                          setIsAddOrUpdate(true);
                        }}
                      >
                        <EditOutlinedIcon color="warning" />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setUserId(item.maPhim);
                          handleClickOpen();
                        }}
                      >
                        <DeleteOutlineOutlinedIcon color="error" />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {!isLoading && items.length === 0 && (
          <Box
            height={200}
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography textAlign="center">Không có dữ liệu</Typography>
          </Box>
        )}
        {isLoading && (
          <Box
            height={200}
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress />
          </Box>
        )}
        {!isLoading && isError && (
          <Box
            height={200}
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography textAlign="center">
              Có lỗi xảy ra, vui lòng thử lại.
            </Typography>
          </Box>
        )}
        <Box my={6} display="flex" justifyContent="flex-end">
          <Pagination
            count={count}
            onChange={(_event, page) => {
              setPage(page);
            }}
          />
        </Box>
      </TableContainer>

      {/* DELETE USER DIALOG */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete user ?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this user ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={isPending} variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <LoadingButton
            loading={isPending}
            variant="contained"
            disabled={isPending}
            onClick={handleDeleteUser}
            autoFocus
          >
            OK
          </LoadingButton>
        </DialogActions>
      </Dialog>

      {/* ADD OR UPDATE USER DIALOG */}
      <AddOrUpdateUser
        isOpen={isAddOrUpdate}
        onClose={() => {
          setIsAddOrUpdate(false);
          setDataEdit(null);
        }}
        onSubmit={handleAddOrEditUser}
        dataEdit={dataEdit}
      />
    </Box>
  );
}

