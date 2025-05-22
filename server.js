const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/todos', require('./routes/todo'));
app.use('/api/notes', require('./routes/notes'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/planner', require('./routes/planner'));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})