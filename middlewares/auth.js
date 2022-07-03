const jwt = require('jsonwebtoken');

module.exports.isAuthorised = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Пользователь не авторизован' });
  }
  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(token, 'very_secret');
  } catch (err) {
    return res.status(401).send({ message: 'Пользователь не авторизован' });
  }

  req.user = payload;
  next();
};
