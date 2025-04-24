import '../App.css';
import React, { useState, useEffect } from 'react';
import {
  Container,
  Dialog,
} from '@mui/material';
import { useAuth } from './AuthContext';
import Header from './Header';
import AddTask from './AddTask';
import EditTask from './EditTask';
import TaskContainer from './TaskContainer';
import api from '../utils/api';


function Home() {
  const { user, setUser } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  
  // Fetch tasks from the API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/todos');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  // Defining the main component for the home page
  return (
    <div className="App">
      <Header user={user} setUser={setUser} />

      {/* Main Container */}
      <Container maxWidth="md" sx={{ marginTop: 4 }}>
        <TaskContainer tasks={tasks} setTasks={setTasks} setOpenAddDialog={setOpenAddDialog} setSelectedTask={setSelectedTask} setOpenEditDialog={setOpenEditDialog} />
      </Container>

      {/* Add Task Dialog */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <AddTask tasks={tasks} setTasks={setTasks} setOpenAddDialog={setOpenAddDialog} />
      </Dialog>

      {/* Edit Task Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <EditTask tasks={tasks} setTasks={setTasks} setOpenEditDialog={setOpenEditDialog} selectedTask={selectedTask} setSelectedTask={setSelectedTask} />
      </Dialog>
    </div>
  );
}

export default Home;