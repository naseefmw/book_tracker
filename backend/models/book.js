const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  apiId: {
    type: String,
    required: true,
  },
  author: String,

  status: {
    type: String,
    required: true,
  },
  image: String,
  pageCount: {
    type: Number,
    required: true,
  },
  currentPage: Number,
  startDate: Date,
  endDate: Date,
  rating: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

bookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Book', bookSchema)
