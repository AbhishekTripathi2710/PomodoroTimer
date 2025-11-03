const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const {body} = require("express-validator");
const authMiddleare = require("../middleware/authMiddleware");

router.post('/register',
    body('email').isEmail().withMessage('Email must be a valid email address'),
    body('password').isLength({min:3}).withMessage('Password must be at least 3 characters long'),
    userController.createUserController
);

router.post('/login', 
    body('email').isEmail().withMessage('Email must be a valid email address'),
    body('password').isLength({ min: 3 }).withMessage('Password must be at least 3 characters long'),
    userController.loginController);

module.exports = router;