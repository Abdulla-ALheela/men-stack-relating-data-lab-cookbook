const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', (req, res) => {
    res.render('foods/index.ejs');
});

router.get('/new', (req, res) => {
    res.render('foods/new.ejs');
});

router.post('/', async (req, res) => {
    try {
      // Look up the user from req.session
      const currentUser = await User.findById(req.session.user._id);
      // Push req.body (the new form data object) to the
      // food array of the current user
      currentUser.pantry.push(req.body);
      // Save changes to the user
      await currentUser.save();
      // Redirect back to the foods index view
      res.redirect(`/users/${currentUser._id}/foods`);
    } catch (error) {
      // If any errors, log them and redirect back home
      console.log(error);
      res.redirect('/');
    }
  });

module.exports = router;
