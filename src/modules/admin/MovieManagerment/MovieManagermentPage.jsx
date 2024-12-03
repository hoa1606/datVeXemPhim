import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { movieApi } from "../../../aips/movie.api";
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
import AddOrUpdateMovie from "./AddOrUpdateMovie";
import useOpen from "../../../hooks/useOpen";

export default function MovieManagementPage() {
  const [page, setPage] = useState(1);

  const { open, handleClickOpen, onClose } = useOpen();

  const [isAddOrUpdate, setIsAddOrUpdate] = useState(false);
  const [dataEdit, setDataEdit] = useState(null);
  const [movieId, setMovieId] = useState(null);

  const queryClient = useQueryClient();

  const handleClose = () => {
    if (!isPending) {
      onClose();
      setMovieId(null);
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["movieList", page],
    queryFn: () => movieApi.getMovieListPagination({ page }),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (id) => movieApi.deleteMovie(id),
    onError: (error) => {
      toast.success("Xóa phim thất bại. Vui lòng thử lại");
    },
    onSuccess: (response) => {
      toast.success("Xóa phim thành công");
      queryClient.refetchQueries(["movieList", page]);
    },
    onSettled: () => {
      onClose();
      setMovieId(null);
    },
  });

  const { mutate: mutateAddMovie } = useMutation({
    mutationFn: (formData) => movieApi.addMovie(formData),
    onError: (error) => {
      toast.success("Thêm phim thất bại. Vui lòng thử lại");
    },
    onSuccess: (response) => {
      toast.success("Thêm phim thành công");
      queryClient.refetchQueries(["movieList", page]);
      setIsAddOrUpdate(false);
    },
  });

  const { mutate: mutateUpdateMovie } = useMutation({
    mutationFn: (formData) =>{ movieApi.updateMovie(formData);
      console.log("call api:  ",formData);
    },
    onError: (error) => {
      toast.success("Sửa phim thất bại. Vui lòng thử lại");
    },
    onSuccess: (response) => {
      toast.success("Sửa phim thành công");
      queryClient.refetchQueries(["movieList", page]);
      setIsAddOrUpdate(false);
    },
  });

  const items = data?.items || [];
  const count = data?.totalPages || 0;

  const handleDeleteMovie = () => {
    mutate(movieId);
  };

  const handleAddOrEditMovie = (formValues) => {
    if (dataEdit) {
      const formData = new FormData();
      formData.append("maPhim", dataEdit.maPhim);
      formData.append("maNhom", "GP01");
      formData.append("tenPhim", formValues.tenPhim);
      formData.append("trailer", formValues.trailer);
      formData.append("moTa", formValues.moTa);
      formData.append("ngayKhoiChieu", formValues.ngayKhoiChieu);
      formData.append("danhGia", formValues.danhGia);
      formData.append("hinhAnh", formValues.hinhAnh);
      formData.append("hot", formValues.hot);
      formData.append("dangChieu", formValues.trangThai);
      formData.append("sapChieu", !formValues.trangThai);
      mutateUpdateMovie(formData);
      // goi api cap nhat phim
    } else {
      const formData = new FormData();
      formData.append("maNhom", "GP01");
      formData.append("tenPhim", formValues.tenPhim);
      formData.append("trailer", formValues.trailer);
      formData.append("moTa", formValues.moTa);
      formData.append("ngayKhoiChieu", formValues.ngayKhoiChieu);
      formData.append("danhGia", formValues.danhGia);
      formData.append("hinhAnh", formValues.hinhAnh);
      formData.append("hot", formValues.hot);
      formData.append("dangChieu", formValues.trangThai);
      formData.append("sapChieu", !formValues.trangThai);
      mutateAddMovie(formData);
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
          Add movie
        </Button>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 200 }}>Tên phim</TableCell>
              <TableCell sx={{ width: 120 }}>Hình ảnh</TableCell>
              <TableCell sx={{ width: 220 }}>Mô tả</TableCell>
              <TableCell>Ngày khởi chiếu</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Độ hot</TableCell>
              <TableCell>Đánh giá</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => {
              return (
                <TableRow key={item.maPhim}>
                  <TableCell>{item.tenPhim}</TableCell>
                  <TableCell>
                    <img src={item.hinhAnh} alt={item.tenPhim} width="100" />
                  </TableCell>
                  <TableCell>
                    <Typography
                      width={280}
                      sx={{
                        display: "-webkit-box",
                        overflow: "hidden",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 3,
                      }}
                    >
                      {item.moTa || "N/A"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {format(new Date(item.ngayKhoiChieu), "dd/MM/yyyy hh:mm")}
                  </TableCell>
                  <TableCell>
                    {item.dangChieu ? (
                      <Chip
                        icon={<SyncOutlinedIcon fontSize="16px" />}
                        variant="outlined"
                        color="success"
                        label={"Đang chiếu"}
                      />
                    ) : (
                      <Chip
                        icon={<AccessTimeOutlinedIcon fontSize="14px" />}
                        variant="outlined"
                        color="primary"
                        label={"Sắp chiếu"}
                      />
                    )}
                  </TableCell>
                  <TableCell>{item.hot ? "🔥" : "N/A"}</TableCell>
                  <TableCell>{item.danhGia}</TableCell>
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
                          setMovieId(item.maPhim);
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

      {/* DELETE MOVIE DIALOG */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete movie ?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this movie ?
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
            onClick={handleDeleteMovie}
            autoFocus
          >
            OK
          </LoadingButton>
        </DialogActions>
      </Dialog>

      {/* ADD OR UPDATE MOVIE DIALOG */}
      <AddOrUpdateMovie
        isOpen={isAddOrUpdate}
        onClose={() => {
          setIsAddOrUpdate(false);
          setDataEdit(null);
        }}
        onSubmit={handleAddOrEditMovie}
        dataEdit={dataEdit}
      />
    </Box>
  );
}
