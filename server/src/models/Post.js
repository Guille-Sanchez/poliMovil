import mongoose from 'mongoose'

const Schema = mongoose.Schema

const PostSchema = new Schema({
  origen: String,
  destino: String,
  horario: String,
  asientosDisponibles: String,
  detalles: String,
  travelId: {
    type: Schema.Types.ObjectId,
    ref: 'Travel'
  },
  precio: String,
  created: String,
  updated: String,
  createdAt: {
    type: String,
    expires: '60s', // Autodelete post after 60 seconds
    default: Date.now
  }
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
