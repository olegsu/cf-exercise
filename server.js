var express      = require('express');
var randomstring = require("randomstring");
var rn           = require('random-number');
var app          = express();


var identifiers = {};


app.get('/api/getIdentifier', function (req, res) {
    var identifier          = randomstring.generate(7);
    identifiers[identifier] = {
        identifier: identifier
    };
    res.send(identifier);
});

app.get('/api/:identifier', function (req, res) {
    if (!identifiers[req.params.identifier]) {
        return res.status(400).send("identifier does not exist");
    }

    var num = rn({min: 0, max: 50, integer: true});
    if (num === 0 || num === 1 || num === 2) {
        if (num === 0 || num === 2){
            delete identifiers[req.params.identifier];
        }
        return res.send(num.toString());
    }
    else {
        return res.send(`Codefresh random string: ${randomstring.generate(7)}`)
    }
});

app.get('/hire.png', function(req, res){
    res.sendFile('hire.png', {root: __dirname })
});

app.get('*', function(req, res){
    res.sendFile('index.html', {root: __dirname })
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});