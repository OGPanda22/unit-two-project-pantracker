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
  console.log("loading edit form", req.session)
    try {

      const currentUser = await User.findById(req.session.user._id);
      console.log(currentUser)
      const task = currentUser.task.id(req.params.itemId);
      console.log(task, currentUser)
      res.render('tasks/edit.ejs', { 

        task: task });
    } catch (error) {
      res.redirect('/');
    }
});

router.put('/:itemId', async (req, res) => {
    try {
    const currentUser = await User.findById(req.session.user._id);

    const task = currentUser.task.id(req.params.itemId);

    if(!Object.hasOwn(req.body,"isComplete")){
      req.body.isComplete = false;
    } else {
      req.body.isComplete = true;
    };
    
    
      task.set(req.body);

      await currentUser.save();
    
      res.redirect(`/users/${currentUser._id}/tasks`);
    } catch (error) {
      console.log(error);
      res.redirect('/');
    };
});

module.exports = router;