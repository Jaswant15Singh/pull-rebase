const express = require("express");
const path = require("path");
const emp_router = require("./Routes/employee");
const supplier_router = require("./Routes/supplier");
const category_router = require("./Routes/category");
const session = require("express-session");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// app.use((req,res,next)=>{
//     next();
// })

app.use(
  session({
    secret: "yourSecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    },
  })
);

app.use("/employee", emp_router);
app.use("/supplier", supplier_router);
app.use("/category", category_router);
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message, status: false });
});
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

//updated main