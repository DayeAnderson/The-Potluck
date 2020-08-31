const Recipe = require('../models/recipe')

module.exports = {
    index,
    new: newRecipe,
    create
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
        res.redirect('/recipe/create')
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