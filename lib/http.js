var express = require('express')
    , app = express()
    , serveStatic = require('serve-static')
    ;

app.get('/favicon.ico', function (req, res) {
    res.statusCode = 404;
    res.end();
});

app.post('/', function (req, res) {
    var headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            'Access-Control-Request-Method': '*',
            'Access-Control-Allow-Methods': '*',
            'Content-Type': 'image/svg+xml'
        }
        , status = 200
        , content = {}
        , output = ""
        ;

    req.on('data', function (chunk) {
        try {
            // Validate request content as JSON
            content = JSON.parse(chunk.toString());
            output = require('./d3')(content.type, content.data);
        }
        catch (e) {
            // If not a valid JSON, returns an error 400
            headers['Content-Type'] = 'text/plain';
            status = 400;
            output = "400 Bad request " + e;
        }

        res.writeHead(status, headers);

        res.end(JSON.stringify(output));
    });
});

app.use(serveStatic('demo', {'index': ['example.html']}));

var server = app.listen(1337, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
});