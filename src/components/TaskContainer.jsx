import React, { useState } from 'react';
import {
  IconButton,
  Container,
  Paper,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Button,
} from '@mui/material';
import {
  Add as AddIcon,
  Comment as CommentIcon,
} from '@mui/icons-material';
import api from '../utils/api';

function TaskContainer({ tasks, setTasks, setOpenAddDialog, setSelectedTask, setOpenEditDialog }) {
    const [tabValue, setTabValue] = useState(0);
    
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleTaskClick = (task) => {
        setSelectedTask(task);
        setOpenEditDialog(true);
    };

    const toggleTaskCompletion = async (taskId, e) => {
        e.stopPropagation();
        try {
            const response = await api.patch(`/todos/${taskId}`, {
                completed: e.target.checked,
            });
            setTasks(tasks.map(t => (t._id === taskId ? response.data : t)));
        } catch (error) {
            console.error('Failed to update task:', error.response?.data || error.message);
        } 
    };

    const filteredTasks = tasks.filter(task => task.completed === (tabValue === 1));

  return (
    <div>
        <Container maxWidth="md" sx={{ marginTop: 4, textAlign:'left' }}>
        <Paper elevation={3}>
          <Tabs value={tabValue} onChange={handleTabChange} centered>
            <Tab label="Tasks" />
            <Tab label="Completed Tasks" />
          </Tabs>

          {/* Task List */}
          <List sx={{ maxHeight: 400, overflow: 'auto' }}>
            {filteredTasks.map((task) => (
              <ListItem 
                key={task._id} 
                dense 
                sx={{
                    '&:hover': { backgroundColor: 'action.hover' }
                }}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={task.completed}
                    onChange={(e) => {
                      toggleTaskCompletion(task._id, e);
                    }}
                  />
                </ListItemIcon>
                <ListItemText 
                    primary={task.task} 
                    secondary={
                        <>
                            {task.description} <br />
                            {task.date && (
                                <span>Due: {new Date(task.date).toLocaleDateString()}</span>
                            )}
                        </>
                    } 
                />
                <IconButton 
                    edge="end" 
                    onClick={() => handleTaskClick(task)}
                >
                  <CommentIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Add Task Button */}
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ marginTop: 2 }}
          onClick={() => setOpenAddDialog(true)}
        >
          Add Task
        </Button>
      </Container>
    </div>
  );
}

export default TaskContainer;