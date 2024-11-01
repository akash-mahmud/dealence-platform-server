import express from 'express'
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import passport from "passport";
import expressSession from "express-session";
import * as  _ from "./models";
import router from './routes';

require("dotenv").config();

const app = express();
app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ limit: "100mb" }));
app.use(bodyParser.json({ limit: "100mb" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://127.0.0.1:5173",
      "http://localhost:5173",
      "http://panel.dealence.com",
      "https://app.dealence.com",
      "http://localhost:3000",
      "http://localhost:3001"
    ],
    credentials: true,
  })
);

app.use(
  expressSession({
    secret: "dealence",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

app.use("/api", router);

const port = process.env.PORT || 4000;

app.listen(port, async () => {
  console.log(`Server started at http://localhost:${port}`);
});
