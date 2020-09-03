const User = require('../models/user');
const Recipe = require('../models/recipe');


module.exports = {
  index,
  showProfile,
  show,
  update,
  follow,
  removeFollow,
  getName,
  delete: deleteRecipe
};

function deleteRecipe(req, res) {
  Recipe.findByIdAndDelete(req.params.id)
  .then(() => {
      res.redirect('/profile')
  })
}

function getName(req, res) {
  res.json(req.user.name)
}

function follow(req, res) {
  req.user.following.push(req.params.id)
  req.user.save().then(() => {
    res.redirect(`/users/${req.params.id}`)
  })
}

function removeFollow(req, res) {
  let idx = req.user.following.indexOf(req.params.id)
  req.user.following.splice(idx, 1)
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
  User.findById(req.user._id).populate('following')
  .then((user) => {
    Recipe.find({ createdBy: req.user._id })
    .then((recipes) => {
      res.render('users/profile', { 
        title: 'Profile Page', 
        user, 
        recipes: recipes.reverse()
      })
    })
  })
}

function index(req, res) {
  User.find({})
  .then(users => {
    res.render('users/index', { 
      user: req.user, 
      users })
  })
}