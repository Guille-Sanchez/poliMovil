import mongoose from 'mongoose'

const Schema = mongoose.Schema

const PoliMovilPostSchema = new Schema({
  origen: String,
  destino: String,
  horario: String,
  numeroAsientos: Number,
  detalles: String,
  usuarioId: {
    type: Schema.Types.ObjectId,
    ref: 'PoliMovilUser'
  },
  pasajeros: [String]
},
{
  timestamps: true
})

PoliMovilPostSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export const PoliMovilPost = mongoose.model('PoliMovilPost', PoliMovilPostSchema)
