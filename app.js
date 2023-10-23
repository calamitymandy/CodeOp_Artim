const cors = require("cors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const categoriesRouter = require("./routes/categories");
const usersRouter = require("./routes/users");
const public_searchRouter = require("./routes/public_search");
const user_searchRouter = require("./routes/user_search");
const postsRouter = require("./routes/posts");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/posts", postsRouter);
app.use("/categories", categoriesRouter);
app.use("/users", usersRouter);
app.use("/public_search", public_searchRouter);
app.use("/user_search", user_searchRouter);

module.exports = app;
