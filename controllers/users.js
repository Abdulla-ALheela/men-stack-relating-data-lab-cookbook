const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
    try {
      // Look up the user from req.session
      const users = await User.find();
      // Render index.ejs, passing in all of the current user's
      // iteams as data in the context object.
      res.render('users/index.ejs', {
        users: users,
      });
    } catch (error) {
      // If any errors, log them and redirect back home
      console.log(error);
      res.redirect('/');
    }
  });
  
  router.get('/:userId', async (req, res) => {
    try {
      // Look up the user from req.session
      const currentUser = await User.findById(req.params.userId);
      // Find the users by the usersId supplied from req.params
      const pantry = currentUser.pantry.id(req.params.usersId);
      // Render the show view, passing the pantry data in the context object
      res.render('users/show.ejs', {
        currentUser: currentUser,
        pantry: currentUser.pantry,
      });
    } catch (error) {
      // If any errors, log them and redirect back home
      console.log(error);
      res.redirect('/');
    }
  });
module.exports = router;

