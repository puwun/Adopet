class ExpressError extends Error{
    constructor(message, statusCode){
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}

//dont know  why it was used

module.exports = ExpressError;