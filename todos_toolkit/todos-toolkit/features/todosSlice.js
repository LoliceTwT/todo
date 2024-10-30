import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://6721816f98bbb4d93ca89379.mockapi.io/todos'; 

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addTodo = createAsyncThunk('todos/addTodo', async (newTodo) => {
  const response = await axios.post(API_URL, newTodo);
  return response.data;
});

const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    removeTodo: (state, action) => {
      return state.filter(todo => todo.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.push(action.payload);
      });
  },
});

export const { removeTodo } = todosSlice.actions;
export default todosSlice.reducer;
