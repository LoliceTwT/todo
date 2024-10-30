import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    removeTodo: (state, action) => {
      return state.filter(todo => todo.id !== action.payload); 
    },
    setTodos: (state, action) => {
      return action.payload;
    },
  },
});

export const { addTodo, removeTodo, setTodos } = todoSlice.actions;
export default todoSlice.reducer;
