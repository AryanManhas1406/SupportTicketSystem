const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");

const authRoutes = require("./modules/auth/auth.routes");
const ticketRoutes = require("./modules/tickets/ticket.routes");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(expressLayouts);
app.set("layout", "layout/main");

app.get("/", (req, res) => res.render("index"));
app.get("/signup", (req, res) => res.render("auth/signup"));
app.get("/login", (req, res) => res.render("auth/login"));
app.get("/create-ticket", (req, res) => res.render("tickets/create-ticket"));
app.get("/my-tickets", (req, res) => res.render("tickets/myTickets"));
app.get("/admin-dashboard", (req, res) => res.render("adminDashboard"));

app.use("/", authRoutes);
app.use("/", ticketRoutes);

module.exports = app;
