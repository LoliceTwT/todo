import axios from 'axios';

const API_URL = 'https://6721816f98bbb4d93ca89379.mockapi.io/todos';

export const fetchTodos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addTodo = async (newTodo) => {
  const response = await axios.post(API_URL, newTodo);
  return response.data;
};

export const deleteTodo = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
};
