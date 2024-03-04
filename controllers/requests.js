import { Profile } from "../models/profile.js"
import { Request } from "../models/request.js"


async function create(req, res) {
  try {
    req.body.author = req.user.profile
    const request = await Request.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { requests: request } },
      { new: true }
    )
    request.author = profile
    res.status(201).json(request)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export {
  create,
}