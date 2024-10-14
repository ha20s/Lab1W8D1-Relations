import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from './Models/User.js'; 
import Books from './Models/Books.js'; 

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());



app.post('/register', async(req , res) => {
    const { username , email , password } = req.body;

    const existingUser = await User.findOne({email})

    if ( existingUser ) {
        return res.status(400).json ({message :'Eamil already in use'})
    }

    const hashedPassword = await bcrypt.hash(password, 5) 

    const newUser = new User ({
        username , email , password: hashedPassword
    });
    await newUser.save()

    const token = jwt.sign({
        id : newUser._id , email : newUser.email
    } , process.env.JWT_SECRET , {expiresIn : '1h'})


    return res.status(201).json({
        message: "User Registered Successfully!",
        user: newUser, token: token
      });
    
    })



    function authenticateToken(req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
    
        if (!token) return res.status(401).json({ message: 'Access Denied' });
    
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return res.status(403).json({ message: 'Invalid Token' });
            
            req.user = user;
            next(); 
        });
    }
    
    


app.get('/users'  , async (req, res)=>{

    try {
        const users = await User.find({})
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({message : 'Server error', err })

    }
})

app.get('/user/:id', async (req, res) => {
    try {

      const user = await User.findById(req.params.id).populate('books'); 
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  

      res.status(200).json(user); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving user', error });
    }
  });


app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User Not Found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect Password" });
        }

        const token = jwt.sign(
            { id: user._id },  
            process.env.JWT_SECRET, 
            { expiresIn: '6h' }  
        );

        return res.status(200).json({
            message: "Login Successful",
            user: user,  
            token: token
        });

    } catch (error) {

        return res.status(500).json({ message: 'Server error', error });
    }
});



app.post('/book', authenticateToken, async (req, res) => {
    try {

      const user = await User.findById(req.user.id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const book = new Books({
        title: req.body.title,
        publicDate: req.body.publicDate,
        isAvailable: req.body.isAvailable,
        author: user._id, 
      });
  

      await book.save();
      console.log('New Book created:', book);
  

      user.books.push(book._id); 
      console.log('User books before saving:', user.books);
  

      await user.save();
  

      res.status(201).json({
        message: 'Book created successfully',
        book: book,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating book', error });
    }
  });
  





async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}
main().catch(err => console.log("Error connecting to MongoDB: ", err));



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


{/*
    import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './Routes/userRoutes.js'; // Ensure this path is correct

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Use the user routes
app.use('/users', userRoutes);

async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}
main().catch(err => console.log("Error connecting to MongoDB: ", err));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

*/}