import { Post } from '../models/Post.js'
import { Travel } from '../models/Travel.js'
import { User } from '../models/User.js'

export const addPassengerToTravel = (req, res) => {
  const userId = req.userId
  const travelId = req.params.id
  const postId = req.body.postId

  // Verify if there are available seats
  Post.findById(postId).populate({
    path: 'travelId',
    populate: {
      path: 'driverId passengerId',
      model: 'User',
      select: '-password -isAdmin -travels'
    }
  })
    .then(post => {
      if (+post.asientosDisponibles === post.travelId.passengerId.length) {
        return res.status(409).json(post.travelId)
      } else {
        // If there are seats available, add the passenger to the travel
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
