const jwt = require('jsonwebtoken');

const SECRET_KEY = 'very_secret';

const checkToken = (token) => jwt.verify(token, SECRET_KEY);

// eslint-disable-next-line consistent-return
const isAuthorised = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(401).send({ message: 'Авторизуйтесь' });
  }
  const payload = checkToken(auth);
  req.user = payload;
  next();
};

module.exports = { isAuthorised };

//дописать ошибки
