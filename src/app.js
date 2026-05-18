const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");

const authRoutes = require("./modules/auth/auth.routes");
const ticketRoutes = require("./modules/tickets/ticket.routes");
const cookieParser =
require("cookie-parser");
const globalUserMiddleware =
require("./middlewares/globalUserMiddleware");

const app = express();

app.use(express.urlencoded({ extended: true }));


app.use(express.json());
app.use(cookieParser());
app.use(globalUserMiddleware);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(expressLayouts);
app.set("layout", "layout/main");

app.get("/", (req, res) => res.render("index"));
app.get("/signup", (req, res) => res.render("auth/signup"));
app.get("/login", (req, res) => res.render("auth/login"));



app.use("/", authRoutes);
app.use("/", ticketRoutes);
app.use(
   "/blogs",
   require("./modules/blogs/user/blog.routes")
);

module.exports = app;
