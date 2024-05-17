const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const githubStrategy = require('passport-github2').Strategy;

const app = express();

app
  .use(bodyParser.json())
  .use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    }))
  .use(passport.initialize())
  .use(passport.session())
  .use(cors({ methods: ['GET]', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}))
  .use(cors({ origin: '*'}))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use('/', require('./routes'));

process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
  })
  .on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
  });

passport.use(new githubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
  //User.findOrCreate({ githubId: profile.id }. function (err, user) {
    return done(null, profile);
  // });
}));
   
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

const db = require('./models');
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.get('/github/callback', passport.authenticate('github', {
  failureRefirect: '/api-docs', session:false}),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  }
);

app.get('/', (req, res) => {
  res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out")
});