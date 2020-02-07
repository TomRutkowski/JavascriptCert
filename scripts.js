const http = require('http');
const fs = require('fs');

var outputJSON;

function getJS(req, res, err, data)
{
    if (err == null)
    {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    }
    else
    {
      res.writeHead(404, {'Content-Type': 'text/javascript'});
      res.end();
    }
}

module.exports = 
{
  getUtilities: function (req, res)
  {
    fs.readFile('utilities.js', function(err, data) 
    {
      getJS(req, res, err, data);
    });
  },

  getQuestions: function (req, res)
  {
    fs.readFile('questions.js', function(err, data) 
    {
      getJS(req, res, err, data);
    });
  }

}