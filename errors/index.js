'use strict';

const BadRequestError = require('./badrequest.error');
const ConflictError = require('./conflict.error');
const ForbiddenError = require('./forbidden.error');
const NotFoundError = require('./notfound.error');
const UnauthorizedError = require('./unauthorized.error');
const UnprocessableError = require('./unprocessable.error');

module.exports = {
    BadRequestError,
    ConflictError,
    ForbiddenError,
    NotFoundError,
    UnauthorizedError,
    UnprocessableError
}