const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'malformed id' });
  } else if (err.message === 'not found') {
    return res.status(404).json({ error: 'person not found' });
  } else if (err.message.includes('ValidationError')) {
    return res.status(400).json({ error: 'validation error' });
  }

  res.status(500).json({ error: 'internal server error' });
};

module.exports = errorHandler;
