
$(document).ready(function(){
  
  var loopRef;
  var activeButtonClass = "controller__button--pressed";

  var buttonMappings = {
    0: 'a',
    1: 'b',
    2: null,
    3: 'x',
    4: 'y',
    5: null,
    6: 'l1',
    7: 'r1',
    8: 'l2',
    9: 'r2',
    10: 'select',
    11: 'start',
    12: null,
    13: 'lstick',
    14: 'rstick',
  }

  var axisMappings = {
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: {
      1: "dright",
      "-1": "dleft"
    },
    7: {
      1: "ddown",
      "-1": "dup"
    }
  }

  var buttonPressed = function (b) {
    if (typeof(b) == "object") {
      return b.pressed;
    }
    return b == 1.0;
  }

  var drawButtonStates = function(gp){
    for(i=0; i<gp.buttons.length; i++){
      if(buttonMappings[i]){
        if(buttonPressed(gp.buttons[i]))
          $('#btn-'+buttonMappings[i]).addClass(activeButtonClass);
      }
    }
  }

  var drawAxisStates = function(gp){
    for(i=0; i<gp.axes.length; i++){
      var axisValue = Math.ceil(gp.axes[i]);
      if(axisMappings[i] && axisMappings[i][axisValue]){
        $('#btn-'+axisMappings[i][axisValue]).addClass(activeButtonClass);
      }
    }
  }
  
  var resetButtonStates = function(gp){
    $('.controller__button').removeClass(activeButtonClass);
  }

  var gameLoop = function(){

    gp = navigator.getGamepads()[0]
    if(!gp) return;

    resetButtonStates(gp);
    drawButtonStates(gp);
    drawAxisStates(gp);
  }

  setInterval(gameLoop, 10);


});
