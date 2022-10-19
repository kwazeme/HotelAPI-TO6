//New file by Joseph Garner------------------------------------------->
//const {requiresAuth } = require('express-openid-connect');
/*const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENTID,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
  };
const { requiresAuth, auth } = require('express-openid-connect');
const express = require('express');
const app = express();*/
//app.use(auth(config));
const {requiresAuth } = require('express-openid-connect');
const authorize = async (req,res,next)=>{
    
    if(req.oidc.isAuthenticated()){
        return next();
    }
    res.status(403).send('Access denied. You must log in first');
}

module.exports = authorize;
//-------------------------------------------------------------------->