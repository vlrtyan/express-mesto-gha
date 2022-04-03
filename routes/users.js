const router = require('express').Router();
const { getUsers, getUserById, createUser, updateUser, updateAvatar } = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:userId', getUserById);
router.post('/users', createUser);
router.post('/users/me', updateUser);
router.post('/users/me/avatar', updateAvatar);

module.exports = router;