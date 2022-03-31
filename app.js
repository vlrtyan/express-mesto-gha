const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect('mongodb://localhost:27017/mestodb', {
  // useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false
});

app.use('/', require('./routes/users'));

app.use((req, res, next) => {
  req.user = {
    _id: '62460c0fb7a0339ad36c7d3e'
  };

  next();
});

app.listen(PORT, () => {
  console.log(`On port ${PORT}`)
})



// app.get('/users/:userId', (req, res) => {
//   if (!users[req.params.userId]) {
//     res.send(`Такого пользователя не существует`);
//     return;
//   }
//   const { name, about, avatar } = users[req.params.userId];

//   res.send(name, about, avatar);
// });


