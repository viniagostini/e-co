const express = require('express');

const validate = require('express-validation');
const paramValidation = require('./auth.validator');
const authCtrl = require('./auth.controller');
const router = express.Router(); // eslint-disable-line new-cap

const expressJwt = require('express-jwt');
const config = require('../../config/config');

/** POST /api/auth - Returns token if correct dni and password is provided */
router.route('/')
  .post(validate(paramValidation.login), authCtrl.login);


module.exports = router;