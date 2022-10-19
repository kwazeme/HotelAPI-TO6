//New file by Joseph Garner------------------------------------------->
const {requiresAuth } = require('express-openid-connect');

const authorize = async (req,res,next)=>{
    
    if(req.oidc.isAuthenticated()){
        return next();
    }
    res.status(403).send('Access denied. You must log in first');
}

module.exports = authorize;
//-------------------------------------------------------------------->