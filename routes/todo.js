const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/', (req, res) => {
    db.all('SELECT * FROM todos', (err, rows) => {
        if(err){
            return res.status(500).json({Error: "Invalid request"})
        }
        res.json(rows);
    })
})

router.post('/', (req,res) => {
    const {text} = req.body;
    db.run('INSERT INTO todos (text) VALUES (?)', [text], function (err) {
        if(err) {
            return res.status(500).json({Error: "Invalid request"})
        }
        res.json({id: this.lastID, text, complete: 0});
    })
})

router.put('/:id', (req, res) => {
    const {complete} = req.body;
    db.run('UPDATE todos SET complete = ? WHERE id = ?', [complete, req.params.id], function(err) {
        if(err) {
            return res.status(500).json({Error: "Invalid request"})
        }
        res.json({ success: true})
    })
})

router.delete('/:id', (req, res) => {
    db.run('DELETE FROM todos WHERE id = ?', [req.params.id], function(err) {
        if(err) {
            return res.status(500).json({Error: "Invalid request"})
        }
        res.json({ success: true})
    })
})

module.exports = router;