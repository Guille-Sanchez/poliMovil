import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  posts: {
    type: [Schema.Types.ObjectId],
    ref: 'Post'
  }
},
{
  timestamps: true
})

UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.password
  }
})

export const User = mongoose.model('User', UserSchema)
