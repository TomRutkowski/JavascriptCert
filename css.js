const http = require('http');
const fs = require('fs');

module.exports = {
  getCSS: function (req, res)
  {
    fs.readFile('style.css', function(err, data) 
    {
      if (err == null)
      {
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.write(data);
        res.end();
      }
      else
      {
        res.writeHead(404, {'Content-Type': 'text/css'});
        res.end();
      }
    });
  }
};