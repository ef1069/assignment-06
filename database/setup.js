const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/university.db')
console.log('Connected to SQLite database')

db.run(`
    CREATE TABLE courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    courseCode TEXT,
    title TEXT,
    credits INTEGER,
    description TEXT,
    semester TEXT
    )
    `);

    console.log('Courses table created')