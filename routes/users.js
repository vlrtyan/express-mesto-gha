const router = require('express').Router();
const {
  getUsers, getUserById, createUser, updateUser, updateAvatar, login,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.get('/users/me', );
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateAvatar);
router.post('/signin', login);
router.post('/signup', createUser);


module.exports = router;
