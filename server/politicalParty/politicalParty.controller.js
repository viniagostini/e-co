const PoliticalParty = require('./politicalParty.model')

/**
 * Create new Political Party
 */
const create = async (req, res, next) => {
  try {
    const party = new PoliticalParty(req.body)
    const savedParty = await party.save()
    res.json(savedParty)
  } catch (err) {
    next(err)
  }
}

/**
 * Get all political parties ordered by name
 */
const getAll = async (req, res, next) => {
  try {
    const parties = await PoliticalParty.find({})
      .sort('name')
      .exec()
    res.json(parties)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  create,
  getAll,
}
