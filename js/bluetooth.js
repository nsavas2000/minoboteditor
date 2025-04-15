 //globals
let blueToothCharacteristic;//this is a blu
let receivedValue = "";

let blueTooth;
let isBTConnected = false;


function connectToBle() {
  // Connect to a device by passing the service UUID
  try
  {
    blueTooth = new p5ble();
    blueTooth.connect(0xFFE0, gotCharacteristics);
  }
  catch(err)
  {
    alert(err.message);
  }
}

function disconnectToBle() {
  // Disonnect to the device
  blueTooth.disconnect();
  // Check if myBLE is connected
  isBTConnected = blueTooth.isConnected();
}

function onDisconnected() {
  console.log("Device got disconnected.");
  showModalDialog(DisconnectedText, "success");
  isBTConnected = false;
}

// A function that will be called once got characteristics
function gotCharacteristics(error, characteristics) {
  if (error) { 
    console.log('error: ', error);
  }
  console.log('characteristics: ', characteristics);
  blueToothCharacteristic = characteristics[0];

  blueTooth.startNotifications(blueToothCharacteristic, gotValue, 'string');
  
  isBTConnected = blueTooth.isConnected();
  isConnected = false;
  if(isBTConnected) {
    showModalDialog(ConnectedText, "success");
  }
  // Add a event handler when the device is disconnected
  blueTooth.onDisconnected(onDisconnected);
}


// A function that will be called once got values
function gotValue(value) {
  //SerialData(value);
}

function sendData(command) {
  console.log(command);
  const inputValue = command;
  var enc = new TextEncoder(); // always utf-8
  blueToothCharacteristic.writeValue(enc.encode(inputValue));
}
