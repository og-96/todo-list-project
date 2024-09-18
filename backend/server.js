var express = require('express');
var mariadb = require('mariadb');
var cors = require('cors');
var app = express();

app.use(cors());
app.use(express.json()); // Erlaubt es uns, JSON-Daten im Body von POST-Requests zu verarbeiten

// Verbindung zu MariaDB herstellen
const pool = mariadb.createPool({
    host: 'localhost', // Deine MariaDB-Server-Adresse (normalerweise 'localhost' bei lokaler Installation)
    user: 'root',      // Dein MariaDB-Benutzername
    password: '123', // Dein MariaDB-Passwort
    database: 'tododb' // Deine Datenbank, die du für die To-Dos erstellt hast
});


// Abrufen aller TODO's
app.get('/todos', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM todos');
        res.json(rows);
    } catch (err) {
        res.status(500).send(err.toString());
    } finally {
        if (conn) conn.release();
    }
});

// TODO hinzufügen
app.post('/todos', async (req, res) => {
    const { text } = req.body;
    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query('INSERT INTO todos (text) VALUES (?)', [text]);

        // THERE IS NO OTHER WAY WTF.... BIGINT TO JSON IN 2024 -.-
        const id = result.insertId.toString();

        res.status(201).json({ id, text, done: false });
    } catch (err) {
        res.status(500).send(err.toString());
    } finally {
        if (conn) conn.release();
    }
});

// TODO done aktualisieren
app.put('/todos/:id', async (req, res) => {
    const { id } = req.params;
    const { text, done } = req.body;

    if (!text || text.trim() === "") {
        return res.status(400).json({ error: "Text cannot be empty" });
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const bigIntId = BigInt(id);

        const result = await conn.query('UPDATE todos SET text = ?, done = ? WHERE id = ?', [text, done, bigIntId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Todo not found" });
        }

        // Rückgabe einer JSON-Antwort statt eines einfachen Texts
        res.json({ message: "Todo updated successfully", id: id.toString(), text, done });
    } catch (err) {
        res.status(500).json({ error: err.toString() });
    } finally {
        if (conn) conn.release();
    }
});

// TODO löschen
app.delete('/todos/:id', async (req, res) => {
    let conn;
    try {
        const { id } = req.params;

        // Konvertiere die ID in BigInt, falls nötig
        const bigIntId = BigInt(id);

        conn = await pool.getConnection();

        // Führe die Lösch-Abfrage aus
        const result = await conn.query('DELETE FROM todos WHERE id = ?', [bigIntId]);

        // Überprüfe, ob ein To-Do gelöscht wurde
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Todo not found" });
        }

        res.json({ message: "Todo deleted successfully", id });
    } catch (err) {
        res.status(500).send(err.toString());
    } finally {
        if (conn) conn.end(); // Verbindung beenden
    }
});

// Starte den Server auf Port 3000
app.listen(3000, () => {
    console.log('Server läuft auf http://localhost:3000');
});
