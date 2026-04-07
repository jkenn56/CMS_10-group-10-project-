const express = require('express');
const db = require("./config/db");
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors({
    origin: '*',
    credentials: true
}));

app.use(express.json());

app.post('/users', async (req, res) => {
    try {
        const { username, password, congregation_id, religion, churchname } = req.body;
        const sql = "INSERT INTO user (username, password, congregation_id, religion, churchname) VALUES (?, ?, ?, ?, ?)";
        const [result] = await db.execute(sql, [username, password, congregation_id, religion, churchname]);
        res.json({ success: true, id: result.insertId });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get('/users', async (req, res) => {
    try {
        const sql = "SELECT * FROM user";
        const [rows] = await db.execute(sql);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get('/users/:id', async (req, res) => {
    try {
        const sql = "SELECT * FROM user WHERE id = ?";
        const [rows] = await db.execute(sql, [req.params.id]);
        res.json(rows[0] || {});
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.put('/users/:id', async (req, res) => {
    try {
        const { username, password, congregation_id, religion, churchname } = req.body;
        const sql = "UPDATE user SET username = ?, password = ?, congregation_id = ?, religion = ?, churchname = ? WHERE id = ?";
        const [result] = await db.execute(sql, [username, password, congregation_id, religion, churchname, req.params.id]);
        res.json({ success: true, affectedRows: result.affectedRows });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const sql = "DELETE FROM user WHERE id = ?";
        const [result] = await db.execute(sql, [req.params.id]);
        res.json({ success: true, affectedRows: result.affectedRows });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.post('/congregations', async (req, res) => {
    try {
        const { full_name, date_of_birth, gender, phone, join_date } = req.body;
        const sql = "INSERT INTO congregation (full_name, date_of_birth, gender, phone, join_date) VALUES (?, ?, ?, ?, ?)";
        const [result] = await db.execute(sql, [full_name, date_of_birth, gender, phone, join_date]);
        res.json({ success: true, id: result.insertId });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get('/congregations', async (req, res) => {
    try {
        const sql = "SELECT * FROM congregation";
        const [rows] = await db.execute(sql);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get('/congregations/:id', async (req, res) => {
    try {
        const sql = "SELECT * FROM congregation WHERE id = ?";
        const [rows] = await db.execute(sql, [req.params.id]);
        res.json(rows[0] || {});
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.put('/congregations/:id', async (req, res) => {
    try {
        const { full_name, date_of_birth, gender, phone, join_date } = req.body;
        const sql = "UPDATE congregation SET full_name = ?, date_of_birth = ?, gender = ?, phone = ?, join_date = ? WHERE id = ?";
        const [result] = await db.execute(sql, [full_name, date_of_birth, gender, phone, join_date, req.params.id]);
        res.json({ success: true, affectedRows: result.affectedRows });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.delete('/congregations/:id', async (req, res) => {
    try {
        const sql = "DELETE FROM congregation WHERE id = ?";
        const [result] = await db.execute(sql, [req.params.id]);
        res.json({ success: true, affectedRows: result.affectedRows });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.post('/committees', async (req, res) => {
    try {
        const { name, phone, congregation_id } = req.body;
        const sql = "INSERT INTO committee (name, phone, congregation_id) VALUES (?, ?, ?)";
        const [result] = await db.execute(sql, [name, phone, congregation_id]);
        res.json({ success: true, id: result.insertId });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get('/committees', async (req, res) => {
    try {
        const sql = "SELECT * FROM committee";
        const [rows] = await db.execute(sql);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get('/committees/:id', async (req, res) => {
    try {
        const sql = "SELECT * FROM committee WHERE id = ?";
        const [rows] = await db.execute(sql, [req.params.id]);
        res.json(rows[0] || {});
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.put('/committees/:id', async (req, res) => {
    try {
        const { name, phone, congregation_id } = req.body;
        const sql = "UPDATE committee SET name = ?, phone = ?, congregation_id = ? WHERE id = ?";
        const [result] = await db.execute(sql, [name, phone, congregation_id, req.params.id]);
        res.json({ success: true, affectedRows: result.affectedRows });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.delete('/committees/:id', async (req, res) => {
    try {
        const sql = "DELETE FROM committee WHERE id = ?";
        const [result] = await db.execute(sql, [req.params.id]);
        res.json({ success: true, affectedRows: result.affectedRows });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.post('/funds', async (req, res) => {
    try {
        const { congregation_id, amount, payment_date, committee_id } = req.body;
        const sql = "INSERT INTO funds (congregation_id, amount, payment_date, committee_id) VALUES (?, ?, ?, ?)";
        const [result] = await db.execute(sql, [congregation_id, amount, payment_date, committee_id]);
        res.json({ success: true, id: result.insertId });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get('/funds', async (req, res) => {
    try {
        const sql = "SELECT * FROM funds";
        const [rows] = await db.execute(sql);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get('/funds/:id', async (req, res) => {
    try {
        const sql = "SELECT * FROM funds WHERE id = ?";
        const [rows] = await db.execute(sql, [req.params.id]);
        res.json(rows[0] || {});
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.put('/funds/:id', async (req, res) => {
    try {
        const { congregation_id, amount, payment_date, committee_id } = req.body;
        const sql = "UPDATE funds SET congregation_id = ?, amount = ?, payment_date = ?, committee_id = ? WHERE id = ?";
        const [result] = await db.execute(sql, [congregation_id, amount, payment_date, committee_id, req.params.id]);
        res.json({ success: true, affectedRows: result.affectedRows });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.delete('/funds/:id', async (req, res) => {
    try {
        const sql = "DELETE FROM funds WHERE id = ?";
        const [result] = await db.execute(sql, [req.params.id]);
        res.json({ success: true, affectedRows: result.affectedRows });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});