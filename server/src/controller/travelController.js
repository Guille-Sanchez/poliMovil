import { Travel } from '../models/Travel.js'
import { User } from '../models/User.js'

export const addPassengerToTravel = (req, res) => {
  const userId = req.userId
  const travelId = req.params.id

  Travel.findByIdAndUpdate(travelId, { $push: { passengerId: userId } }, { new: true })
    .populate('passengerId driverId')
    .then(travel => {
      User.findByIdAndUpdate(userId, { $push: { travels: travelId } }, { new: true }
      )
        .then(() => {
          res.status(200).json(travel)
        })
        .catch(err => {
          res.status(500).json({
            error: err
          })
        })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
}

export const removePassengerFromTravel = (req, res) => {
  const userId = req.userId
  const travelId = req.params.id

  Travel.findByIdAndUpdate(travelId, { $pull: { passengerId: userId } }, { new: true })
    .populate('passengerId driverId')
    .then(travel => {
      User.findByIdAndUpdate(userId, { $pull: { travels: travelId } }, { new: true }
      )
        .then(() => {
          res.status(200).json(travel)
        })
        .catch(err => {
          res.status(500).json({
            error: err
          })
        })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
}
