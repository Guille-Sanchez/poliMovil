import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: String,
  lastName: String,
  email: String,
  password: String,
  isAdmin: Boolean,
  phone: String,
  travels: [{
    type: Schema.Types.ObjectId,
    ref: 'Travel'
  }]
},
{
  timestamps: false
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
