const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const http = require('http');
const cookieParser = require("cookie-parser");

const appRoutes = require("./routes"); 

const db = require("./config/db");

const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev'));

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use("/uploads", express.static("uploads"));

app.use(appRoutes);

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});