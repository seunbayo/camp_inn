const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campinn = require('./models/campinn');

mongoose.connect('mongodb://localhost:27017/camp-inn', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind("connection error;"));
db.once("open", () => {
  console.log("database connected");
});



const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))


app.get('/', (req, res) => {
  res.render('home')
});


app.get('/campinns', async (req, res) => {
  const campinns = await Campinn.find({});
  res.render('campinns/index', { campinns })
});

app.get('/campinns/:id', async (req, res) => {
  const campinn = await Campinn.findById(req.params.id)
  res.render('campinns/show', {campinn})
});


app.listen(3000, () => {
  console.log('server is running at port 3000');
});
