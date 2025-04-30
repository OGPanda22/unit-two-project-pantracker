const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      res.render('tasks/index.ejs', { task: currentUser.task });
    } catch (error) {
      res.redirect('/');
    }
  });

router.get('/new', async (req,res)=>{
    res.render('tasks/new.ejs');
});

router.post('/', async (req, res) => {
    try {

    const currentUser = await User.findById(req.session.user._id);

      currentUser.task.push(req.body);

      await currentUser.save();

      res.redirect(`/users/${currentUser._id}/tasks`);
    } catch (error) {
      res.redirect('/');
    }
});

router.delete('/:itemId', async (req, res) => {
    try {

      const currentUser = await User.findById(req.session.user._id);

      currentUser.task.id(req.params.itemId).deleteOne();

      await currentUser.save();

      res.redirect(`/users/${currentUser._id}/tasks`);

    } catch (error) {
      res.redirect('/');
    }
});

router.get('/:itemId/edit', async (req, res) => {
    try {

      const currentUser = await User.findById(req.session.user._id);

      const task = currentUser.task.id(req.params.itemId);

      res.render('tasks/edit.ejs', { 

        item: item });
    } catch (error) {
      res.redirect('/');
    }
});

router.put('/:itemId', async (req, res) => {
    try {
    const currentUser = await User.findById(req.session.user._id);

    const task = currentUser.task.id(req.params.itemId);
    
      task.set(req.body);

      await currentUser.save();
    
      res.redirect(`/users/${currentUser._id}/tasks`);
    } catch (error) {
      res.redirect('/');
    };
});

module.exports = router;