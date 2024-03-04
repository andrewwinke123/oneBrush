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

async function index(req, res) {
  try {
    const requests = await Request.find({})
      .populate('author')
      .sort({ createdAt: 'desc' })
    res.status(200).json(requests)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function show(req, res) {
  try {
    const request = await Request.findById(req.params.requestId)
      .populate(['author', 'comments.author'])
    res.status(200).json(request)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function update(req, res) {
  try {
    const request = await Request.findByIdAndUpdate(
      req.params.requestId,
      req.body,
      { new: true }
    ).populate('author')
    res.status(200).json(request)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function deleteRequest(req, res) {
  try {
    const request = await Request.findByIdAndDelete(req.params.requestId)
    const profile = await Profile.findById(req.user.profile)
    profile.requests.remove({ _id: req.params.requestId })
    await profile.save()
    res.status(200).json(request)
  } catch (error) {
    res.status(500).json(error)
  }
}

export {
  create,
  index,
  show,
  update,
  deleteRequest as delete
}