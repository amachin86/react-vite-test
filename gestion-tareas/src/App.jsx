import React, { useEffect, useState } from 'react';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import Pagination from './components/Pagination';
import { Container, Typography } from '@mui/material';
import axios from 'axios';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 5; // Número de tareas por página

    // Cargar tareas desde localStorage al iniciar
    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        } else {
            const fetchTasks = async () => {
                const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10');
                setTasks(response.data);
                localStorage.setItem('tasks', JSON.stringify(response.data)); // Guardar tareas iniciales en localStorage
            };
            fetchTasks();
        }
    }, []);

    // Actualizar localStorage cada vez que cambian las tareas
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (title) => {
        const newTask = {
            id: tasks.length + 1,
            title,
            completed: false,
        };
        setTasks([...tasks, newTask]);
    };

    /*const completeTask = (id) => {
        setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
    };*/

    const completeTask = (id) => {
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    // Lógica de paginación
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Gestión de Tareas
            </Typography>
            <AddTaskForm addTask={addTask} />
            <TaskList tasks={currentTasks} completeTask={completeTask} deleteTask={deleteTask} />
            <Typography variant="body1" style={{ marginTop: '20px', textAlign: 'center' }}>
            Mostrando {currentTasks.length} de {tasks.length} tareas
            </Typography>
            <Pagination 
                tasksPerPage={tasksPerPage} 
                totalTasks={tasks.length} 
                paginate={paginate} 
            />
        </Container>
    );
};

export default App;