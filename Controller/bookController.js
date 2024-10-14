// import Books from '../Models/Books.js';
// import User from '../Models/User.js';

// export const createBook = async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id);

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         const book = new Books({
//             title: req.body.title,
//             publicDate: req.body.publicDate,
//             isAvailable: req.body.isAvailable,
//             author: user._id,
//         });

//         await book.save();
//         user.books.push(book._id);
//         await user.save();

//         res.status(201).json({ message: 'Book created successfully', book });
//     } catch (error) {
//         res.status(500).json({ message: 'Error creating book', error });
//     }
// };
