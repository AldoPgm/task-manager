const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// GET /api/todos
app.get('/api/todos', (req, res) => {
    const { search, status } = req.query;
    let query = "SELECT * FROM todos";
    let params = [];
    let conditions = [];

    if (search) {
        conditions.push("text LIKE ?");
        params.push(`%${search}%`);
    }

    if (status === 'active') {
        conditions.push("completed = 0");
    } else if (status === 'completed') {
        conditions.push("completed = 1");
    }

    if (conditions.length > 0) {
        query += " WHERE " + conditions.join(" AND ");
    }

    query += " ORDER BY created_at DESC";

    db.all(query, params, (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: "success",
            data: rows
        });
    });
});

// POST /api/todos
app.post('/api/todos', (req, res) => {
    const { text } = req.body;
    const sql = 'INSERT INTO todos (text) VALUES (?)';
    const params = [text];
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: "success",
            data: { id: this.lastID, text, completed: 0 }
        });
    });
});

// PUT /api/todos/:id
app.put('/api/todos/:id', (req, res) => {
    const { text, completed } = req.body;
    const { id } = req.params;

    // Dynamic update
    let updates = [];
    let params = [];

    if (text !== undefined) {
        updates.push("text = ?");
        params.push(text);
    }
    if (completed !== undefined) {
        updates.push("completed = ?");
        params.push(completed ? 1 : 0);
    }

    if (updates.length === 0) {
        return res.status(400).json({ error: "No fields to update" });
    }

    params.push(id);
    const sql = `UPDATE todos SET ${updates.join(", ")} WHERE id = ?`;

    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: "success",
            changes: this.changes
        });
    });
});

// DELETE /api/todos/:id
app.delete('/api/todos/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM todos WHERE id = ?', id, function (err, result) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: "deleted", changes: this.changes });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
