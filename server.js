const express = require('express');
const app = express();
const port = 8080;

app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/write', (req, res) => {
    res.sendFile(__dirname + '/write.html')
})

app.post('/add', (req, res) => {
    console.log(req.body);
    res.send('Send Complete')
})

app.listen(port, () => {
    console.log("Listening on port 8080")
})