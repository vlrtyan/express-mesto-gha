const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const {
  login, createUser,
} = require('./controllers/users');
const isAuthorised = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT, () => {
  console.log(`On port ${PORT}`);
});

app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133',
  };

  next();
});

app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

app.post('/signup', createUser);
app.post('/signin', login);

app.use((req, res, next) => {
  res.status(404).send({ message: 'Пути не существует' });
  next();
});
