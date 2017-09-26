module.exports = () => {
  return {
    errHandler: (status, message, res) => {
      res.status(status).send({ message });
      return;
    }
  };
};
