const jwt = require('jsonwebtoken');
const JWT_SECRET = 'amirisagoodbo$Y';
const fetchuser = (req, res , next ) => {
// Get the user from the jwt token and add the id to req  object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: 'Please authenticate using the valid token'})
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {   
        res.status(401).send({error: 'Please authenticate using the valid token'})
    }
   
}

module.exports = fetchuser;