const Recipe = require('../models/recipe')


module.exports = {
    index,
    new: newRecipe,
    create,
    show,
    delete: deleteRecipe
}

function deleteRecipe(req, res) {
    Recipe.findByIdAndDelete(req.params.id)
    .then(() => {
        res.redirect('/users/profile')
    })
  }

function show(req, res) {
    Recipe.findById(req.params.id)
    .then((recipes) => {
        res.render('recipes/show', {
            title: recipes.name,
            user: req.user,
            recipes: recipes
        })
    })
}

function newRecipe(req, res) {
    Recipe.find({})
    .then((recipes) => {
        res.render('recipes/new', {
          title: 'Create Recipe',
          user: req.user,
          recipes
      })
  })
}

function create(req, res) {
    console.log(req.user.name)
    req.body.createdBy = req.user.name
    Recipe.create(req.body)
    .then((recipe) => {
        res.redirect('/recipes')
    })
}

function index(req, res) {
    Recipe.find({})
    .then((recipes) => {
        res.render('recipes/index', {
            title: 'Community Recipes',
            user: req.user,
            recipes: recipes.reverse()
        })
    })
}