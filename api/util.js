const errorHandler = (error, req, res, message) =>
  res.status(422).send({
    error,
    message: message || "Oops... That doesn't work :(",
    received: {
      body: req.body,
      params: req.params,
      query: req.query
    }
  });

module.exports = { errorHandler };
