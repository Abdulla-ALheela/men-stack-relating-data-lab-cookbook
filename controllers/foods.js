const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
  try {
    // Look up the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Render index.ejs, passing in all of the current user's
    // iteams as data in the context object.
    console.log(currentUser.pantry);
    
    res.render('foods/index.ejs', {
      pantry: currentUser.pantry,
    });
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect('/');
  }
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

  router.get('/:iteamId', async (req, res) => {
    try {
      // Look up the user from req.session
      const currentUser = await User.findById(req.session.user._id);
      // Find the iteams by the iteamId supplied from req.params
      const pantry = currentUser.pantry.id(req.params.iteamId);
      // Render the show view, passing the pantry data in the context object
      res.render('foods/show.ejs', {
        pantry: pantry,
      });
    } catch (error) {
      // If any errors, log them and redirect back home
      console.log(error);
      res.redirect('/');
    }
  });

  router.delete('/:iteamId', async (req, res) => {
    try {
      // Look up the user from req.session
      const currentUser = await User.findById(req.session.user._id);
      // Use the Mongoose .deleteOne() method to delete
      // an application using the id supplied from req.params
      currentUser.pantry.id(req.params.iteamId).deleteOne();
      // Save changes to the user
      await currentUser.save();
      // Redirect back to the applications index view
      res.redirect(`/users/${currentUser._id}/foods`);
    } catch (error) {
      // If any errors, log them and redirect back home
      console.log(error);
      res.redirect('/');
    }
  });

  router.get('/:iteamId/edit', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const pantry = currentUser.pantry.id(req.params.iteamId);
      res.render('foods/edit.ejs', {
        pantry: pantry,
      });
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });


  router.put('/:iteamId', async (req, res) => {
    try {
      // Find the user from req.session
      const currentUser = await User.findById(req.session.user._id);
      // Find the current pantry from the id supplied by req.params
      const pantry = currentUser.pantry.id(req.params.iteamId);
      // Use the Mongoose .set() method
      // this method updates the current pantry to reflect the new form
      // data on `req.body`
      pantry.set(req.body);
      // Save the current user
      await currentUser.save();
      // Redirect back to the show view of the current pantry
      res.redirect(
        `/users/${currentUser._id}/foods/${req.params.iteamId}`
      );
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });
module.exports = router;
