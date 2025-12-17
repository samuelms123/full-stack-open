const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'malformed id' });
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  } else if (err.message === 'not found') {
    return res.status(404).json({ error: 'person not found' });
  }

  res.status(500).json({ error: 'internal server error' });
};

module.exports = errorHandler;
