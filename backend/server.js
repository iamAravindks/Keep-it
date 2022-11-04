import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser"

import config from './config.js'
import connectDB from "./config/db.js"

const { PORT } = config
const app = express()
const PORT_LISTEN = PORT || 5000
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  })
);

connectDB()

app.listen(PORT_LISTEN, () => console.log(`server listens on http://localhost:${ PORT_LISTEN }`))

