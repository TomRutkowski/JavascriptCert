//standard modules
const http = require('http');
const url = require('url');
const fs = require('fs');
const qs = require('querystring');
const utils = require('./serv_utilities');



function defaultContent(req, res)
{
  res.write('<body><br>');
  res.write('<script type="text/javascript" src="/utilities.js"></script>');
  res.write('<button class="startBtn" onclick="redirect(\'q=0\')">Start Quiz</button>');
  res.write('</body>');
  res.end();
}

function thankYouContent(req, res)
{
  res.write('<body><br>');
  res.write('Thank you so much for completing the quiz! Please suggest any future features to Timevir at the Salesforce Exchange Discord: https://discord.gg/6eQFVUv <br>');
  res.write('I hope you had as much fun using this quiz as much as I did in making it. Message if you\'d like the source code! This quiz was made in node.js.');
  res.write('</body>');
  res.end();
}

function returnCheckbox(answerBool, id)
{
  if (answerBool == true)
  {
    return '<img id="' + id + '" class="answer_checkbox" src="/images/checkbox_true.png" alt="True" height="40" width="40" hidden="True">';
  }
  else
  {
    return '<img id="' + id + '" class="answer_checkbox" src="/images/checkbox_false.png" alt="False" height="40" width="40" hidden="True">';
  }
}

http.createServer(function (req, res) 
{
  //if requesting utility file, serve file directly
  if (utils.getUtilities(req, res))
  {
    return;
  }

  //Header + Heading
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<link rel="stylesheet" type="text/css" href="/style.css" />');

  res.write('<header>');
  res.write('<h1>Tom\'s Javascript Fundamentals Quiz</h1>');
  res.write('</header>');

  //Dynamic content (if supplied param)
  params = qs.parse(req.url.substr(1));

  if (params.q != undefined)
  {
    if (isNaN(Number(params.q)) || Number(params.q) < 0)
    {
      defaultContent(req, res);
      return;
    }
    let jsonString = new Object();

    fs.readFile('questions.json', function(err, data)
    {
      if (err == null)
      {

        jsonString = JSON.parse(String(data));
        if (jsonString[params.q] == undefined)
        {
          thankYouContent(req, res);
          return;
        }
        res.write('<body>');
        res.write('<script type="text/javascript" src="/utilities.js"></script>');
        res.write('<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/styles/default.min.css">');
        res.write('<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/highlight.min.js"></script>');
        res.write('<script>hljs.initHighlightingOnLoad();</script>');
        res.write('<div id="question" title="'+ params.q +'">' + jsonString[params.q].QuestionText + '</div><br>');

        if (jsonString[params.q].Code.Type != 'none')
        {
          res.write('<div id="code"><pre><code class="'+ jsonString[params.q].Code.Type +'">' + jsonString[params.q].Code.Text +'</code></pre></div><br>');
        }
        
        res.write('<div id="answers">');
        
        let i = 0;

        for(const answer of jsonString[params.q].Answers)
        {
          res.write('<input class="answer_radio" id="' + i + '" type="radio" name="answer" value="' + answer.Answer + '" data-correct="' + answer.IsCorrect + '">' + answer.Answer + returnCheckbox(answer.IsCorrect, i++) + '<br>');
        }

        res.write('</div><br>');

        res.write('<div id="justification" hidden="true">' + '<u>Justification</u><br><br>' + jsonString[params.q].Justification + '</div><br>');
        res.write('<button class="confirmBtn" onclick="display()">Check</button>');
        res.write('<button class="prevBtn" onclick="redirect(\'q=' + (Number(params.q) - 1) + '\')">Previous</button>');
        res.write('<button class="nextBtn" onclick="redirect(\'q=' + (Number(params.q) + 1) + '\')">Next</button>');
        res.write('<script type="text/javascript" src="/questions.js"></script>');
        res.write('</body>');
        res.end();
      }
    });
    return;
  }

  //Default content(start)
  defaultContent(req, res);
  
}).listen(process.env.PORT || 8888);
