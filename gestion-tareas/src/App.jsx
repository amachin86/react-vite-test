import React, { useEffect, useState } from 'react';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import { Container, Typography } from '@mui/material';
import axios from 'axios';

const App = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10');
            setTasks(response.data);
        };
        fetchTasks();
    }, []);

    const addTask = (title) => {
        const newTask = {
            id: tasks.length + 1,
            title,
            completed: false,
        };
        setTasks([...tasks, newTask]);
    };

    const completeTask = (id) => {
        setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
    };

    const deleteTask = (id) => {
        setTasks(tasks .filter(task => task.id !== id));
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Gestión de Tareas
            </Typography>
            <AddTaskForm addTask={addTask} />
            <TaskList tasks={tasks} completeTask={completeTask} deleteTask={deleteTask} />
        </Container>
    );
};

export default App;