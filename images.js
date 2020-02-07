const http = require('http');
const fs = require('fs');

module.exports = {
  getImage: function (imageName, req, res)
  {
    fs.readFile(imageName, function(err, data) 
    {
      if (err == null)
      {
        res.writeHead(200, {'Content-Type': 'image/png'});
        res.write(data);
        res.end();
      }
      else
      {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end();
      }
    });
  }
};