// Using postgreSQL

require('dotenv').config();
const express = require('express');
const db = require('./db'); 

const app = express();

// Middleware
app.use(express.json());

// Logger
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    next();
};
app.use(logger);

// ========== ROUTES WITH DATABASE ==========

// Root
app.get('/', (req, res) => {
    res.json({message: '🐘 TASK-API WITH POSTGRESQL!'});
});

// Get all tasks
app.get('/api/tasks', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM tasks ORDER BY id');
        res.json({
            count: result.rows.length,
            tasks: result.rows
        });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({error: 'Database error'});
    }
});

// Get single task
app.get('/api/tasks/:id', async (req, res) => {
    try {
        const taskId = parseInt(req.params.id);
        const result = await db.query('SELECT * FROM tasks WHERE id = $1', [taskId]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({error: 'Task not found'});
        }
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({error: 'Database error'});
    }
});

// Create task
app.post('/api/tasks', async (req, res) => {
    try {
        const {title, completed} = req.body;
        
        if (!title) {
            return res.status(400).json({error: 'Title is required'});
        }
        
        const result = await db.query(
            'INSERT INTO tasks (title, completed) VALUES ($1, $2) RETURNING *',
            [title, completed || false]
        );
        
        res.status(201).json({
            message: 'Task created',
            task: result.rows[0]
        });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({error: 'Database error'});
    }
});

// Update task
app.put('/api/tasks/:id', async (req, res) => {
    try {
        const taskId = parseInt(req.params.id);
        const {title, completed} = req.body;
        
        // Check if task exists
        const checkResult = await db.query('SELECT * FROM tasks WHERE id = $1', [taskId]);
        if (checkResult.rows.length === 0) {
            return res.status(404).json({error: 'Task not found'});
        }
        
        // Build update query
        const updates = [];
        const values = [];
        let valueIndex = 1;
        
        if (title !== undefined) {
            updates.push(`title = $${valueIndex}`);
            values.push(title);
            valueIndex++;
        }
        
        if (completed !== undefined) {
            updates.push(`completed = $${valueIndex}`);
            values.push(completed);
            valueIndex++;
        }
        
        if (updates.length === 0) {
            return res.status(400).json({error: 'Nothing to update'});
        }
        
        values.push(taskId);
        const query = `UPDATE tasks SET ${updates.join(', ')} WHERE id = $${valueIndex} RETURNING *`;
        
        const result = await db.query(query, values);
        
        res.json({
            message: 'Task updated',
            task: result.rows[0]
        });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({error: 'Database error'});
    }
});

// Delete task
app.delete('/api/tasks/:id', async (req, res) => {
    try {
        const taskId = parseInt(req.params.id);
        
        const result = await db.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [taskId]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({error: 'Task not found'});
        }
        
        res.json({
            message: 'Task deleted',
            task: result.rows[0]
        });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({error: 'Database error'});
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});