import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { todoUpdateAction } from "../redux/action/todoAction";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";

const validationSchema = yup.object({
  text: yup.string("Enter a text").required("Text is required"),
});

const UpdateModal = ({ id, initialText, onClose }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCloseDialog = () => {
    setOpenDialog(false);
    // onClose(); // Close the modal
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const formik = useFormik({
    initialValues: {
      text: initialText,
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      dispatch(todoUpdateAction(id, values));
      actions.resetForm();
      navigate("/");
      handleCloseDialog(); // Close the dialog
    },
  });

  return (
    <>
      <Button variant="contained" onClick={handleOpenDialog}>
      {<EditNoteRoundedIcon />}
      </Button>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <Box
          onSubmit={formik.handleSubmit}
          component="form"
          className="form_style border-style"
        >
          <DialogTitle sx={{justifyContent:"center",alignItems:"center"}}>Update Todo</DialogTitle>
          <Box p={3}>
            <TextField
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
              sx={{pb:3}}
            />
            <Button fullWidth variant="contained" type="submit" >
              Update
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default UpdateModal;
