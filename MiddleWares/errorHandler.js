const errorHandlerMiddleware =  (err, req, res) => {
    return res.status(500).json({msg: "Something went wrong"})
}

module.exports = errorHandlerMiddleware