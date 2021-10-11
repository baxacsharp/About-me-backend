import express from "express"
import mongoose from "mongoose"
import contactRouter from "./route/index.js"
import cors from "cors"
import listEndpoints from "express-list-endpoints"
const server = express()
const port = process.env.PORT || 3001
if (process.env.TS_NODE_DEV || process.env.NODE_ENV === "test")
  require("dotenv").config()

server.use(cors({ origin: "https://about-me-olive.vercel.app", credentials: true }))
server.use(express.json())
server.use("/contact", contactRouter)
console.table(listEndpoints(server))
const { MONGO_CONNECTION } = process.env
if (!MONGO_CONNECTION) throw new Error("No Mongo DB specified")

mongoose
  .connect(MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    server.listen(port, () => console.log("Server running on port", port))
  )
  .catch((e) => console.log(e))
