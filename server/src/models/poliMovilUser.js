import mongoose from 'mongoose'

const Schema = mongoose.Schema

const PoliMovilUserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  posts: {
    type: [Schema.Types.ObjectId],
    ref: 'PoliMovilPost'
  }
},
{
  timestamps: true
})

PoliMovilUserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.password
  }
})

export const PoliMovilUser = mongoose.model('PoliMovilUser', PoliMovilUserSchema)
