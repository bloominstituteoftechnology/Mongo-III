const asyncResponse = async (service, res) => {
  try {
    const response = await service;
    if (!response.error) return res.json(response);
    return res.status(422).json(response.error)
  } catch (error) {
    return res.status(422).json(error)
  }
}

module.exports = {
  asyncResponse
}