import axios from "axios";
import { toast } from "react-toastify";
import {
  CREATE_TODO_FAIL,
  CREATE_TODO_REQUEST,
  CREATE_TODO_SUCCESS,
  DELETE_TODO_FAIL,
  DELETE_TODO_REQUEST,
  DELETE_TODO_SUCCESS,
  TODO_LOAD_FAIL,
  TODO_LOAD_REQUEST,
  TODO_LOAD_SINGLE_FAIL,
  TODO_LOAD_SINGLE_REQUEST,
  TODO_LOAD_SINGLE_SUCCESS,
  TODO_LOAD_SUCCESS,
  UPDATE_TODO_FAIL,
  UPDATE_TODO_REQUEST,
  UPDATE_TODO_SUCCESS,
} from "../constants/todoConstant";

export const todoLoadAction = () => async (dispatch) => {
  dispatch({ type: TODO_LOAD_REQUEST });
  try {
    const url = "/api/";
    const { data } = await axios.get(url);
    dispatch({
      type: TODO_LOAD_SUCCESS,
      payload: data,
    });
    console.log("data====>", data);
  } catch (error) {
    dispatch({
      type: TODO_LOAD_FAIL,
      payload: error.response.data.error,
    });
  }
};

//Create TODO
export const createTodoAction = (todo) => async (dispatch) => {
  dispatch({ type: CREATE_TODO_REQUEST });

  try {
    const { data } = await axios.post("/api/create", todo);
    dispatch({
      type: CREATE_TODO_SUCCESS,
      payload: data,
    });
    toast.success("Todo is created successfully");
    dispatch(todoLoadAction());
  } catch (error) {
    dispatch({
      type: CREATE_TODO_FAIL,
      payload: error.response?.data?.error,
    });
    toast.error(error.response?.data?.error);
  }
};

// single TODO action
export const todoLoadSingleAction = (id) => async (dispatch) => {
  dispatch({ type: TODO_LOAD_SINGLE_REQUEST });
  const url = `/api/${id}`;
  try {
    const { data } = await axios.get(url);
    console.log("data", data);
    dispatch({
      type: TODO_LOAD_SINGLE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TODO_LOAD_SINGLE_FAIL,
      payload: error.response.data.error,
    });
  }
};

//delete action
export const deleteTodoAction = (id) => async (dispatch) => {
  dispatch({ type: DELETE_TODO_REQUEST });

  try {
    console.log("in the try");
    const { data } = await axios.delete(`/api/delete/${id}`);

    dispatch({ type: DELETE_TODO_SUCCESS, payload: data });
    toast.success("TODO deleted successfully");
    dispatch(todoLoadAction());
  } catch (error) {
    console.log("in the catch");
    dispatch({
      type: DELETE_TODO_FAIL,
      payload:
        error.response?.data?.error || "Something went wrong during deletion",
    });
    toast.error(
      error.response?.data?.error || "Something went wrong during deletion"
    );
  }
};

//UpdateById
export const todoUpdateAction = (id, updatedTodoData) => async (dispatch) => {
  dispatch({ type: UPDATE_TODO_REQUEST });
  const url = `/api/update/${id}`;
  try {
    const { data } = await axios.put(url, updatedTodoData);
    console.log("data", data);
    dispatch({
      type: UPDATE_TODO_SUCCESS,
      payload: data,
    });
    toast.success("Successfully Updated");
  } catch (error) {
    dispatch({
      type: UPDATE_TODO_FAIL,
      payload: error.response.data.error,
    });
  }
};
