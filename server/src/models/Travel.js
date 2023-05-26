import mongoose from 'mongoose'

const Schema = mongoose.Schema

const TravelSchema = new Schema({
  driverId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  passengerId: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }
},
{
  timestamps: false
})

TravelSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export const Travel = mongoose.model('Travel', TravelSchema)
