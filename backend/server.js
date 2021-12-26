const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const path = require("path");
const connectDatabase = require("./config/db");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();

// Load config
dotenv.config();

//

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Accept json content and file uploads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

// Rotues
app.use("/api/products", require("./routes/api/products"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/order", require("./routes/api/order"));

app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

const ___dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(___dirname, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(___dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Database connection and run server
connectDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Server running on ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
