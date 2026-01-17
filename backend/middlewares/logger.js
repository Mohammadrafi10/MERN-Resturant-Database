const LoggerFunction = () => {
    return function(req , res , next){
        console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
        next();
    }
}
exports = module.exports = LoggerFunction;