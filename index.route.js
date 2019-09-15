const express = require('express')
const userRoutes = require('./server/user/user.route')

const router = express.Router()

router.use('/user', userRoutes)

module.exports = router