export const logger = (req, res, next) => {
    console.log(`API called: ${req.method} ${req.url}`);
    next();
}

