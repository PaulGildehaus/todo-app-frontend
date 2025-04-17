import React, { useState } from 'react';
import {
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import api from '../utils/api';


function EditTask({ tasks, setTasks, setOpenEditDialog, selectedTask, setSelectedTask }) {
    const [isSaving, setIsSaving] = useState(false);

    const handleEditTask = async () => {
        setIsSaving(true);
        try {
            const response = await api.patch(`/todos/${selectedTask._id}`, {
                task: selectedTask.task,
                description: selectedTask.description,
                date: selectedTask.date,
                completed: selectedTask.completed
            });

            setTasks(tasks.map(task => (task._id === selectedTask._id ? response.data : task)));
            setOpenEditDialog(false);
        } catch (error) {
            console.error('Failed to update task:', error.response?.data || error.message);
        } finally {
            setIsSaving(false);
            setSelectedTask(null); // Clear selected task after editing
        }
      };

      return(
        <>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                label="Title"
                fullWidth
                value={selectedTask?.task || ''}
                onChange={(e) => setSelectedTask({ ...selectedTask, title: e.target.value })}
            />
            <TextField
                margin="dense"
                label="Description"
                fullWidth
                value={selectedTask?.description || ''}
                onChange={(e) => setSelectedTask({ ...selectedTask, description: e.target.value })}
            />
            <TextField
                margin="dense"
                label="Date (Optional)"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={
                    selectedTask?.date ? new Date(selectedTask.date).toISOString().split('T')[0] : ''
                }
                onChange={(e) => setSelectedTask({ ...selectedTask, date: e.target.value ? new Date(e.target.value).toISOString() : null })}
            />
            </DialogContent>
            <DialogActions>
            <Button 
                onClick={() => setOpenEditDialog(false)} 
                disabled={isSaving}
            >
                Cancel
            </Button>
            <Button 
            onClick={handleEditTask} 
            disabled={isSaving}
            >
                {isSaving ? 'Saving...' : 'Save'}
            </Button>
            </DialogActions>
        </>
      )
}
export default EditTask;