const mongoose = require('mongoose')

const PoliticalPartySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
})

module.exports = mongoose.model('PoliticalParty', PoliticalPartySchema)
