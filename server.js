const express = require('express');
const app = express();
const port = 8080;
const MongoClient = require('mongodb').MongoClient;

let db;

MongoClient.connect('mongodb+srv://admin:admin123@cluster0.gvddnzw.mongodb.net/?retryWrites=true&w=majority', (err, client) => {
    if(err) return console.log(err);

    // connect with the database
    db = client.db('todoapp');

    // db.collection('post').insertOne({name: 'John', age: 20} , (err, client) => {
    //     console.log('saved!!!!')
    // });

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
    console.log(req.body.task);
    console.log(req.body.date);
    db.collection('post').insertOne({task: req.body.task, date: req.body.date} , (err, res) => {
        console.log('data saved!')
    })
    res.redirect('/')
})

