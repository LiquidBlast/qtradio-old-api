const express      = require('express'),
      app          = express(),
      log          = require('./dep/logger.js'),
      colors       = require('./dep/colors'),
      config       = require('./config.json');

const main     = require('./routes/main.js'),
      data    = require('./routes/data.js');
    
app.use('/', main);
app.use('/data', data);

app.get('*', function(req, res) { 
    res.setHeader('Content-Type', 'application/json');
    log.print(1, `${colors.cyan('Request')} ${colors.green('->')} Unknown route from ${colors.magenta(req.connection.remoteAddress.substring(7))}`);
    res.status(404).send(JSON.stringify({ success: false, message: 'Unknown endpoint!'}, null, 4)); 
});

app.listen(config.port, () => {
  log.print(1, `${colors.cyan('Main')} ${colors.green('->')} Listening on port ${colors.yellow(config.port)}`);
}); 
