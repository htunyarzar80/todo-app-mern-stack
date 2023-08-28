import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { DataGrid, GridToolbar, gridClasses } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { deleteTodoAction, todoLoadAction } from "../redux/action/todoAction";

const Todo = () => {
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(null);

  useEffect(() => {
    dispatch(todoLoadAction());
  }, [dispatch]);

  const { todos } = useSelector((state) => state.loadTodos);
  console.log("Todos====>", todos);
  let data = [];
  data = todos !== undefined && todos.length > 0 ? todos : [];
  const numberedData = data.map((row, index) => ({ number: index + 1, ...row }));

  const handleDeleteConfirmation = (e, todo_id) => {
    e.preventDefault();
    setSelectedTodoId(todo_id);
    setOpenDialog(true);
  };

  const handleDeleteCompany = () => {
    setOpenDialog(false);
    if (selectedTodoId) {
      dispatch(deleteTodoAction(selectedTodoId));
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTodoId(null);
  };
  //delete job by Id

  const columns = [
    {
        field: "number",
        headerName: "No",
        width: 60,
      },
    {
      field: "text",
      headerName: "Text",
      width: 150,
    },

    {
      field: "Actions",
      width: 200,
      renderCell: (values) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "170px",
          }}
        >
          <Button variant="contained">
            <Link style={{ color: "dark", textDecoration: "none" }}>
              {<EditNoteRoundedIcon />}
            </Link>
          </Button>

          <Button
            onClick={(e) => handleDeleteConfirmation(e, values.row._id)}
            variant="contained"
            color="error"
          >
            {<DeleteForeverRoundedIcon />}
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <>
       <Box p={3}>
        <Typography variant="h4" sx={{ pb: 3 }}>
          Todo App ...
        </Typography>
        <Box sx={{ pb: 2, display: "flex", justifyContent: "flex-end" }}>
          {/* Add your buttons or components here */}
        </Box>

        <Paper>
          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              getRowId={(row) => row._id}
              sx={{
                "& .MuiTablePagination-displayedRows": {
                  color: "dark",
                },
                color: "dark",
                [`& .${gridClasses.row}`]: {
                  bgcolor: "dark",
                },
                button: {
                  color: "#2d2d2d",
                },
              }}
              rows={numberedData}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              slots={{ toolbar: GridToolbar }}
            />
          </Box>
        </Paper>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle
            className="text-center"
            sx={{
              bgcolor: "#eee",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Delete Company
          </DialogTitle>
          <DialogContent sx={{ bgcolor: "#eee" }}>
            <DialogContentText>
              Are you sure you want to delete ?
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ bgcolor: "#2d2d2d" }}>
            <Button onClick={handleCloseDialog} sx={{ bgcolor: "#eee" }}>
              Cancel
            </Button>
            <Button
              onClick={handleDeleteCompany}
              variant="contained"
              color="error"
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default Todo;
