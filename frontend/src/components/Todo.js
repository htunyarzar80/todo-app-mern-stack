import React, { useEffect, useState } from "react";
import {
  div,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Card,
} from "@mui/material";
import { DataGrid, GridToolbar, gridClasses } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { deleteTodoAction, todoLoadAction } from "../redux/action/todoAction";
import CreateModal from "./CreateModal";
import UpdateModal from "./UpdateModal";

const Todo = (params) => {
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
  const numberedData = data.map((row, index) => ({
    number: index + 1,
    ...row,
  }));

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
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "170px",
          }}
        >
          <UpdateModal id={params.row._id} initialText={params.row.text} />
          <Button
            onClick={(e) => handleDeleteConfirmation(e, params.row._id)}
            variant="contained"
            color="error"
          >
            {<DeleteForeverRoundedIcon />}
          </Button>
        </div>
      ),
    },
  ];
  

  return (
    <>
      <div className="text-center justify-content-center todo p-5 container-fluid"
        style={{
          width:"80vh",
          direction:"column"
     
        }}
      >
        
        <div style={{ paddingBottom:"30px" , justifyContent: "space-between",display:"flex" }}>
        <Typography variant="h4" >
          Todo App ...
        </Typography>
         <CreateModal />

        </div>

        <Paper>
          <div >
            <DataGrid
              getRowId={(row) => row._id}
              sx={{pt:5,p:2,
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
          </div>
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
      </div>
      {/* {modal && <CreateModal onClose={handleCloseModal} />} */}
    </>
  );
};

export default Todo;
