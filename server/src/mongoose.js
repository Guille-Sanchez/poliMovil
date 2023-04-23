import mongoose from 'mongoose'

export const connectDB = ({ app }) => {
  mongoose.connect(process.env.MONGO_URL)
    .then(() => {
      app.listen(process.env.PORT, () => {
        console.log('Listening to port:', process.env.PORT)
      })
    })
    .catch((error) => {
      console.log(error)
    })
}
