const Users = require('../models/user');
const ErrorNotFound = require('../ErrorNotFound.js');

module.exports.getUsers = (req, res) => {
  Users.find({})
    .then(users => res.status(200).send({ data: users }))
    .catch(err => {
      return res.status(500).send({ message: 'Ошибка по-умолчанию' })
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  Users.create({ name, about, avatar })
    .then(user => res.status(200).send({ data: user }))
    .catch(err => {
      if (err.statusCode === 400 || err.name === 'CastError' || err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' })
      }
      return res.status(500).send({ message: 'Ошибка по-умолчанию' })
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  Users.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => {
      throw new ErrorNotFound('Пользователь не найден');
    })
    .then(user => res.send({ data: user }))
    .catch(err => {
      console.dir(err)
      if (err.statusCode === 404) {
        return res.status(404).send({ message: 'Пользователь не найден' })
      } else if (err.statusCode === 400 || err.name === 'CastError' || err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' })
      }
      return res.status(500).send({ message: 'Ошибка по-умолчанию' })
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  Users.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => {
      throw new ErrorNotFound('Пользователь не найден');
    })
    .then(user => res.status(200).send({ data: user }))
    .catch(err => {
      if (err.statusCode === 404) {
        return res.status(404).send({ message: 'Пользователь не найден' })
      } else if (err.statusCode === 400 || err.name === 'CastError' || err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' })
      }
      return res.status(500).send({ message: 'Ошибка по-умолчанию' })
    });
};

module.exports.getUserById = (req, res) => {
  Users.findById(req.params.id)
    .orFail(() => {
      throw new ErrorNotFound('Пользователь не найден')
    })
    .then(user => {
      res.send({ data: user })
    })
    .catch(err => {
      if (err.statusCode === 404 || err.name === 'CastError') {
        return res.status(404).send({ message: 'Пользователь не найден' })
      }
      return res.status(500).send({ message: 'Ошибка по-умолчанию' })
    });
};