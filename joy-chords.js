
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

  var buttonEnum = {
    'x':        1 << 0, 
    'a':        1 << 1, 
    'b':        1 << 2, 
    'y':        1 << 3, 
    'dup':      1 << 4, 
    'dright':   1 << 5, 
    'ddown':    1 << 6, 
    'dleft':    1 << 7, 
    'l1':       1 << 8, 
    'l2':       1 << 9, 
    'r1':       1 << 10, 
    'r2':       1 << 11, 
    'select':   1 << 12, 
    'start':    1 << 13
  }

  var isArray = function(object){
    return typeof(object) === "object" 
      && Object.prototype.toString.call(object) == "[object Array]";
  }

  var btnCombo = function(){
    var buttons = arguments;
    if(arguments.length == 1 && isArray(arguments[0]))
      buttons = arguments[0];

    var result = 0;
    for(i=0; i<buttons.length; i++)
      result = result | buttonEnum[buttons[i]];

    return result;
  }

  var chordMap = {};
  //Minor Alpha
  chordMap[btnCombo('x')] =           'n';
  chordMap[btnCombo('a')] =           's';
  chordMap[btnCombo('b')] =           'h';
  chordMap[btnCombo('y')] =           't';
  chordMap[btnCombo('dup')] =         'u';
  chordMap[btnCombo('dright')] =      'e';
  chordMap[btnCombo('ddown')] =       'a';
  chordMap[btnCombo('dleft')] =       'o';
  chordMap[btnCombo('dleft', 'x')] =  'i';
  chordMap[btnCombo('dleft', 'a')] =  'd';
  chordMap[btnCombo('dleft', 'b')] =  'y';
  chordMap[btnCombo('dleft', 'y')] =  'f';
  chordMap[btnCombo('dup', 'x')] =    'p';
  chordMap[btnCombo('dup', 'a')] =    'g';
  chordMap[btnCombo('dup', 'b')] =    'c';
  chordMap[btnCombo('dup', 'y')] =    'r';
  chordMap[btnCombo('ddown', 'x')] =  'l';
  chordMap[btnCombo('ddown', 'a')] =  'b';
  chordMap[btnCombo('ddown', 'b')] =  'k';
  chordMap[btnCombo('ddown', 'y')] =  'm';
  chordMap[btnCombo('dright', 'x')] = 'q';
  chordMap[btnCombo('dright', 'a')] = 'j';
  chordMap[btnCombo('dright', 'b')] = 'x';
  chordMap[btnCombo('dright', 'y')] = 'w';
  chordMap[btnCombo('x', 'a')] =      'v';
  chordMap[btnCombo('y', 'b')] =      'z';
  //Major Alpha
  chordMap[btnCombo('r1', 'x')] =           'N';
  chordMap[btnCombo('r1', 'a')] =           'S';
  chordMap[btnCombo('r1', 'b')] =           'H';
  chordMap[btnCombo('r1', 'y')] =           'T';
  chordMap[btnCombo('r1', 'dup')] =         'U';
  chordMap[btnCombo('r1', 'dright')] =      'E';
  chordMap[btnCombo('r1', 'ddown')] =       'A';
  chordMap[btnCombo('r1', 'dleft')] =       'O';
  chordMap[btnCombo('r1', 'dleft', 'x')] =  'I';
  chordMap[btnCombo('r1', 'dleft', 'a')] =  'D';
  chordMap[btnCombo('r1', 'dleft', 'b')] =  'Y';
  chordMap[btnCombo('r1', 'dleft', 'y')] =  'F';
  chordMap[btnCombo('r1', 'dup', 'x')] =    'P';
  chordMap[btnCombo('r1', 'dup', 'a')] =    'G';
  chordMap[btnCombo('r1', 'dup', 'b')] =    'C';
  chordMap[btnCombo('r1', 'dup', 'y')] =    'R';
  chordMap[btnCombo('r1', 'ddown', 'x')] =  'L';
  chordMap[btnCombo('r1', 'ddown', 'a')] =  'B';
  chordMap[btnCombo('r1', 'ddown', 'b')] =  'K';
  chordMap[btnCombo('r1', 'ddown', 'y')] =  'M';
  chordMap[btnCombo('r1', 'dright', 'x')] = 'Q';
  chordMap[btnCombo('r1', 'dright', 'a')] = 'J';
  chordMap[btnCombo('r1', 'dright', 'b')] = 'X';
  chordMap[btnCombo('r1', 'dright', 'y')] = 'W';
  chordMap[btnCombo('r1', 'x', 'a')] =      'V';
  chordMap[btnCombo('r1', 'y', 'b')] =      'Z';
  //Numeric
  chordMap[btnCombo('r2', 'x')] =           '0';
  chordMap[btnCombo('r2', 'a')] =           '1';
  chordMap[btnCombo('r2', 'b')] =           '2';
  chordMap[btnCombo('r2', 'y')] =           '3';
  chordMap[btnCombo('r2', 'dup')] =         '4';
  chordMap[btnCombo('r2', 'dright')] =      '5';
  chordMap[btnCombo('r2', 'ddown')] =       '6';
  chordMap[btnCombo('r2', 'dleft')] =       '7';
  chordMap[btnCombo('r2', 'x', 'a')] =      '8';
  chordMap[btnCombo('r2', 'y', 'b')] =      '9';
  //Symbols
  chordMap[btnCombo('r2', 'dleft', 'x')] =  '!';
  chordMap[btnCombo('r2', 'dleft', 'a')] =  '@';
  chordMap[btnCombo('r2', 'dleft', 'b')] =  '#';
  chordMap[btnCombo('r2', 'dleft', 'y')] =  '$';
  chordMap[btnCombo('r2', 'dup', 'x')] =    '%';
  chordMap[btnCombo('r2', 'dup', 'a')] =    '^';
  chordMap[btnCombo('r2', 'dup', 'b')] =    '&';
  chordMap[btnCombo('r2', 'dup', 'y')] =    '*';
  chordMap[btnCombo('r2', 'x', 'a')] =      '(';
  chordMap[btnCombo('r2', 'y', 'b')] =      ')';
  chordMap[btnCombo('r2', 'ddown', 'x')] =  '-';
  chordMap[btnCombo('r2', 'ddown', 'a')] =  '_';
  chordMap[btnCombo('r2', 'ddown', 'b')] =  '=';
  chordMap[btnCombo('r2', 'ddown', 'y')] =  '+';
  chordMap[btnCombo('r2', 'dright', 'x')] = '[';
  chordMap[btnCombo('r2', 'dright', 'a')] = ']';
  chordMap[btnCombo('r2', 'dright', 'b')] = '{';
  chordMap[btnCombo('r2', 'dright', 'y')] = '}';
  //More Symbols
  chordMap[btnCombo('l1', 'x')] =           '\\';
  chordMap[btnCombo('l1', 'a')] =           '|';
  chordMap[btnCombo('l1', 'b')] =           ';';
  chordMap[btnCombo('l1', 'y')] =           ':';
  chordMap[btnCombo('l1', 'dup')] =         "'";
  chordMap[btnCombo('l1', 'dright')] =      '"';
  chordMap[btnCombo('l1', 'ddown')] =       ',';
  chordMap[btnCombo('l1', 'dleft')] =       '.';
  chordMap[btnCombo('l1', 'x', 'a')] =      '<';
  chordMap[btnCombo('l1', 'y', 'b')] =      '>';
  chordMap[btnCombo('l1', 'dleft', 'x')] =  '/';
  chordMap[btnCombo('l1', 'dleft', 'a')] =  '?';
  chordMap[btnCombo('l1', 'dleft', 'b')] =  '`';
  chordMap[btnCombo('l1', 'dleft', 'y')] =  '~';
  //unmapped
  chordMap[btnCombo('l1', 'dup', 'x')] =    '';
  chordMap[btnCombo('l1', 'dup', 'a')] =    '';
  chordMap[btnCombo('l1', 'dup', 'b')] =    '';
  chordMap[btnCombo('l1', 'dup', 'y')] =    '';
  chordMap[btnCombo('l1', 'ddown', 'x')] =  '';
  chordMap[btnCombo('l1', 'ddown', 'a')] =  '';
  chordMap[btnCombo('l1', 'ddown', 'b')] =  '';
  chordMap[btnCombo('l1', 'ddown', 'y')] =  '';
  chordMap[btnCombo('l1', 'dright', 'x')] = '';
  chordMap[btnCombo('l1', 'dright', 'a')] = '';
  chordMap[btnCombo('l1', 'dright', 'b')] = '';
  chordMap[btnCombo('l1', 'dright', 'y')] = '';
  //other?
  chordMap[btnCombo('l2', 'x')] =           '\n';
  chordMap[btnCombo('l2', 'a')] =           ' ';
  chordMap[btnCombo('l2', 'b')] =           '\b';
  chordMap[btnCombo('l2', 'y')] =           'del'; //delete, but implement later
  chordMap[btnCombo('l2', 'dup')] =         'pageup';
  chordMap[btnCombo('l2', 'dright')] =      'pagedown';
  chordMap[btnCombo('l2', 'ddown')] =       'home';
  chordMap[btnCombo('l2', 'dleft')] =       'end';
  chordMap[btnCombo('l2', 'x', 'a')] =      '';
  chordMap[btnCombo('l2', 'y', 'b')] =      '';
  chordMap[btnCombo('l2', 'dleft', 'x')] =  '';
  chordMap[btnCombo('l2', 'dleft', 'a')] =  '';
  chordMap[btnCombo('l2', 'dleft', 'b')] =  '';
  chordMap[btnCombo('l2', 'dleft', 'y')] =  '';
  chordMap[btnCombo('l2', 'dup', 'x')] =    '';
  chordMap[btnCombo('l2', 'dup', 'a')] =    '';
  chordMap[btnCombo('l2', 'dup', 'b')] =    '';
  chordMap[btnCombo('l2', 'dup', 'y')] =    '';
  chordMap[btnCombo('l2', 'ddown', 'x')] =  '';
  chordMap[btnCombo('l2', 'ddown', 'a')] =  '';
  chordMap[btnCombo('l2', 'ddown', 'b')] =  '';
  chordMap[btnCombo('l2', 'ddown', 'y')] =  '';
  chordMap[btnCombo('l2', 'dright', 'x')] = '';
  chordMap[btnCombo('l2', 'dright', 'a')] = '';
  chordMap[btnCombo('l2', 'dright', 'b')] = '';
  chordMap[btnCombo('l2', 'dright', 'y')] = '';

  var activeButtons = {
    'x':        false, 
    'a':        false, 
    'b':        false, 
    'y':        false, 
    'dup':      false, 
    'dright':   false, 
    'ddown':    false, 
    'dleft':    false, 
    'l1':       false, 
    'l2':       false, 
    'r1':       false, 
    'r2':       false, 
    'select':   false, 
    'start':    false
  }

  var prevActiveButtons = {}


  var buttonPressed = function (b) {
    if (typeof(b) == "object") {
      return b.pressed;
    }
    return b == 1.0;
  }

  var setActiveButtons = function(gp){
    //reset
    for(name in activeButtons){
      activeButtons[name] = false;
    }

    //buttons
    for(i=0; i<gp.buttons.length; i++){
      if(buttonMappings[i])
        activeButtons[buttonMappings[i]] = buttonPressed(gp.buttons[i]);
    }

    //axes
    for(i=0; i<gp.axes.length; i++){
      var axisValue = Math.ceil(gp.axes[i]);
      if(axisMappings[i] && axisMappings[i][axisValue]){
        activeButtons[axisMappings[i][axisValue]] = true;
      }
    }
  }

  var drawButtonStates = function(){
    for(name in activeButtons){
      if(activeButtons[name])
        $('#btn-'+name).addClass(activeButtonClass);
      else
        $('#btn-'+name).removeClass(activeButtonClass);
    }
  }

  var writeCharacter = function(activeButtons){
    var buttons = [];
    for(button in activeButtons){
      if(activeButtons[button])
        buttons.push(button);
    }

    writeText(chordMap[btnCombo(buttons)]);
  }

  var text = "";
  var writeText = function(newText){
    text += newText;
    convertedText = text.replace(/\n/g, "<br/>");
    convertedText = convertedText.replace(/ /g, "&nbsp;");
    $('.output').html(convertedText);
  }

  var newChord = true;
  var gameLoop = function(){

    gp = navigator.getGamepads()[0]
    if(!gp) return;

    //save current button state
    for(name in activeButtons)
      prevActiveButtons[name] = activeButtons[name];

    setActiveButtons(gp);
    
    
    for(name in activeButtons){
      //a new button has been pressed
      if(activeButtons[name] && !prevActiveButtons[name])
        newChord = true;

      //write character if a button has been un-pressed
      if(!activeButtons[name] && prevActiveButtons[name] && newChord){
        newChord = false;
        writeCharacter(prevActiveButtons);
      }
    }

    drawButtonStates(gp);
    
  }

  setInterval(gameLoop, 10);


});
