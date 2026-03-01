const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const port = 3000;


app.use(express.json());

const db = new sqlite3.Database('./database/university.db');

// Optional: Log all courses on startup
db.all('SELECT * FROM courses', (err, rows) => {
    if (err) {
        console.error('Error fetching courses:', err.message);
    } else {
        console.log('Courses on startup:', rows);
    }
});

app.get('/api/courses', (req, res) => {
    db.all('SELECT * FROM courses', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.post('/api/courses', (req, res) => {
    const { courseCode, title, credits, description, semester } = req.body;
    db.run(
        `INSERT INTO courses (courseCode, title, credits, description, semester) VALUES (?, ?, ?, ?, ?)`,
        [courseCode, title, credits, description, semester],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ id: this.lastID });
        }
    );
});

app.delete('/api/course/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM courses WHERE id = ?', [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Course deleted' });
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});