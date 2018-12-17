const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId

const issue = new Schema({
  id: ObjectId,
  desc: String,
  assignedTo: String,
  status: String
})

module.exports = mongoose.model('Issue', issue);