const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/', (req, res) => {
    db.all('SELECT * FROM appointments', (err, rows) => {
        if(err){
            return res.status(500).json({Error: "Invalid request"})
        }
        res.json(rows);
    })
})

router.post('/', (req,res) => {
    const { title, date, time, description } = req.body;
    db.run('INSERT INTO appointments (title, date, time, description) VALUES (?,?,?,?)', [title, date, time, description], function (err) {
        if(err) {
            return res.status(500).json({Error: "Invalid request"})
        }
        res.json({id: this.lastID, title, date, time, description });
    })
})

router.delete('/:id', (req, res) => {
    db.run('DELETE FROM appointments WHERE id = ?', [req.params.id], function(err) {
        if(err) {
            return res.status(500).json({Error: "Invalid request"})
        }
        res.json({ success: true})
    })
})

module.exports = router;