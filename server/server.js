/*jslint node: true, devel: true*/

'use strict';

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Todo = require('./todo');
var path = require('path');

var app = express();
var router = express.Router();
var port = 8091;

mongoose.connect('mongodb://localhost:27017/react-todo');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.use(function(req, res, next) { next(); });
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

function returnAllTodos(res) {
    Todo.find(function(err, todos) {
        if (err) {
            console.log('-- 400: ' + err);
            res.send(err);
        }
        else {
            console.log('-- 200');
        }
        res.json(todos);
    });
}

function handleErrors(err, res) {
    console.log('-- 400: ' + err);
    res.send(err);
}

router.route('/todos')
    .post(function(req, res) {
        console.log('[POST] /todos {text: ' + req.body.text + '}');

        var todo = new Todo();
        todo.text = req.body.text;
        todo.done = false;

        todo.save(function(err) {
            if (err)
                handleErrors(err, res);

            returnAllTodos(res);
        });
    })

    .get(function(req, res) {
        console.log('[GET] /todos');

        returnAllTodos(res);
    });

router.route('/todos/:todo_id')
    .get(function(req, res) {
        console.log('[GET] /todos/' + req.params.todo_id);

        Todo.findById(req.params.todo_id, function(err, todo) {
            if (err)
                handleErrors(err, res);
            else
                console.log('-- 200');

            res.json(todo);
        });
    })

    .post(function(req, res) {
        console.log('[POST] /todos/' + req.params.todo_id);

        Todo.findById(req.params.todo_id, function(err, todo) {
            if (err)
                handleErrors(err, res);

            todo.done = req.body.done;

            todo.save(function(err) {
                if (err)
                    handleErrors(err, res);

                returnAllTodos(res);
            });
        });
    })

    .delete(function(req, res) {
        console.log('[DELETE] /todos/' + req.params.todo_id);

        Todo.remove({ _id: req.params.todo_id }, function(err, todo) {
            if (err)
                handleErrors(err, res);

            returnAllTodos(res);
        });
    });


app.use('/api', router);
app.use('/app', express.static(__dirname + '/../app'));

app.listen(port, function () {
    console.log('Server up and running. Linstening on port: ' + port);
});
