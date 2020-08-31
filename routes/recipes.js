const router = require('express').Router()
const recipesCtrl = require('../controllers/recipes')

router.get('/', isLoggedIn, recipesCtrl.index)
router.get('/new', isLoggedIn, recipesCtrl.new)
router.post('/add', isLoggedIn, recipesCtrl.create)

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
  }

  module.exports = router;