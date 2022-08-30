/* Module that allows us to catch errors within express without using try/catch or then.catch methods */
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    
    res.status(statusCode)

    // Error messages will be shown in the console. Will only be shown in the stack if ENV_MODE = production
    res.json({
        message: err.message,
        stack: process.env.ENV_MODE === "production" ? null : err.stack 
    })
}

module.exports = {
    errorHandler,
}