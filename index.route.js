const express = require('express')
const userRoutes = require('./server/user/user.route')
const politicalPartyRoutes = require('./server/politicalParty/politicalParty.route')
const router = express.Router()

router.use('/user', userRoutes)
router.use('/politicalParty', politicalPartyRoutes)

module.exports = router
