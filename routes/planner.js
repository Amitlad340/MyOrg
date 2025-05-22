const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/', (req, res) => {
    db.all('SELECT * FROM planner', (err, rows) => {
        if(err){
            return res.status(500).json({Error: "Invalid request"})
        }
        res.json(rows);
    })
})

router.post('/', (req,res) => {
    const {hour, note} = req.body;
    db.run(
        `INSERT INTO planner (hour, note)
        VALUES (?, ?)
        ON CONFLICT(hour) DO UPDATE SET note = excluded.note`, 
        [hour, note],
        function(err) {
            if(err) {
                console.error('Planner insert error:', err);
                return res.status(500).json({Error: "Invalid request"})
            }
            res.json({hour, note });
        }
    )
})

module.exports = router;