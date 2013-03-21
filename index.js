var https = require('https');
var send  = require('send');
var fs    = require('fs');
var path  = require('path');
var opts  = {
    key: fs.readFileSync(path.resolve(__dirname, '.ssl/https.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, '.ssl/cert.pem'))
};

var app = https.createServer(opts, function (req, res) {
    send(req, req.url)
        .root(__dirname)
        .pipe(res);
}).listen(3131);