import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity } from 'react-native';

const TodoList = () => {
  const [todo, setTodo] = useState('');
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);

  useEffect(() => {
    dispatch({ type: 'FETCH_TODOS' });
  }, [dispatch]);

  const handleAddTodo = () => {
    if (todo.trim()) {
      dispatch({ type: 'ADD_TODO', payload: todo });
      setTodo('');
    }
  };

  const handleRemoveTodo = (id) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Enter a new todo"
        value={todo}
        onChangeText={setTodo}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Button title="Add Todo" onPress={handleAddTodo} />

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View 
          style={{ flexDirection: 'row', 
          justifyContent: 'space-between', 
          padding: 10 }}>
            <Text>{item.title}</Text>
            <TouchableOpacity onPress={() => handleRemoveTodo(item.id)}>
              <Text style={{ color: 'red' }}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default TodoList;
