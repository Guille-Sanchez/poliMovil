import mongoose from 'mongoose'

const Schema = mongoose.Schema

const PostSchema = new Schema({
  origen: String,
  destino: String,
  horario: String,
  asientosDisponibles: Number,
  detalles: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  pasajeros: [String]
},
{
  timestamps: true
})

PostSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export const Post = mongoose.model('Post', PostSchema)
