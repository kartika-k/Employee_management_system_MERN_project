
// const express = require('express');
// const dotenv = require('dotenv');
// const morgan = require('morgan');
// const connectDB = require('./server/database/connection');
// const path = require('path');
// var fileUpload = require('express-fileupload')
// const cors = require('cors');
// dotenv.config({path:'config.env'})
// const PORT = process.env.PORT || 3000;
// const app = express();
// app.use(fileUpload());
// app.use(cors());

// app.use(morgan('tiny'));
// connectDB();
// app.use(express.json());
// app.use(express.static(path.join(__dirname, "public")));
// app.get('/', (req, res) => {
//   res.send("Welcome to Employe management! ");
// })
// //API
// app.use('/',require('./server/route/router'))
// app.listen(PORT,()=>console.log(`Server is running on port ${PORT} ...`));


// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const connectDB = require('./server/database/connection');
const path = require('path');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('Error: MONGO_URI is not defined in the environment variables.');
  process.exit(1);
}

const app = express();

app.use(fileUpload());
app.use(cors());
app.use(morgan('tiny'));

// Connect to the database
connectDB();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
  res.send("Welcome to Employee management!");
});

// API routes
app.use('/', require('./server/route/router'));

app.listen(PORT, () => console.log(`Server is running on port ${PORT} ...`));
