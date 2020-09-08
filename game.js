// $("h1").css("color","red");
var buttonColours =["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var start=false;
var level=0;

$("body").keypress(function(){
  if(!start){
  start=true;
  userClickedPattern=[];
  nextSequence();
}
});
function nextSequence()
{
  level++;
  $("#level-title").text("Level "+level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour =buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  // var audio = new Audio("sounds/"+randomChosenColour+".mp3");
  // audio.play();

  console.log(randomNumber);
}

$(".box").click(function(event){
  var userChosenColour =this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  CheckSequence();
  console.log(userClickedPattern);
});
function playSound(name)
{
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
      $("#"+currentColour).removeClass("pressed");
  },100);

}

function CheckSequence(){
  // if(userClickedPattern.length==gamePattern.length){
  var valid=true;
  for(let i=0;i<userClickedPattern.length;i++)
  {
    if(gamePattern[i]!=userClickedPattern[i]){
      valid=false;
      break;
    }
  }
  if(valid){
    setTimeout(function(){
      nextSequence();
      userClickedPattern=[];
    },1000);

  }
  else{
    start=false;

    $("#level-title").text("Game Over Press any key to Restart");
    $("body").addClass("game-over");
    playSound("wrong");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200)
    userClickedPattern=[];
    gamePattern=[];
    level=0;
  }
// }
}
