require("dotenv").config();
const express = require("express");
const cors = require("cors");
const categoriesRouter = require("./routes/categoriesRouter");
const productsRouter = require("./routes/productsRoute");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json({ limit: "20kb" }));

app.use("/categories", categoriesRouter);
app.use("/products", productsRouter);

app.use((req, res) => {
  return res.status(404).json({ error: "Route not found." });
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const candidateStatus = err.statusCode || err.status;
  const status =
    Number.isInteger(candidateStatus) &&
    candidateStatus >= 400 &&
    candidateStatus < 500
      ? candidateStatus
      : 500;

  if (status >= 500) {
    console.error(err);
  }

  const message =
    status === 413
      ? "Request body is too large."
      : status === 400
        ? "Malformed request."
        : "Internal server error.";

  return res.status(status).json({ error: message });
});

app.listen(PORT, () => {
  console.log(`Server is live on port ${PORT}`);
});
