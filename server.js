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
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/write', (req, res) => {
    res.sendFile(__dirname + '/public/write.html')
})

app.get('/list', (req, res) => {

    db.collection('post').find().toArray((err, data) => {
        res.render('list.ejs', {tasks : data})
    });
});

app.post('/add', (req, res) => {

    db.collection('counter').findOne({name: 'countPost'}, (err, res) => {
        console.log(res.totalPost);
        let count = res.totalPost;

        db.collection('post').insertOne({_id: count + 1, task: req.body.task, date: req.body.date}, (err, res) => {

            // counter DB should increase 1
            db.collection('counter').updateOne({name: 'countPost'}, { $inc : {totalPost: 1}},(err, res)=> {
                if(err) return console.log(err.message);
                console.log("updated counter")
            })
        })


    })
    res.redirect('/list')
})

app.delete('/list', (req, res) => {
    // console.log(req.body);
    req.body._id = parseInt(req.body._id)

    db.collection('post').deleteOne( req.body, (err, data) => {
        console.log('deleted!')
        res.status(200).send({ message: 'success'});
    });
})


