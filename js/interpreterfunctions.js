let CodeSeperator = "#"; 
var isRunCode = false;
var myInterpreter = null;
var highlightPause = false;
var hasMoreCode = false;
var highlightblockid = "";
var exhighlightblockid = "";

const BlockTypes = Object.freeze({  
                                    BeeBlockType:"A"
                                  });

const DirectionTypes = Object.freeze({  
                                        Forward:"0", 
                                        Backward:"1", 
                                        Left:"2",
                                        Right:"3",
                                        Stop:"4"
                                    });

function RunBee()
{   
    if(isRunCode == false)
    {
        isRunCode = true;
        document.querySelector("#btRun").classList.add("repeatButton");
        document.querySelector("#btRun").classList.remove("runButton");
        runCode();
    }
    else
    {
        isRunCode = false;
        document.querySelector("#btRun").classList.add("runButton");
        document.querySelector("#btRun").classList.remove("repeatButton");
    }
}

function runCode(){  
  if(latestCode.length > 0)
  { 
    latestCode = RemoveHighLight(latestCode);

    CreateInterpreter();
    StepCode();
           
    setTimeout(function() {
      StepCode();
    }, 50);     
  }
}

function restart()
{
    isRunCode = false;
    document.querySelector("#btRun").classList.add("runButton");
    document.querySelector("#btRun").classList.remove("repeatButton");
    generateCodeAndLoadIntoInterpreter();
}

function RemoveHighLight(code)
{
    var result = code;
    
    result = replaceAll(result,"\n", "");
    var tmp = result;
    var lastIndex = 0;
    var arrayIndex = [];

    var count = (result.match(new RegExp("highlightBlock", "g")) || []).length;
    
    for(i = 0; i < count; i++)
    {
        var index = tmp.indexOf("highlightBlock");
        //benimFonksiyonum1

        if((
            tmp.substring(index + 39, index + 60).indexOf("BeeFunction") >= 0)
            || (tmp.substring(index + 39, index + 70).indexOf("function BeeFunction") >= 0)
            || (tmp.substring(index + 39, index + 55).indexOf("if") >= 0)
            )
        {
            arrayIndex.push(lastIndex + index);
        }

        tmp = tmp.substring(index + 39, tmp.length);

        lastIndex += index + 39;
    }

    for(i = 0; i < arrayIndex.length; i++)
    {
        var removeIndex = arrayIndex[i];

        result = result.substring(0, removeIndex) + result.substring(removeIndex + 39, result.length);

        for (var j = 0; j < arrayIndex.length; j++) {
            arrayIndex[j] = arrayIndex[j] - 39;
        }
    }

    return result;
}

function highlightBlock(id) {
   exhighlightblockid = highlightblockid;
   highlightblockid = id;

   highlightPause = true;
}

function generateCodeAndLoadIntoInterpreter() {
  // Generate JavaScript code and parse it.
  Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
  Blockly.JavaScript.addReservedWords('highlightBlock');
  //latestCode = Blockly.JavaScript.workspaceToCode(workspace);
  resetStepUi();
}

function resetStepUi() {
  workspace.highlightBlock(null);

  unglowStack(highlightblockid);
  unglowStack(exhighlightblockid);
  
  highlightblockid = "";
  exhighlightblockid = "";
  highlightPause = false;
}

function CreateInterpreter()
{
    myInterpreter = null;
    resetStepUi();
    myInterpreter = new Interpreter(latestCode, initApi);
}

function glowStack(id) {
  try
  {
    workspace.glowBlock(id, true);
  }
  catch
  {

  }
}

function unglowStack(id) {
  try
  {
    workspace.glowBlock(id, false);
  }
  catch
  {
    
  }
}

function loopstep() {
    setTimeout(function() {
        StepCode();
    }, 50);
}

function loopend() 
{
    if(hasMoreCode == true && isRunCode == true)
    {
        setTimeout(function() {  
            StateControl();
            StepCode();  
        }, 50);
    }
}

function StateControl()
{   
    if(hasMoreCode == false && isRunCode == true){
        restart();      
    }
}

function isProgramRunning()
{
    return isRunCode;
}

function DelaySecond(seconds)
{
    if(hasMoreCode == true && isRunCode == true)
    {
        setTimeout(function() {  
            StateControl();
            StepCode();  
        }, seconds * 1000);
    }
}

function BeeStart()
{
    if(hasMoreCode == true && isRunCode == true)
    {
        setTimeout(function() {  
            StateControl();
            StepCode();  
        }, 50);
    }
}

function GoForward(value)
{
    value += 1;
    let sendValue = BlockTypes.BeeBlockType + DirectionTypes.Forward + value + CodeSeperator;

    SendCommandToCard(sendValue);

    if(hasMoreCode == true && isRunCode == true)
    {
        setTimeout(function() {  
            StateControl();
            StepCode();  
        }, (value * 5000 + 500));
    }
}

function GoBackward(value)
{
    value += 1;
    let sendValue = BlockTypes.BeeBlockType + DirectionTypes.Backward + value + CodeSeperator;

    SendCommandToCard(sendValue);

    if(hasMoreCode == true && isRunCode == true)
    {
        setTimeout(function() {  
            StateControl();
            StepCode();  
        }, (value * 5000 + 500));
    }
}

function GoTurnRight(value)
{
    value += 1;
    let sendValue = BlockTypes.BeeBlockType + DirectionTypes.Right + value + CodeSeperator;

    SendCommandToCard(sendValue);

    if(hasMoreCode == true && isRunCode == true)
    {
        setTimeout(function() {  
            StateControl();
            StepCode();  
        }, (value * 5000 + 500));
    }
}

function GoTurnLeft(value)
{
    value += 1;
    let sendValue = BlockTypes.BeeBlockType + DirectionTypes.Left + value + CodeSeperator;

    SendCommandToCard(sendValue);

    if(hasMoreCode == true && isRunCode == true)
    {
        setTimeout(function() {  
            StateControl();
            StepCode();  
        }, (value * 5000 + 500));
    }
}

function SendCommandToCard(sendValue)
{
    try
    {
        if(isBTConnected)
        {
            sendData(sendValue);
        }
    }
    catch(err)
    {
        alert("SendCommandToCard:" + err.message);
    }
}

function StepCode() { 
    try
    {      
       if(myInterpreter)
       {
            glowStack(highlightblockid);
            unglowStack(exhighlightblockid);

            highlightPause = false;
             do {
               try {
                 hasMoreCode = myInterpreter.step();
               } finally {
                 if (!hasMoreCode) {
                   return;
                 }
               }
               // Keep executing until a highlight statement is reached,
               // or the code completes or errors.
             } while (hasMoreCode && !highlightPause);
          }
    }
    catch(err)
    {
      
    }
}

function initApi(interpreter, scope) {
    var wrapper = function(id) {
      return highlightBlock(id);
    };
    interpreter.setProperty(scope, 'highlightBlock',
      interpreter.createNativeFunction(wrapper));

    var wrapper = function() {
      return loopstep();
    };
    interpreter.setProperty(scope, 'loopstep',
      interpreter.createNativeFunction(wrapper));

    var wrapper = function() {
      return loopend();
    };
    interpreter.setProperty(scope, 'loopend',
      interpreter.createNativeFunction(wrapper));

    var wrapper = function() {
        return BeeStart();
    };
    interpreter.setProperty(scope, 'BeeStart',
        interpreter.createNativeFunction(wrapper));

    // Add an API function for DelaySecond blocks.
    var wrapper = function(seconds) {
        return DelaySecond(seconds);
    };
    interpreter.setProperty(scope, 'DelaySecond',
        interpreter.createNativeFunction(wrapper));

    // Add an API function for isProgramRunning blocks.
    var wrapper = function() {
        return isProgramRunning();
    };
    interpreter.setProperty(scope, 'isProgramRunning',
        interpreter.createNativeFunction(wrapper));

    // Add an API function for GoForward blocks.
    var wrapper = function(step) {
        return GoForward(step);
    };
    interpreter.setProperty(scope, 'GoForward',
        interpreter.createNativeFunction(wrapper));

    // Add an API function for GoBackward blocks.
    var wrapper = function(step) {
        return GoBackward(step);
    };
    interpreter.setProperty(scope, 'GoBackward',
        interpreter.createNativeFunction(wrapper));

    // Add an API function for GoTurnRight blocks.
    var wrapper = function(step) {
        return GoTurnRight(step);
    };
    interpreter.setProperty(scope, 'GoTurnRight',
        interpreter.createNativeFunction(wrapper));

     // Add an API function for GoTurnLeft blocks.
    var wrapper = function(step) {
        return GoTurnLeft(step);
    };
    interpreter.setProperty(scope, 'GoTurnLeft',
        interpreter.createNativeFunction(wrapper));
}