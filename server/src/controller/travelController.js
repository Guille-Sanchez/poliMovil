import { Travel } from '../models/Travels.js'

export const addPassangerToTravel = (req, res) => {
  const userId = req.userId
  const travelId = req.params.id

  Travel.findByIdAndUpdate(travelId, { $push: { passengerId: userId } }, { new: true }).populate('passengerId driverId')
    .then(travel => {
      res.status(200).json(travel)
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

  Travel.findByIdAndUpdate(travelId, { $pull: { passengerId: userId } }, { new: true }).populate('passengerId driverId')
    .then(travel => { res.status(200).json(travel) })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
}
