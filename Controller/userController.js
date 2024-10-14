// import User from '../Models/User.js';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';

// export const register = async (req, res) => {
//     const { username, email, password } = req.body;

//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//         return res.status(400).json({ message: 'Email already in use' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 5);
//     const newUser = new User({ username, email, password: hashedPassword });
//     await newUser.save();

//     const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     return res.status(201).json({ message: "User Registered Successfully!", user: newUser, token });
// };

// export const login = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(400).json({ message: "User Not Found" });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);

//         if (!isMatch) {
//             return res.status(400).json({ message: "Incorrect Password" });
//         }

//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//         return res.status(200).json({ message: "Login Successful", user, token });
//     } catch (error) {
//         return res.status(500).json({ message: 'Server error', error });
//     }
// };

// export const getAllUsers = async (req, res) => {
//     try {
//         const users = await User.find({});
//         res.status(200).json(users);
//     } catch (err) {
//         res.status(500).json({ message: 'Server error', err });
//     }
// };

// export const getUserById = async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id).populate('books');

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({ message: 'Error retrieving user', error });
//     }
// };
