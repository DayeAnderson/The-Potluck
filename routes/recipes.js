const router = require('express').Router()
const recipesCtrl = require('../controllers/recipes')

router.get('/', isLoggedIn, recipesCtrl.index)
router.post('/', isLoggedIn, recipesCtrl.create)
router.get('/new', isLoggedIn, recipesCtrl.new)
router.get('/:id', isLoggedIn, recipesCtrl.show)

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
  }

  module.exports = router;