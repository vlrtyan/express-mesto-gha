const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .orFail(() => {
      throw new ErrorNotFound('Карточка не найдена');
    })
    .then(cards => res.status(200).send({ data: cards }))
    .catch(err => {
      if (err.name = 'ValidationError') {
        return res.status(400).send({ message: err.errorMessage })
      }
      return res.status(500).send({ message: 'Ошибка по-умолчанию' })
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link })
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(card => res.send({ data: card })
      .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)

