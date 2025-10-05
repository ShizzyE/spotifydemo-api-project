const express = require('express');

const userController = require('..//controllers/users')

const router = new express.Router();

// routes
router.get('/', userController.index)
router.post('/', userController.create);
router.patch('/:id', userController.update);
router.delete('/:id', userController);