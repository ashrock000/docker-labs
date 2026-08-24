const express = require('express');
const app = express();
const port = 3002;

app.get('/', (req, res) => {
    res.send('App 2 is Running! 🚀');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`App 2 running on port ${port}`);
});
