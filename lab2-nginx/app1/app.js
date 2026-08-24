const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
    res.send('App 1 is Running! 🚀');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`App 1 running on port ${port}`);
});
