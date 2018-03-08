var express = require('express');
var bodyParser = require('body-parser');
var jsonfile = require('jsonfile')

var file = './data/jokes.json';
var jokes;
jsonfile.readFile(file, function(err, obj) {
  console.log("Json file read");
  jokes = obj;
})

var app = express();

app.use(bodyParser.json());

const port = process.env.port || process.env.PORT || 8000;
app.listen(port, function() {
    console.log('Servidor rodando na porta 8000..');
});

app.get('/joke', function(req, res) {  
  var index = Math.floor(Math.random() * 4);
  console.log("joke id: ", index);
  res.send(JSON.stringify(jokes[index]));
});


app.get('/joke/:jokeid', function(req, res) {
  console.log("joke id parameter: ", parseInt(req.params.jokeid) - 1);

  var joke = JSON.stringify(jokes[parseInt(req.params.jokeid) - 1]);
  if(joke){
    res.send(joke);
  }else{
    res.send("Está piada não existe! :/");
  }
  
});

  