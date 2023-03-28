class ExpressError extends Error {
    constructor(message, status) {
        super()
        this.message = message
        this.status = status
    }
}

class BadRequestError extends ExpressError {
    constructor(message = "Bad Request") {
        super(message, 400)
    }
}

class BadRequestError extends ExpressError {
    constructor(message = "Unauthorized") {
        super(message, 401)
    }
}

// 402 error not commonly found, has to do with payments but not relevant for our project

class BadRequestError extends ExpressError {
    constructor(message = "Forbidden") {
        super(message, 403)
    }
}

class BadRequestError extends ExpressError {
    constructor(message = "Not Found") {
        super(message, 404)
    }
}