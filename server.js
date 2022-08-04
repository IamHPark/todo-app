const express = require('express');
const app = express();
const port = 8080;
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb+srv://admin:<password>@cluster0.gvddnzw.mongodb.net/?retryWrites=true&w=majority', (err, client) => {
    app.listen(port, () => {
        console.log("Listening on port 8080")
    })
})
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

