const express = require('express');
const app = express();
const configRoutes = require('./routes');
const exphbs = require('express-handlebars');
const session = require('express-session');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


app.use(session({
  name: 'AuthCookie',
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: true
}));

app.get('/', (req, res, next) => {
  // console.log(req.url);
  if (req.session.user) {
    console.log(new Date().toUTCString() + ': ' + req.method + ' ' + req.originalUrl + ' (Authorized)');
    return res.redirect('/private');
  } else {
    console.log(new Date().toUTCString() + ': ' + req.method + ' ' + req.originalUrl + ' (Unauthorized)');
    return next();
  }
});

app.use('/private', (req, res, next) => {
  // console.log(req.url);
  if (!req.session.user) {
    console.log(new Date().toUTCString() + ': ' + req.method + ' ' + req.originalUrl + ' (Unauthorized)');
    return res.redirect('/');
  } else {
    console.log(new Date().toUTCString() + ': ' + req.method + ' ' + req.originalUrl + ' (Authorized)');
    return next();
  }
});

app.use('/signup', (req, res, next) => {
  if (req.session.user) {
    console.log(new Date().toUTCString() + ': ' + req.method + ' ' + req.originalUrl + ' (Authorized)');
    return res.redirect('/private');
  } else {
    console.log(new Date().toUTCString() + ': ' + req.method + ' ' + req.originalUrl + ' (Unauthorized)');
    return next();
  }
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});