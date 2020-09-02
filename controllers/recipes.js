const Recipe = require('../models/recipe')
const User = require('../models/user')

module.exports = {
    index,
    new: newRecipe,
    create,
    show,
}

function show(req, res) {
    Recipe.findById(req.params.id)
    .then((recipes) => {
        res.render('recipes/show', {
            title: recipes.name,
            user: req.user,
            recipes
        })
    })
}

function newRecipe(req, res) {
    res.render('recipes/new', {
      title: 'Create Recipe',
      user: req.user})
}

function create(req, res) {
    req.body.createdBy = req.user._id
    Recipe.create(req.body)
    .then(() => {
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