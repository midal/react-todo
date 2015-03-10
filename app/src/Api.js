var AppDispatcher = require('./dispatcher/AppDispatcher');
var TodoConstants = require('./constants/TodoConstants');
require('es6-promise').polyfill();

var CHANGE_EVENT = 'change';

var API_URL = '/api';
var TIMEOUT = 10000;

var _pendingRequests = {};


function abortPendingRequests(key) {
    if (_pendingRequests[key]) {
        _pendingRequests[key]._callback = function(){};
        _pendingRequests[key].abort();
        _pendingRequests[key] = null;
    }
}

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

// a get request with an authtoken param
function get(url) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: url,
            dataType: 'json',
            success: function(data) {
                resolve(data);
            },
            error: function(xhr, status, err) {
                console.error(API_URL, status, err.toString());
                reject(err);
            }
        });
    });
}

function post(url, data) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data: data,
            success: function(data) {
                resolve(data);
            },
            error: function(xhr, status, err) {
                console.error(API_URL, status, err.toString());
                reject(err);
            }
        });
    });
}

function del(url) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: url,
            type: 'DELETE',
            dataType: 'json',
            success: function(data) {
                resolve(data);
            },
            error: function(xhr, status, err) {
                console.error(API_URL, status, err.toString());
                reject(err);
            }
        });
    });
}

var Api = {
    getTodos: function() {
        var url = makeUrl('/todos/');
        var key = TodoConstants.api.GET_TODOS;
        abortPendingRequests(key);
        dispatch(key, TodoConstants.request.PENDING);
        _pendingRequests[key] = get(url).then(function(data) {
            dispatch(key, data);
        }, function(err) {
            console.error(err);
            return err;
        });
    },
    createTodo: function(text) {
        var url = makeUrl('/todos/');
        var key = TodoConstants.api.CREATE_TODO;
        // abortPendingRequests(key);
        dispatch(key, TodoConstants.request.PENDING);
        _pendingRequests[key] = post(url, {text: text})
        .then(function(data) {
            dispatch(key, data);
        }, function(err) {
            console.error('Error creating todo on server');
            return err;
        });
    },
    updateTodo: function(id, params) {
        var url = makeUrl('/todos/'+id);
        var key = TodoConstants.api.UPDATE_TODO;
        // abortPendingRequests(key);
        dispatch(key, TodoConstants.request.PENDING);
        _pendingRequests[key] = post(url, params)
        .then(function(data) {
            dispatch(key, data);
        }, function(err) {
            console.error('Error updating todo on server');
            return err;
        });
    },
    deleteTodo: function(id) {
        var url = makeUrl('/todos/'+id);
        var key = TodoConstants.api.DELETE_TODO;
        // abortPendingRequests(key);
        dispatch(key, TodoConstants.request.PENDING);
        _pendingRequests[key] = del(url)
        .then(function(data) {
            dispatch(key, data);
        }, function(err) {
            console.error('Error deleting todo on server');
            return err;
        });
    }
};

module.exports = Api;
