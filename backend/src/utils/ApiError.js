class ApiError extends Error{
    constructor(
        statusCode,
        message = "Something went wrong!",
        errors = [],
        stack = ""
    ){
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.success = false;

        if(stack){
            this.stack = stack;
        }
        else{
            this.captureStackTrace(this, this.constructor);
        }
    }
}

export {ApiError}