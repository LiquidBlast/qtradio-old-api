const routes = require('express').Router(),
      log    = require('../dep/logger.js'),
      colors = require('../dep/colors');

routes.get('/', function(req, res) { 
    res.setHeader('Content-Type', 'application/json');
    log.print(1, `${colors.cyan('Request')} ${colors.green('->')} Main ${colors.yellow('/')} route from ${colors.magenta(req.connection.remoteAddress.substring(7))}`);
    res.status(200).send(JSON.stringify({ success: true, message: 'Welcome to the qtradio.moe API!'}, null, 4)); 
}); 

routes.get('/discord', function(req, res) { 
    log.print(1, `${colors.cyan('Request')} ${colors.green('->')} Main ${colors.yellow('/discord')} route from (${colors.magenta(req.connection.remoteAddress.substring(7))}`);    
    res.redirect('https://discord.gg/HJmmmTB');
});