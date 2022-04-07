const Card = require('../models/card');
const ErrorNotFound = require('../ErrorNotFound.js');

module.exports.getCards = (req, res) => {
  Card.find({})
    .orFail(() => {
      throw new ErrorNotFound('Карточка не найдена');
    })
    .then(cards => res.status(200).send({ data: cards }))
    .catch(err => {
      if (err.statusCode === 404) {
        return res.status(404).send({ message: 'Карточка не найдена' })
      }
      return res.status(500).send({ message: 'Ошибка по-умолчанию' })
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link })
    .then(card => res.send({ data: card }))
    .catch(err => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' })
      }
      return res.status(500).send({ message: 'Ошибка по-умолчанию' })
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      throw new ErrorNotFound('Карточка не найдена');
    })
    .then(card => res.send({ data: card }))
    .catch(err => {
      if (err.statusCode === 404) {
        return res.status(404).send({ message: 'Карточка не найдена' })
      }
      return res.status(500).send({ message: 'Ошибка по-умолчанию' })
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new ErrorNotFound('Карточка не найдена');
    })
    .then(card => res.send({ data: card }))
    .catch(err => {
      if (err.statusCode === 404) {
        return res.status(404).send({ message: 'Карточка не найдена' })
      }
      return res.status(500).send({ message: 'Ошибка по-умолчанию' })
    })
}

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new ErrorNotFound('Карточка не найдена');
    })
    .then(card => res.send({ data: card }))
    .catch(err => {
      if (err.statusCode === 404) {
        return res.status(404).send({ message: 'Карточка не найдена' })
      }
      return res.status(500).send({ message: 'Ошибка по-умолчанию' })
    })
}