const router = require('express').Router();
const { likeCard, dislikeCard } = require('../controllers/cards');
const { getCards, createCard, deleteCard, likeCard, dislikeCard } = require('../controllers/users');

router.get('/cards', getCards);
router.get('/cards', createCard);
router.get('/cards/:cardId', deleteCard);
router.post('/cards/:cardId/likes', likeCard);
router.post('/cards/:cardId/likes', dislikeCard);

module.exports = router;