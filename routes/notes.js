const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/', (req, res) => {
    db.all('SELECT * FROM notes', (err, rows) => {
        if(err){
            return res.status(500).json({Error: "Invalid request"})
        }
        res.json(rows);
    })
})

router.post('/', (req,res) => {
    const {title, content} = req.body;
    db.run('INSERT INTO notes (title, content) VALUES (?, ?)', [title, content], function (err) {
        if(err) {
            return res.status(500).json({Error: "Invalid request"})
        }
        res.json({id: this.lastID, title, content });
    })
})

router.delete('/:id', (req, res) => {
    db.run('DELETE FROM notes WHERE id = ?', [req.params.id], function(err) {
        if(err) {
            return res.status(500).json({Error: "Invalid request"})
        }
        res.json({ success: true})
    })
})

module.exports = router;