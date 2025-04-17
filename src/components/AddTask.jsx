import React, { useState } from 'react';
import api from '../utils/api';
import {
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';

function AddTask({tasks, setTasks, setOpenAddDialog}) {
    const [newTask, setNewTask] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleAddTask = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await api.post('/todos', {
                task: newTask,
                description,
                date: date ? new Date(date).toISOString() : null,
            });
            console.log('Task created:', response.data);
            setTasks([...tasks, response.data]);
        } catch (error) {
            console.error('Failed to create task:', error.response?.data || error.message);
        } finally {
            setIsLoading(false);
            setOpenAddDialog(false);
        }
      };

  return (
    <>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
            <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            />
            <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
            margin="dense"
            label="Date (Optional)"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
            <Button onClick={handleAddTask}>Save</Button>
        </DialogActions>
    </>
  );
}

export default AddTask;