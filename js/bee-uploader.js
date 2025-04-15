let port;
let writer;
let reader;
let textDecoder;
let readableStreamClosed;
let writableStreamClosed;
var readValue = "";
var files = "";
var fileInput = "";
var isFiles = false;
var isFileInput = false;
var webreplActive = true;
var isConnected = false;

var i = 0;

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

async function connectSerial() {
  
  if (navigator.serial) {
    
      try 
      {
        if(localStorage.getItem("CardType") == "PinooGo" || localStorage.getItem("CardType") == "ESP32")
        {
          port = await navigator.serial.requestPort();
          await port.open({ baudRate: 115200 });
          writer = port.writable.getWriter();

          textDecoder = new TextDecoderStream();
          readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
          reader = textDecoder.readable.getReader();
        }
        else
        {
          port = await navigator.serial.requestPort();
          await port.open({ baudRate: 9600 });
          
          let textEncoder = new TextEncoderStream();
          writableStreamClosed = textEncoder.readable.pipeTo(port.writable);
          writer = textEncoder.writable.getWriter();

          const textDecoder = new TextDecoderStream();
          readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
          reader = textDecoder.readable.getReader();
        }

        ConnectedSerialPort();

        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            // Allow the serial port to be closed later.
            reader.releaseLock();
            break;
          }
        }
        
      } catch (err) {
        showModalDialog(NotConnectedtoBoardText, "error");
        DisconnectedSerialPort();
      }

    } else {
      alert('Web Serial API not supported.');
    }
}

async function disConnectSerial() {
  try
  {
    if(localStorage.getItem("CardType") == "Pico" || localStorage.getItem("CardType") == "ESP32")
    {
        await writeSerial("04");
        
        reader.cancel();
        reader.releaseLock();
        await readableStreamClosed.catch(() => {  });

        writer.releaseLock();
        await port.close();
    }
    else
    {
        await writeSerial("04");

        reader.cancel();
        await readableStreamClosed.catch(() => { /* Ignore the error */ });

        writer.close();
        await writableStreamClosed.catch(() => { /* Ignore the error */ });;
        await port.close();
    }

    DisconnectedSerialPort();
  }
  catch(err)
  {
    alert(err);
  }
}

async function writeSerial(send) {
  let data;
  if(send == "01")
    data = new Uint8Array([0x01]);
  else if(send == "02")
    data = new Uint8Array([0x02]); 
  else if(send == "03")
    data = new Uint8Array([0x03]);
  else if(send == "04")
    data = new Uint8Array([0x04]);

  await writer.write(data);
  await wait(10);
}

async function writeCommand(send) {
  await writer.write(send);
}

async function enter_row_repl()
{
    await writeSerial("03");
    await writeSerial("03");

    for (var i = 0; i < 5; i++ ) {
      await writeSerial("01");
    }

    await writeSerial("04");
    await writeSerial("03");
    await writeSerial("03");
}

async function exit_row_repl()
{
  await writeSerial("02");
}

async function sendCommand(pythoncode)
{
  try
  {
    console.log(pythoncode);
    await enter_row_repl();
    
    await exec_raw_no_follow(pythoncode);
    
    await writeSerial("02");

    hideProgressPanel();
  }
  catch(err)
  {
    console.log("Error: " + err.message)
  }
}

async function saveCode(pythoncode, filename)
{
  await enter_row_repl();

  var command = "f = open('" + filename + "', 'wb')";
  await exec_raw_no_follow(command);

  //await writeSerial("04");
  pythoncode = pythoncode.replace(/(\r\n|\n|\r)/gm, '£');
  pythoncode = pythoncode.replace(/"/g, '\\"');
  
  var elem = document.getElementById("progressBar"); 
  elem.innerHTML = '0%';
  elem.style.width = '0%'; 
  var width = 0;
  var parts = pythoncode.length / 256;
  var incrament = 100 / parts;

  for (var i = 0, s = pythoncode.length; i < s; i += 256) {
    var subcommand = pythoncode.slice(i, Math.min(i + 256, pythoncode.length));
	  subcommand = subcommand.replace(/£/g, '\\n');
    
    await exec_raw_no_follow('f.write("' + subcommand + '")');
    await wait(50);

    width += incrament; 
      
    if(Math.round(width) <= 100)
    {
      elem.innerHTML = Math.round(width) * 1  + '%';
      elem.style.width = Math.round(width) + '%'; 
    }
  }

  await exec_raw_no_follow("f.close()");

  await exit_row_repl();

  hideProgressPanel();
  showModalDialog(`${SaveCodeMessageText}`, "success");

  setTimeout(function() {
     writeSerial("04");
  }, 100);
}

async function saveLibrary(pythoncode, filename)
{
  await enter_row_repl();

  var command = "f = open('" + filename + "', 'wb')";
  await exec_raw_no_follow(command);

  //await writeSerial("04");
  pythoncode = pythoncode.replace(/(\r\n|\n|\r)/gm, '£');
  pythoncode = pythoncode.replace(/"/g, '\\"');
  
  for (var i = 0, s = pythoncode.length; i < s; i += 256) {
    var subcommand = pythoncode.slice(i, Math.min(i + 256, pythoncode.length));
    subcommand = subcommand.replace(/£/g, '\\n');

    await exec_raw_no_follow('f.write("' + subcommand + '")');
    await wait(50);
  }

  await exec_raw_no_follow("f.close()");

  await exit_row_repl();
}

async function exec_raw_no_follow(command) {
  var enc = new TextEncoder(); // always utf-8
  let command_bytes = enc.encode(command);
  // write command
  for (var i = 0, s = command_bytes.length; i < s; i += 32) {
	 let dataToSend = command_bytes.slice(i, Math.min(i + 32, command_bytes.length))
     await writer.write(dataToSend);
     await wait(50);
  }

  await writeSerial("04");
}