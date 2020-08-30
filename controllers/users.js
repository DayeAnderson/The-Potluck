const User = require('../models/user');

module.exports = {
  index,
  showProfile,
  show
};

function show(req, res) {
  User.findById(req.params.id).then((userInfo) => {
    res.render('users/show', {
      title: 'Info',
      userInfo,
      user: req.user,
      recipes
    })
  })
}

function showProfile(req, res) {
  User.findById(req.user._id)
  .then((user) => {
    res.render('users/profile', { title: 'Profile Page', user})
  })
}

function index(req, res) {
  User.find({})
  .then(users => {
    res.render('users/index', { user: req.user, users })
  })
}