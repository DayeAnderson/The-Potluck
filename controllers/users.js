const User = require('../models/user');

module.exports = {
  index,
  showProfile,
  show,
  update,
  follow,
  removeFollow
};

function follow(req, res) {
  req.user.followers.push(req.params.id)
  req.user.save().then(() => {
    res.redirect(`/users/${req.params.id}`)
  })
}

function removeFollow(req, res) {
  let idx = req.user.followers.indexOf(req.params.id)
  req.user.followers.splice(idx, 1)
  req.user.save().then(() => {
    res.redirect(`/users/${req.params.id}`)
  })
}

function update(req, res) {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true }).then(() => {
    res.redirect('/users/profile')
  })
}

function show(req, res) {
  User.findById(req.params.id).then((userInfo) => {
    res.render('users/show', {
      title: 'Info',
      userInfo,
      user: req.user
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