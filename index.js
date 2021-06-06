const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const catchAsync = require('./helpers/catchAsync');
const methodOverride = require('method-override');
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

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


app.get('/', (req, res) => {
  res.render('home')
});


app.get('/campinns', catchAsync (async (req, res) => {
  const campinns = await Campinn.find({});
  res.render('campinns/index', { campinns })
}));

app.get('/campinns/new', (req, res) => {
  res.render('campinns/new')
});

app.post('/campinns', catchAsync(async (req, res, next) => {
  const campinn = new Campinn(req.body.campinn);
  await campinn.save();
  res.redirect(`/campinns/${campinn._id}`)
}))

app.get('/campinns/:id', catchAsync(async (req, res) => {
  const campinn = await Campinn.findById(req.params.id)
  res.render('campinns/show', { campinn });
}));

app.get('/campinns/:id/edit', catchAsync(async (req, res) => {
  const campinn = await Campinn.findById(req.params.id);
  res.render('campinns/edit', { campinn });
}))

app.put('/campinns/:id', catchAsync(async (req, res) => {
  const { id } = req.params;
  const campinn = await Campinn.findByIdAndUpdate(id, { ...req.body.campinn });
  res.redirect(`/campinns/${campinn._id}`)

}));

app.delete('/campinns/:id', catchAsync(async (req, res) => {
  const { id } = req.params
  await Campinn.findByIdAndDelete(id);
  res.redirect('/campinns');
}));

app.use((err, req, res, next) => {
  res.send('somethins is wrong')
})


app.listen(3000, () => {
  console.log('server is running at port 3000');
});
