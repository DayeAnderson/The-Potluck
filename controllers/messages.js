const Message = require('../models/message')

module.exports = {
  index,
  create,
  show,
  reply,
  delete: deleteMessage
}

function deleteMessage(req, res) {
  Message.findByIdAndDelete(req.params.id)
  .then(() => {
    res.redirect('/messages')
})
}
function reply(req, res) {
  req.body.postedBy = req.user.name
  req.body.avatar = req.user.avatar
  Message.findById(req.params.id)
  .then((message) => {
    message.replies.push(req.body)
    message.save()
    .then( ()=> {
      res.redirect(`/messages/${req.params.id}`)
    })
  })
}

function show(req, res) {
  Message.findById(req.params.id)
  .then((message) => {
    res.render('messages/show', {
      title: 'Message Board',
      user: req.user,
      message
    })
  })
}

function create(req, res) {
  req.body.postedBy = req.user.name
  req.body.avatar = req.user.avatar
  Message.create(req.body)
  .then( () => {
    res.redirect('/messages')
  })
}

function index(req, res) {
  Message.find({})
  .then((messages) => {
    res.render('messages/index', {
      title: 'Message Board',
      user: req.user,
      messages: messages.reverse()
    })
  })
}