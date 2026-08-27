const express = require('express');
const app = express();
const port = 8080;
app.use(express.static('.'));
app.listen(port, '0.0.0.0', () => {
    console.log(`Frontend running on port ${port}`);
});
