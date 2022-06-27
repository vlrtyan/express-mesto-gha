const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    //required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    //required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    //required: true,
  },
  email: {
    unique: true,
    type: String,
    required: true,
    validate: {
      validator: validator.isEmail,
    },
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
