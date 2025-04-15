'use strict';

var isRunCode = true;
var latestCode = "";
var funcCode = "";
var startCode = false;
var workspace = null;
var startXmlDom;
var startXmlText;
var xmlText;
var isLiveMode = true;
var StartBlockId = "";
var FuncBlockId = "";
var isShowDocumentsPanel = false;
var storage = window.localStorage;   
var editorType = "Python";
var block = true;

function fadeOutEffect() {
    var fadeTarget = document.querySelector('#preloader');
    var fadeEffect = setInterval(function () {
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 1;
        }
        if (fadeTarget.style.opacity > 0) {
            fadeTarget.style.opacity -= 0.1;
        } else {
            clearInterval(fadeEffect);
            document.querySelector('#preloader').style.display = "none";
        }
    }, 50);
}

function PageLoad() {
  // Initial setup
  setAppearance();
  storage.setItem('editorType', editorType);

  function positionRunButton() {
      const button = document.querySelector("#btRun");
      if (!button) return;

      // Get the actual button dimensions after it's rendered
      const buttonWidth = button.offsetWidth;
      const buttonHeight = button.offsetHeight;

      // Calculate position (90% from left, 10% from top)
      const buttonLeft = Math.max(window.innerWidth * 0.9 - buttonWidth, 0);
      const buttonTop = Math.max(window.innerHeight * 0.1, 0);

      // Apply positions
      button.style.position = 'fixed'; // Using fixed instead of absolute for better positioning
      button.style.left = `${buttonLeft}px`;
      button.style.top = `${buttonTop}px`;
  }

  // Run positioning after a small delay to ensure button is rendered
  setTimeout(positionRunButton, 0);

  // Update position on window resize
  window.addEventListener('resize', positionRunButton);
}


function setAppearance() {
    setTimeout(function() {
        fadeOutEffect();
    }, 500);

    var availWidth = window.screen.availWidth;
    var myStartScale = 0.8 + ((availWidth - 1000) / 300) * 0.2;

    var height = innerHeight * 0.95;

    $("#BlocksPannel").height(height);
    $("#blocklyDiv").height(height);

    var toolbox = document.getElementById("toolbox");

    workspace = Blockly.inject('blocklyDiv', {
      comments: false,
      disable: true,
      collapse: false,
      media: 'media/',
      readOnly: false,
      scrollbars: true,
      toolbox: false,
      trashcan: true,
      horizontalLayout: true,
      oneBasedIndex : true,  
      css : true, 
      toolboxPosition: 'end',
      toolbox: toolbox,
      toolboxOptions: {
        color: true,
        inverted: true
      },
      sounds: true,
      move: {
        scrollbars: true,
        drag: true,
        wheel: true,
      },
      zoom: {
        controls: true,
        wheel: true,
        startScale: myStartScale,
        maxScale: 4,
        minScale: 0.25,
        scaleSpeed: 1.1
      },
      colours: {
        fieldShadow: 'rgba(255, 255, 255, 0.3)',
        dragShadowOpacity: 0.6
      },
      scrollbars: {
        horizontal: true,
        vertical: false
      },

      grid:
      {
          spacing: 20,
          length: 2,
          colour: '#ccc',
          snap: true
      }
    });

    workspace.addChangeListener(change);

    generateCodeAndLoadIntoInterpreter();
}

function change(event) {
  var output = document.getElementById('importExport');
  var xmlDom = Blockly.Xml.workspaceToDom(workspace);
  xmlText = Blockly.Xml.domToText(xmlDom);
  
  if(event.type == "ui")
  {
    var id = event.blockId;

    if(id != null && workspace.getBlockById(id) != null)
    {
      var block = workspace.getBlockById(id);

      if(block.childBlocks_ != null && block.type == "event_whenplayclicked")
      {
          StartBlockId = id;
      }
      else if(block.childBlocks_ != null && block.type == "fnblock")
      {
          FuncBlockId = id;
      }
    }
  }
  else
  {
    var id = StartBlockId;
    var funcid = FuncBlockId;

    if(id == null || id == "")
    {
      id = findwhenplayclickedID(xmlText);
    }

    if(funcid == null || funcid == "")
    {
      funcid = findwhenfuncclickedID(xmlText);
    }

    if(id != null && workspace.getBlockById(id) != null)
    {
      var block = workspace.getBlockById(id);

      if(block.childBlocks_ != null && block.type == "event_whenplayclicked")
      {
          latestCode = Blockly.JavaScript.blockToCode(block.childBlocks_[0]);
      }
    }
    
    if(funcid != null && workspace.getBlockById(funcid) != null)
    {
      var block = workspace.getBlockById(funcid);

      if(block.childBlocks_ != null && block.type == "fnblock")
      {
          funcCode = "function BeeFunction() {\n" + 
                        Blockly.JavaScript.blockToCode(block.childBlocks_[0]) + 
                      "} \n";

          latestCode = latestCode + funcCode;
      }
    }
  }
}

function findwhenplayclickedID(xml) {

    var startIndex = xml.indexOf('<block type="event_whenplayclicked" id="');
    startIndex = startIndex + 40;

    var tmp = xml.substring(startIndex);

    var endIndex = tmp.indexOf('"');

    var id = tmp.substring(0, endIndex);

    return id;
}

function findwhenfuncclickedID(xml) {

    var startIndex = xml.indexOf('<block type="fnblock" id="');
    startIndex = startIndex + 26;

    var tmp = xml.substring(startIndex);

    var endIndex = tmp.indexOf('"');

    var id = tmp.substring(0, endIndex);

    return id;
}

function ConnectionBluetooth() {
    if(isBTConnected == false)
    {
        connectToBle();
    } 
    else 
    {
        swal({
              //title: "Are you sure?",
              text: CloseConnectionConfirm,
              icon: "warning",
              buttons: [Cancel, Okey],
              dangerMode: false,
        }).then((willClose) => {
            if (willClose) {
                disconnectToBle()
            }
        });
    }
}

function showModalDialog(message, image)
{
    swal({
        text: message,
        icon: image,
        button: Okey,
    });
}