import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { createTodoAction } from "../redux/action/todoAction";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  text: yup.string("Enter a text").required("Text is required"),
});

const CreateModal = (props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const formik = useFormik({
    initialValues: {
      text: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      dispatch(createTodoAction(values));
      actions.resetForm();
      navigate("/");
      setOpenDialog(false);
    },
  });
  return (
    <>
      <Button onClick={handleOpenDialog}>Create ToDo</Button>

      <Dialog open={openDialog} onClose={handleCloseDialog} sx={{}}>
        <Box
          onSubmit={formik.handleSubmit}
          component="form"
          className="form_style border-style"
          sx={{ bgcolor: "dark", color: "#eee", width: "500px",height:"300px" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor:"#eee",
              p:3
            
            }}
          >
            <Typography variant="h5" component="h2" sx={{ pb: 3 ,color:"#2d2d2d"}}>
              Create Todo
            </Typography>
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="text"
              label="Text"
              name="text"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="text"
              value={formik.values.text}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.text && Boolean(formik.errors.text)}
              helperText={formik.touched.text && formik.errors.text}
            />
            <Button fullWidth variant="contained" type="submit">
              Create Todo
            </Button>
            ry
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default CreateModal;
