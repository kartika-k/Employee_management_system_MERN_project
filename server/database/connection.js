// const mongoose = require('mongoose');

// const connectDB = async ()=>{
//   try{
//   const conn = await mongoose.connect(process.env.MONGO_URI);
//   console.log(`MongoDB connected: ${conn.connection.host}`);
//   }
//   catch(err){
//     console.log(err);
//     process.exit(1);
//   }
// }
// module.exports = connectDB;

const mongoose = require('mongoose');

const connectDB = async () => {
  console.log('MONGO_URI:', process.env.MONGO_URI); // Debug line

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
