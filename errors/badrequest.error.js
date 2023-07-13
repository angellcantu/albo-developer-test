'use strict';

class BadRequestError extends Error {

    constructor(message) {
        super(message || 'Bad Request');
        this.name = this.constructor.name;
        this.status = 400;
        this.isJson = true;
    }

    toJson() {
        return {
            statusCode: this.status,
            error: 'Bad Request',
            message: this.message
        }
    }

}

module.exports = BadRequestError;