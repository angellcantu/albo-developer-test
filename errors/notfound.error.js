'use strict';

class NotFoundError extends Error {

    constructor(message) {
        super(message || 'Not Found');
        this.name = this.constructor.name;
        this.status = 404;
        this.isJson = true;
    }

    toJson() {
        return {
            statusCode: this.status,
            error: 'Not Found',
            message: this.message
        }
    }

}

module.exports = NotFoundError;