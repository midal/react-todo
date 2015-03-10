'use strict';
var AppDispatcher = require('./dispatcher/AppDispatcher');
var TodoConstants = require('./constants/TodoConstants');
var request = require('request-promise');

var API_URL = 'http://localhost:8091/api';

function makeUrl(part) {
    return API_URL + part;
}

function dispatch(key, response, params) {
    var payload = {actionType: key, response: response};
    if (params) {
        payload.queryParams = params;
    }
    AppDispatcher.dispatch(payload);
}

var Api = {
    getTodos: function getTodos() {
        var url = makeUrl('/todos/');
        var key = TodoConstants.api.GET_TODOS;

        dispatch(key, TodoConstants.request.PENDING);

        request(url)
        .then(function(data) {
            dispatch(key, JSON.parse(data));
        })
        .catch(function(err) {
            console.error(err);
            return err;
        });
    },

    createTodo: function createTodo(text) {
        var url = makeUrl('/todos/');
        var key = TodoConstants.api.CREATE_TODO;
        var data = {text: text};

        dispatch(key, TodoConstants.request.PENDING);

        request.post(url, {json: true, body: data})
        .then(function(data) {
            dispatch(key, data);
        })
        .catch(function(err) {
            console.error('Error creating todo on server');
            return err;
        });
    },

    updateTodo: function updateTodo(id, params) {
        var url = makeUrl('/todos/'+id);
        var key = TodoConstants.api.UPDATE_TODO;

        dispatch(key, TodoConstants.request.PENDING);

        request.post(url, {json: true, body: params})
        .then(function(data) {
            dispatch(key, data);
        })
        .catch(function(err) {
            console.error('Error updating todo on server');
            return err;
        });
    },

    deleteTodo: function deleteTodo(id) {
        var url = makeUrl('/todos/'+id);
        var key = TodoConstants.api.DELETE_TODO;

        dispatch(key, TodoConstants.request.PENDING);

        request.del(url)
        .then(function(data) {
            dispatch(key, data);
        })
        .catch(function(err) {
            console.error('Error deleting todo on server');
            return err;
        });
    }
};

module.exports = Api;
