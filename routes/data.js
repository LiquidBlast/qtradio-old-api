const routes       = require('express').Router(),
      log          = require('../dep/logger.js'),
      colors       = require('../dep/colors'),
      songDataFile = './songdata.json',
      songData     = require(songDataFile),
      fs           = require('fs');


routes.get('/postSongData', function(req, res) { 
        res.setHeader('Content-Type', 'application/json');
        log.print(1, `${colors.cyan('Request')} ${colors.green('->')} Data ${colors.yellow('/postSongData')} route from ${colors.magenta(req.connection.remoteAddress.substring(7))}`);
        if(!req.header.authorization) return res.status(401).send(JSON.stringify({ success: false, message: 'Nice try.'}));
        if(!req.header.authorization == "base64 key here") return res.status(401).send(JSON.stringify({ success: false, message: 'Nice try.'}));
        songData.nowPlaying = req.query.data;
        fs.writeFile(songDataFile, JSON.stringify(songData), function (err) {
            if (err) return log.print(1, `${colors.red('Error')} ${colors.green('->')} File ${colors.yellow('/songdata.json')}: ${colors.magenta(err)}`);
            log.print(1, `${colors.cyan('Data')} ${colors.green('->')} File ${colors.yellow('songdata.json')} was edited to add ${colors.magenta(req.query.data)} by ${colors.magenta(req.connection.remoteAddress.substring(7))}`);
          });
        res.status(200).send(JSON.stringify({ success: true, message: 'Successfully edited info!' }, null, 4)); 
});
    
routes.get('/getSongData', function(req, res) { 
        res.setHeader('Content-Type', 'application/json');
        log.print(1, `${colors.cyan('Request')} ${colors.green('->')} Data ${colors.yellow('/getSongData')} route from ${colors.magenta(req.connection.remoteAddress.substring(7))}`);
        let data = fs.readFileSync("songdata.json", "utf8");
        res.status(200).send(JSON.stringify({ success: true, message: JSON.parse(data) }, null, 4)); 
});
    
routes.get('/getStreamUptime', function(req, res) { 
        res.setHeader('Content-Type', 'application/json');
        log.print(1, `${colors.cyan('Request')} ${colors.green('->')} Data ${colors.yellow('/getStreamUptime')} route from ${colors.magenta(req.connection.remoteAddress.substring(7))}`);
        res.status(200).send(JSON.stringify({ success: true, message: Math.floor(process.uptime()) }, null, 4)); 
});

module.exports = routes;