const Recipe = require('../models/recipe')

module.exports = {
    index
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