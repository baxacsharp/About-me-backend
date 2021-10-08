import express from "express"
import createError from "http-errors"
import contactSchema from "../module/index.js"

const contactRouter = express.Router()
contactRouter.post("/", async (req, res, next) => {
  try {
    const { name, email, message } = req.body
    const contact = new contactSchema({ email, message, name })
    const newContact = await contact.save()
    res.status(201).send(newContact)
  } catch (error) {
    next(createError(500, "Internal server error"))
  }
})

export default contactRouter
