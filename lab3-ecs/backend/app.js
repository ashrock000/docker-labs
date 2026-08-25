const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Connect to SQLite database file (mounted from database container)
const db = new sqlite3.Database('/data/database.sqlite');

db.run(`
    CREATE TABLE IF NOT EXISTS entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL,
        timestamp TEXT NOT NULL
    )
`);

app.post('/api/store', (req, res) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Text required' });
    const timestamp = new Date().toISOString();
    db.run(
        'INSERT INTO entries (text, timestamp) VALUES (?, ?)',
        [text, timestamp],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Stored', id: this.lastID, timestamp });
        }
    );
});

app.get('/api/list', (req, res) => {
    db.all('SELECT * FROM entries ORDER BY id DESC', (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.get('/', (req, res) => {
    res.send('Backend is running');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Backend running on port ${port}`);
});
