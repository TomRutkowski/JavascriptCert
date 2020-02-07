let triggered = false;

function display()
{
  if (triggered == false)
  {
    let answerArray = document.querySelectorAll('.answer_radio');
    let imageArray = document.querySelectorAll
    ('.answer_checkbox');
    for (let answerNode of answerArray)
    {
      if (answerNode.checked || imageArray[answerNode.id].getAttribute("Alt") == "True")
      {
        imageArray[answerNode.id].removeAttribute("hidden");
      }
    }
    let justification = document.getElementById("justification");
    justification.removeAttribute("hidden");
    triggered = true;
  }
  else
  {
    //do nothing
  }
}