var buttonColors = [ "red", "blue", "green", "yellow" ];
var level = 0;

var gamePattern = [];
var userClickedPattern = [];

var started = false;

$(document).keypress( function (){
    if(!started)
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
});

$(".btn").click( function handler() {

    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});

function nextSequence()
{
    userClickedPattern = [];
    level++;

    $("h1").text("Level " + level);

    var randomNumber = Math.floor( ( Math.random() *4 ) );
    var randomChosenColor = buttonColors[ randomNumber ];
    gamePattern.push(randomChosenColor);

    console.log(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeIn(100);;
    playSound(randomChosenColor);

    
    
}


function playSound(name) 
{
    var audio = new Audio("sounds/" + name + ".mp3");
      audio.play();
}

function animatePress(currentColor) 
{
    $("#" + currentColor).addClass("pressed");

    setTimeout( function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel)
{
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel])
    {   
        console.log("Success");
        if ( userClickedPattern.length === gamePattern.length )
        {
            setTimeout( function() {
                nextSequence();
            }, 1000);
        }
    }
        
    else
    {   
        console.log("Wrong");
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout( function() {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver()
{
    level = 0;
    started = false;
    gamePattern = [];    
}