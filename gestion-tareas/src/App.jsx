import React, { useEffect, useState } from 'react';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import Pagination from './components/Pagination';
import { Container, Typography, Box } from '@mui/material';
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
    const completeTask = (id) => {
        setTasks((prevTasks) => {
            const updatedTasks = prevTasks.map(task => 
                task.id === id ? { ...task, completed: !task.completed } : task
            );
            console.log(`Tarea ${id} ${updatedTasks.find(task => task.id === id).completed ? 'completada' : 'revertida'}.`);
            return updatedTasks;
        });
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
        <div
        style={{
            position: 'absolute', 
            left: '50%', 
            top: '50%',
            transform: 'translate(-50%, -50%)'
        }}
    >
             <Box 
                sx={{ 
                    width: '100%', 
                    bgcolor: '#D3D3D3', 
                    boxShadow: 3, 
                    borderRadius: 2, 
                    p: 3, // Padding alrededor del Box
                    m: 2 // Margen alrededor del Box
                }}
            >
            <Typography variant="h4" gutterBottom align="center">
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
           </Box>
        </div>
    );
};

export default App;