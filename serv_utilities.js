//custom modules
const css = require('./css');
const scripts = require('./scripts');
const images = require('./images');

module.exports = { 
  getUtilities: function(req, res)
  {
    //fetch utility files
    if (req.url == '/style.css')
    {
      css.getCSS(req, res);
      return true;
    }

    if (req.url == '/utilities.js')
    {
      scripts.getUtilities(req, res);
      return true;
    }

    if (req.url == '/questions.js')
    {
      scripts.getQuestions(req, res);
      return true;
    }

    if (req.url == '/images/checkbox_false.png')
    {
      images.getImage('images/checkbox_false.png', req,res);
      return true;
    }

    if (req.url == '/images/checkbox_true.png')
    {
      images.getImage('images/checkbox_true.png', req,res);
      return true;
    }

    return false;
  }
}