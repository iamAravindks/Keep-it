import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser"
import config from './config.js'
import connectDB from "./config/db.js"
import userRouter from "./routes/userRouter.js";

import { errorHandler, notFound } from "./middlewares/errorHandler.js";
import noteRouter from "./routes/noteRouter.js"


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

app.use("/api/users", userRouter);
app.use("/api/notes",noteRouter)


app.use(notFound);
app.use(errorHandler);

connectDB()

app.listen(PORT_LISTEN, () => console.log(`server listens on http://localhost:${ PORT_LISTEN }`))

