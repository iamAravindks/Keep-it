import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser"
import config from './config.js'
import connectDB from "./config/db.js"
import userRouter from "./routes/userRouter.js";
import path from "path";
import { fileURLToPath } from "url";
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
app.get("/test-api", async(req, res) =>
{
  res.send("success")
})
app.use("/api/users", userRouter);
app.use("/api/notes", noteRouter)

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/build")));
//   app.get("*", (req, res) => {
//     const filePath = path.join(__dirname, "../frontend/build");
//     res.sendFile(path.resolve(filePath, "index.html"));
//   });
// }


app.use(notFound);
app.use(errorHandler);

connectDB()

app.listen(PORT_LISTEN, () => console.log(`server listens on http://localhost:${ PORT_LISTEN }`))


