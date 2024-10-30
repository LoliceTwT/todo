import { Provider } from 'react-redux';
import store from './app/store';
import TodoList from './components/TodoList';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <h1>Todo App</h1>
        <TodoList />
      </div>
    </Provider>
  );
};

export default App;
