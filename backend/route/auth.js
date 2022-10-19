//Joseph Garner: 10-17-22----------------------------------------------------------------
const routes = require('express').Router();
const {requiresAuth } = require('express-openid-connect');


routes.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  });

  routes.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});


routes.get('/login', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});

module.exports=routes;
//----------------------------------------------------------------------------------------------