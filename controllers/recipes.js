const Recipe = require('../models/recipe')

module.exports = {
    index,
    new: newRecipe,
    create,
    show
}

function show(req, res) {
    Recipe.findById(req.params.id)
    .then((recipe) => {
        res.render('recipes/show', {
            title: recipe.name,
            user: req.user, 
            recipe
        })
    })
}

function newRecipe(req, res) {
    res.render('recipes/new', {
      title: 'Create Recipe',
      user: req.user})
}

function create(req, res) {
    req.body.createdBy = req.user.name
    Recipe.create(req.body)
    .then(() => {
        res.redirect('/recipes/new')
    })
}

function index(req, res) {
    Recipe.find({ createdBy: req.user._id })
    .then((recipes) => {
        res.render('recipes/index', {
            title: 'Community Recipes',
            user: req.user,
            recipes
        })
    })
}