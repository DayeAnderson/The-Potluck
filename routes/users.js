const router = require('express').Router();
const usersCtrl = require('../controllers/users');

// GET /users
router.get('/', isLoggedIn, usersCtrl.index);
router.get('/profile', isLoggedIn, usersCtrl.showProfile)
router.put('/profile', isLoggedIn, usersCtrl.update)
router.get('/getName', isLoggedIn, usersCtrl.getName)
router.get('/:id', isLoggedIn, usersCtrl.show)
router.delete('/recipes/:id', isLoggedIn, usersCtrl.delete)
router.get('/:id/follower', isLoggedIn, usersCtrl.follow)
router.get('/:id/unfollow', isLoggedIn, usersCtrl.removeFollow)

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
  }

module.exports = router;
