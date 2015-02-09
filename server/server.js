/*jslint node: true, devel: true*/

'use strict';

var express = require('express');

var app = express();
var path = require('path');
var publicFolder = path.join(__dirname, '../');

/* Static */
app.use(express.static(publicFolder));
app.disable('x-powered-by');

app.listen(8080, function () {
    console.log('Server up and running....');
    console.log('Serving static files from: ' + publicFolder);
});

/* API */

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/react-todo');
var Todo = require('./todo');

var bodyParser = require('body-parser');
var port = 8091;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});


router.route('/todos')
    // create a todo (accessed at POST http://localhost:8080/api/todos)
    .post(function(req, res) {

        var todo = new Todo();      // create a new instance of the todo model
        todo.text = req.body.text;  // set the todos text (comes from the request)
        todo.done = false;

        // save the todo and check for errors
        todo.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Todo created!' });
        });

    })
    .get(function(req, res) {
        Todo.find(function(err, todos) {
            if (err)
                res.send(err);

            res.json(todos);
        });
    });

router.route('/todos/:todo_id')

    // get the todo with that id (accessed at GET http://localhost:8080/api/todos/:todo_id)
    .get(function(req, res) {
        Todo.findById(req.params.todo_id, function(err, todo) {
            if (err)
                res.send(err);
            res.json(todo);
        });
    })
    .put(function(req, res) {

        // use our todo model to find the todo we want
        Todo.findById(req.params.todo_id, function(err, todo) {

            if (err)
                res.send(err);

            todo.done = req.body.done;

            // save the todo
            todo.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Todo updated!' });
            });

        });
    });


app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);
