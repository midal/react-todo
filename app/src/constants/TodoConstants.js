'use strict';
var keyMirror = require('keymirror');

var constants = keyMirror({
    TODO_CREATE:                null,
    TODO_COMPLETE:              null,
    TODO_DESTROY:               null,
    TODO_DESTROY_COMPLETED:     null,
    TODO_TOGGLE_COMPLETE_ALL:   null,
    TODO_NOT_COMPLETE:          null
});

constants.api = keyMirror({
    GET_TODOS:      null,
    CREATE_TODO:    null,
    UPDATE_TODO:    null,
    DELETE_TODO:    null
});

constants.request = keyMirror({
    TIMEOUT:        null,
    ERROR:          null,
    PENDING:        null
});

module.exports = constants;
