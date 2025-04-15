var width = 0;
var incrament = 100 / 5;
var elem;

function StepProgresBar()
{
  width += incrament; 
  if(Math.round(width) <= 100)
  {
    elem.innerHTML = Math.round(width) * 1  + '%';
    elem.style.width = Math.round(width) + '%'; 
  }
}

async function UploadLibraries()
{
  if(isConnected)
  {
      UploadLibrariesSerial();
  }
}

async function UploadLibrariesSerial()
{
  try
    {
      showProgressPanel(true);

      elem = document.getElementById("progressBar"); 
      elem.innerHTML = '0%';
      elem.style.width = '0%'; 

      var hcsr04 = "";
      var i2c_lcd = "";
      var lcd_api = "";
      var mfrc522 = "";
      var stepper = "";
      
      $.get('python/libraries/hcsr04.txt', function(data) {
          hcsr04 = data;
      });
      
      $.get('python/libraries/i2c_lcd.txt', function(data) {
          i2c_lcd = data;
      });

      $.get('python/libraries/lcd_api.txt', function(data) {
          lcd_api = data;
      });

      $.get('python/libraries/mfrc522.txt', function(data) {
          mfrc522 = data;
      });

      $.get('python/libraries/stepper.txt', function(data) {
         stepper = data;
      });

      await wait(2000);

      await saveLibrary(hcsr04, "hcsr04.py");
      StepProgresBar();
      await saveLibrary(i2c_lcd, "i2c_lcd.py");
      StepProgresBar();
      await saveLibrary(lcd_api, "lcd_api.py");
      StepProgresBar();
      await saveLibrary(mfrc522, "mfrc522.py");
      StepProgresBar();
      await saveLibrary(stepper, "stepper.py");
      StepProgresBar();

      hideProgressPanel();
    }
    catch
    {
      hideProgressPanel();
    }
}

function dispFile(contents) {
  if(block)
  {
    workspace.clear();
    xmlText = contents;
    var dom = Blockly.Xml.textToDom(xmlText);
    Blockly.Xml.domToWorkspace(workspace, dom);
  }
  else
  {
    editorCode.setValue(contents);
  }
}

function clickElem(elem) {
  // Thx user1601638 on Stack Overflow (6/6/2018 - https://stackoverflow.com/questions/13405129/javascript-create-and-save-file )
  var eventMouse = document.createEvent("MouseEvents")
  eventMouse.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
  elem.dispatchEvent(eventMouse)
}


function NewProject()
{
  if(block)
  {
    if(xmlText != undefined)
    {
      swal({
            //title: "Are you sure?",
            text: CloseProjectConfirm,
            icon: "warning",
            buttons: [Cancel, Okey],
            dangerMode: false,
          }).then((willClose) => {
            if (willClose) {
                NewProjectConfirm()
            }
      });
    }
  }
  else
  {      
    if(editorCode.getValue() != "")
    {
      swal({
            //title: "Are you sure?",
            text: CloseProjectConfirm,
            icon: "warning",
            buttons: [Cancel, Okey],
            dangerMode: false,
          }).then((willClose) => {
            if (willClose) {
                NewProjectConfirm()
            }
      });
    }
  }

  $("#projectName").val("Pinoo Project");
}

function NewProjectConfirm()
{
  if(block)
  {
      workspace.clear();
        
      if(window.localStorage.getItem("Page") == "Vertical")
          editorBlockPython.setValue(""); 
  }
  else
  { 
      editorCode.setValue(""); 
  }
}

function OpenProject(func) {
  readFile = function(e) {
    var file = e.target.files[0];
    if (!file) {
      return;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
      var contents = e.target.result;
      fileInput.func(contents)
      document.body.removeChild(fileInput)
    }
    reader.readAsText(file)

    var fileName = file.name;
    fileName = fileName.replace(".pinoo", "");
    fileName = fileName.replace(".py", "");
    $("#projectName").val(fileName);
  }
  fileInput = document.createElement("input")
  fileInput.type = 'file'
  fileInput.style.display = 'none'
  fileInput.onchange = readFile
  fileInput.func = func
  fileInput.accept = ".pinoo";
  document.body.appendChild(fileInput)
  clickElem(fileInput);
}

async function SavePinooProject()
{
  if(block)
  {
    if(xmlText == '<xml xmlns="https://developers.google.com/blockly/xml"/>' || '')
      return;

    var projectName = $("#txtProjectName").val();

    const fileHandle = await window.self.showSaveFilePicker({
                                      suggestedName: projectName + '.pinoo',
                                      types: [{
                                        description: 'pinoo',
                                        accept: {
                                          'text/plain': ['.pinoo'],
                                        },
                                      }],
                                    })

    const fileStream = await fileHandle.createWritable();
    await fileStream.write(new Blob([xmlText], {type: "text/plain"}));
    await fileStream.close();

    var fileName = fileHandle.name;
    fileName = fileName.replace(".pinoo", "");
    $("#projectName").val(fileName);
  }
  else
  {
    if(latestCode == "")
      return;

    const fileHandle = await window.self.showSaveFilePicker({
                                    suggestedName: projectName + '.py',
                                    types: [{
                                        description: 'Python',
                                        accept: {
                                          'text/plain': ['.py'],
                                        },
                                      }],
                                    })

    const fileStream = await fileHandle.createWritable();
    await fileStream.write(new Blob([latestCode], {type: "text/plain"}));
    await fileStream.close();

    var fileName = fileHandle.name;
    fileName = fileName.replace(".py", "");
    $("#projectName").val(fileName);
  }
}

const saveFile = async (blob, suggestedName) => {
  // Feature detection. The API needs to be supported
  // and the app not run in an iframe.
  const supportsFileSystemAccess =
    'showSaveFilePicker' in window &&
    (() => {
      try {
        return window.self === window.top;
      } catch {
        return false;
      }
    })();
  // If the File System Access API is supported…
  if (supportsFileSystemAccess) {
    try {
      // Show the file save dialog.
      const handle = await showSaveFilePicker({
        suggestedName,
      });
      // Write the blob to the file.
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      return;
    } catch (err) {
      // Fail silently if the user has simply canceled the dialog.
      if (err.name !== 'AbortError') {
        console.error(err.name, err.message);
        return;
      }
    }
  }
};

async function SavePython()
{
    var editorCode = ace.edit("editorCode");
    var projectName = $("#txtProjectName").val();
    var latestCode = editorCode.getValue();

    const fileHandle = await window.self.showSaveFilePicker({
                                    suggestedName: projectName + '.ppy',
                                    types: [{
                                        description: 'Pinoo Python',
                                        accept: {
                                          'text/plain': ['.ppy'],
                                        },
                                      }],
                                    })

    const fileStream = await fileHandle.createWritable();
    await fileStream.write(new Blob([latestCode], {type: "text/plain"}));
    await fileStream.close();

    var fileName = fileHandle.name;
    fileName = fileName.replace(".ppy", "");
}

function openFile(func) {
    readFile = function(e) {
        var file = e.target.files[0];
        if (!file) {
            return;
        }
        var reader = new FileReader();
        reader.onload = function(e) {
            var contents = e.target.result;
            fileInput.func(contents)
            document.body.removeChild(fileInput)
        }
        reader.readAsText(file)
    }
    fileInput = document.createElement("input");
    fileInput.type='file';
    fileInput.style.display='none';
    fileInput.onchange=readFile;
    fileInput.func=func;;
    fileInput.accept = ".ppy";
    document.body.appendChild(fileInput)
    clickElem(fileInput)
}

function downloadFile(url, filename) {
    // Yeni bir <a> etiketi oluşturuyoruz
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;

    // Linki tıklayarak indirme işlemini başlatıyoruz
    document.body.appendChild(link);
    link.click();

    // <a> etiketini DOM'dan kaldırıyoruz
    document.body.removeChild(link);
}

function DownloadPLink() {
    // İşletim sistemini belirlemek için navigator.platform kullanıyoruz
    const platform = navigator.platform.toLowerCase();
    let url = '';
    let filename = '';

    if (platform.includes('mac')) {
        // MacOS için Plink.dmg dosyasını ayarla
        url = 'PLink/PLink.dmg';
        filename = 'PLink.dmg';
    } else if (platform.includes('win')) {
        // Windows için Plink.exe dosyasını ayarla
        url = 'PLink/PLink.exe';
        filename = 'PLink.exe';
    } else {
        alert('Bu işletim sistemi desteklenmiyor.');
        return;
    }

    // Dosyayı indirmek için <a> etiketi oluştur
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;

    // Linki tıklat ve indirme işlemini başlat
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}