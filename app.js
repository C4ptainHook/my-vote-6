const express = require("express");
const app = express();
const port = 3002;
const sequelize = require("./util/database");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const mainPageRoutes = require("./routes/main");
const votingRoutes = require("./routes/voting");
const newPollRoutes = require("./routes/newpoll");
const authRoutes = require("./routes/auth");
const errorController = require("./controllers/error");
require("./models/associations");

const cors = require("cors");
sequelize
  .sync()
  .then((result) => {
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use(cookieParser());
const corsOptions = {
  origin: process.env.CORS_ALLOW_ORIGIN || "*",
  credentials: true,
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/newpoll", newPollRoutes);
app.use("/voting", votingRoutes);
app.use("/", mainPageRoutes);

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use((req, res) => {
  errorController.notFound(req, res);
});
