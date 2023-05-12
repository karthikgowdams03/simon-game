var btncolors = ['red', 'blue', 'green', 'yellow'];
var gamepattern = [];
var userClickedPattern = [];
var started =false;
var level=0;

$(document).keypress(function(){
    if(!started)
    {
        $("#level-title").text("Level " + level);
        nextSequence();
        started=true;
    }
    
});

$('.btn').on('click', function () {
    var userChosencolor = $(this).attr("id");
    userClickedPattern.push(userChosencolor);
    //  console.log(userClickedPattern);
    playsound(userChosencolor);
    animatepress(userChosencolor);
    checkanswer(userClickedPattern.length-1);
});

function checkanswer(CurrentLevel)
{
    // console.log(CurrentLevel);
    if(gamepattern[CurrentLevel]==userClickedPattern[CurrentLevel])
    {
       if(userClickedPattern.length==gamepattern.length)
       {
        setTimeout(function(){
            nextSequence();
        },1000);
       }
        
    }
    else{
        // console.log("wrong"); 
        playsound('wrong');
        $('body').addClass('game-over');
        setTimeout(function(){
            $('body').removeClass('game-over');
        },200);
        $('#level-title').text('Game Over, Press Any Key to Restart');
        startover();
        
    }

}

function nextSequence() {
    userClickedPattern=[];
    level++;
    $('#level-title').text('Level '+level);

    var randomnum = Math.floor(Math.random() * 4);
    var randomChosenColour = btncolors[randomnum];
    gamepattern.push(randomChosenColour);
    // console.log(gamepattern);
    $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playsound(randomChosenColour);
}

function playsound(name) {
    var audio = new Audio('/sounds/' + name + '.mp3');
    audio.play();
}

function animatepress(color) {
    $('.' + color).addClass('pressed');

    setTimeout(function () {
        $('.' + color).removeClass('pressed')
    }, 100);
}

function startover()
{
level=0;
gamepattern=[];
started=false;
}




