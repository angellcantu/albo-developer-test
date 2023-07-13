'use strict';

class UnauthorizedError extends Error {

    constructor(message) {
        super(message || 'Unauthorized');
        this.name = this.constructor.name;
        this.status = 401;
        this.isJson = true;
    }

    toJson() {
        return {
            statusCode: this.status,
            error: 'Unauthorized',
            message: this.message
        }
    }

}

module.exports = UnauthorizedError;