'use strict';

class ForbiddenError extends Error {

    constructor(message) {
        super(message || 'Forbidden');
        this.name = this.constructor.name;
        this.status = 403;
        this.isJson = true;
    }

    toJson() {
        return {
            statusCode: this.status,
            error: 'Forbidden',
            message: this.message
        }
    }

}

module.exports = ForbiddenError;