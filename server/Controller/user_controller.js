// const Userdb = require("../model/user");
// const bcrypt = require('bcrypt');
// var jwt = require('jsonwebtoken');
// const saltRounds = 10;
// exports.CreateUser = (req,res)=>{
//   if(!req.body){
//     res.status(404).send({message:"Fields cannot be Empty!"||err.message});
//     return
//   }
//   bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
//    const newUser = new Userdb({
//     email:req.body.email,
//     password:hash
//   })
//   newUser.save()
//        .then((data)=>{
//         jwt.sign(
//         {id:data.id},
//         process.env.JWT_SECRET,
//         {expiresIn:'24h'},
//         (err,token)=>{
//             if(err) throw err;
//              res.status(201)
//                  .json({token,data})
//         }
//         )
//        })
//        .catch((err)=>{
//         res.status(500).json({ message: 'Error while creating User'||err.message });
//     });
// });
// }
// exports.UserLogin = async (req, res) => {
//     const {email, password} = req.body;
//     try {
//       const foundUser = await Userdb.findOne({ email: email });
//       const isMatch = await bcrypt.compare(password,foundUser.password);
//       if(isMatch) {
//         jwt.sign(
//             {id:foundUser.id},
//             process.env.JWT_SECRET,
//             {expiresIn:'24h'},
//             (err,token)=>{
//                 if(err) throw err;
//                  res.status(200)
//                      .json({token,foundUser})
//                     })
//       }else{
//     res.status(401).json('Invalid credentials.');
//     }   
//     } catch (error) {
//       res.status(500).json('Internal server error.'||error.message);
//     }
//   };

//   exports.getUser=(req,res)=>{
//     Userdb.findById(req.user.id)
//            .select('-password')
//            .then((user)=>{res.json(user)})
//   }
  
const Userdb = require("../model/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

// User Registration
// exports.CreateUser = async (req, res) => {
//   try {
//     if (!req.body.email || !req.body.password) {
//       return res.status(400).send({ message: "Email and password are required" });
//     }

//     // Check if user already exists
//     const existingUser = await Userdb.findOne({ email: req.body.email });
//     if (existingUser) {
//       return res.status(400).send({ message: "User already exists" });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

//     // Create and save the new user
//     const newUser = new Userdb({
//       email: req.body.email,
//       password: hashedPassword,
//     });

//     const savedUser = await newUser.save();

//     // Generate JWT token
//     const token = jwt.sign(
//       { id: savedUser._id },
//       process.env.JWT_SECRET,
//       { expiresIn: '24h' }
//     );

//     res.status(201).json({ token, user: savedUser });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error while creating user', error: err.message });
//   }
// };

// exports.CreateUser = async (req, res) => {
//   console.log(req.body); // Add this line to see the incoming request data
//   try {
//     if (!req.body.email || !req.body.password) {
//       return res.status(400).send({ message: "Email and password are required" });
//     }

//     // Check if user already exists
//     const existingUser = await Userdb.findOne({ email: req.body.email });
//     if (existingUser) {
//       return res.status(400).send({ message: "User already exists" });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

//     // Create and save the new user
//     const newUser = new Userdb({
//       email: req.body.email,
//       password: hashedPassword,
//     });

//     const savedUser = await newUser.save();

//     // Generate JWT token
//     const token = jwt.sign(
//       { id: savedUser._id },
//       process.env.JWT_SECRET,
//       { expiresIn: '24h' }
//     );

//     res.status(201).json({ token, user: savedUser });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error while creating user', error: err.message });
//   }
// };
exports.CreateUser = async (req, res) => {
  console.log("Received registration request:", req.body);
  
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Check if user already exists
    const existingUser = await Userdb.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ... rest of the function
  } catch (err) {
    console.error("Error in CreateUser:", err);
    res.status(500).json({ message: 'Error while creating user', error: err.message });
  }
};

// User Login
exports.UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const foundUser = await Userdb.findOne({ email: email });
    if (!foundUser) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: foundUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({ token, user: foundUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

// Get User
exports.getUser = async (req, res) => {
  try {
    const user = await Userdb.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};
