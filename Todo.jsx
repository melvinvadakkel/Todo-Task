import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
`;

const Input = styled.input`
  width: calc(100% - 90px);
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${(props) => (props.danger ? '#ff4d4d' : '#4CAF50')};
  color: #fff;
  margin-right: ${(props) => (props.marginRight ? '10px' : '0')};
`;

const TodoList = styled.div`
  margin-top: 20px;
`;

const TodoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
`;

const TodoText = styled.span`
  flex: 1;
`;

 function App() {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddOrUpdate = () => {
    if (editIndex !== null) {
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = inputValue;
      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      setTodos([...todos, inputValue]);
    }
    setInputValue('');
  };

  const handleDelete = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setInputValue(todos[index]);
    setEditIndex(index);
  };

  return (
    <Container>
      <div>
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task"
        />
        <Button onClick={handleAddOrUpdate}>
          {editIndex !== null ? 'Update' : 'Add'}
        </Button>
      </div>
      <TodoList>
        {todos.map((todo, index) => (
          <TodoItem key={index}>
            <TodoText>{todo}</TodoText>
            <div>
              <Button marginRight onClick={() => handleEdit(index)}>
                Edit
              </Button>
              <Button danger onClick={() => handleDelete(index)}>
                Delete
              </Button>
            </div>
          </TodoItem>
        ))}
      </TodoList>
    </Container>
  );
}
export default App