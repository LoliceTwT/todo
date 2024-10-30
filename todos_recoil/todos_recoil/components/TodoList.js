// src/components/TodoList.js
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { todoListState } from '../state/todoAtom';
import { fetchTodos, addTodo, deleteTodo } from '../api/todoApi';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TodoList = () => {
  const [todos, setTodos] = useRecoilState(todoListState);
  const [todo, setTodo] = useState('');

  useEffect(() => {
    const loadTodos = async () => {
      const fetchedTodos = await fetchTodos();
      setTodos(fetchedTodos);
    };
    loadTodos();
  }, [setTodos]);

  const handleAddTodo = async () => {
    if (todo.trim()) {
      const newTodo = await addTodo({ title: todo, completed: false });
      setTodos(prev => [...prev, newTodo]);
      setTodo('');
    }
  };

  const handleRemoveTodo = async (id) => {
    await deleteTodo(id);
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter a new todo"
        value={todo}
        onChangeText={setTodo}
      />
      <Button title="Add Todo" onPress={handleAddTodo} />

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text>{item.title}</Text>
            <TouchableOpacity onPress={() => handleRemoveTodo(item.id)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 10,
  },
  deleteButton: {
    color: 'red',
  },
});

export default TodoList;
