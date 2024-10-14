// import jwt from 'jsonwebtoken';


// function authenticateToken(req, res, next) {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1]; // تقسيم Bearer عن التوكن

//     if (!token) return res.status(401).json({ message: 'Access Denied' });

//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//         if (err) return res.status(403).json({ message: 'Invalid Token' });
        
//         req.user = user;
//         next(); 
//     });
// }