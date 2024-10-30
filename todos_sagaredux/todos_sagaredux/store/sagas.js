import { call, put, takeEvery } from 'redux-saga/effects';
import { addTodo, removeTodo, setTodos } from './reducers';

const fetchTodosFromAPI = async () => {
  const response = await fetch('https://6721816f98bbb4d93ca89379.mockapi.io/todos');
  if (!response.ok) throw new Error('Failed to fetch todos');
  return response.json();
};

const createTodoInAPI = async (todo) => {
  const response = await fetch('https://6721816f98bbb4d93ca89379.mockapi.io/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: todo, completed: false }),
  });
  if (!response.ok) throw new Error('Failed to create todo');
  return response.json();
};

const deleteTodoFromAPI = async (id) => {
  const response = await fetch(`https://6721816f98bbb4d93ca89379.mockapi.io/todos/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete todo');
};

function* fetchTodos() {
  try {
    const todos = yield call(fetchTodosFromAPI);
    yield put(setTodos(todos)); 
  } catch (error) {
    console.error(error);
  }
}

function* addTodoSaga(action) {
  try {
    const newTodo = yield call(createTodoInAPI, action.payload);
    yield put(addTodo(newTodo)); 
  } catch (error) {
    console.error(error);
  }
}

function* deleteTodoSaga(action) {
  try {
    yield call(deleteTodoFromAPI, action.payload);
    yield put(removeTodo(action.payload)); 
  } catch (error) {
    console.error(error);
  }
}

function* todoSaga() {
  yield takeEvery('FETCH_TODOS', fetchTodos);
  yield takeEvery('ADD_TODO', addTodoSaga);
  yield takeEvery('DELETE_TODO', deleteTodoSaga);
}

export default todoSaga;
