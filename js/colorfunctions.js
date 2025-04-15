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

        const video = document.getElementById("video");
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
        const captureButton = document.getElementById("capture");
        const connectButton = document.getElementById("connect");
        const resultText = document.getElementById("result");
        const colorBoxes = document.querySelectorAll(".colorBox");

        let colorIndex = 0;
        let commands = new Array(10).fill("");
        let latestCode = "";

        // Set canvas dimensions to match video but maintain a smaller ratio
        function setupCanvas() {
            const videoWidth = video.videoWidth;
            const videoHeight = video.videoHeight;
            
            // Make canvas 30% of the video size
            canvas.width = videoWidth;
            canvas.height = videoHeight;
        }

        // Capture button event
        captureButton.addEventListener("click", () => {
            if (!video.srcObject) {
                resultText.innerText = "Önce kamerayı açmalısın! 📸";
                return;
            }
            
            // Add animation effect
            captureButton.classList.add('animate__animated', 'animate__pulse');
            setTimeout(() => {
                captureButton.classList.remove('animate__animated', 'animate__pulse');
            }, 500);
            
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            detectColor();
        });

        // Connect button event
        connectButton.addEventListener("click", () => {
            // Toggle camera
            if (video.srcObject) {
                // Stop camera
                video.srcObject.getTracks().forEach(track => track.stop());
                video.srcObject = null;
                connectButton.innerHTML = '<i class="fas fa-video"></i>';
                resultText.innerText = "Kamera kapatıldı! 🎮";
            } else {
                // Start camera
                navigator.mediaDevices.getUserMedia({ 
                    video: { 
                        facingMode: 'environment',
                        width: { ideal: 640 },
                        height: { ideal: 480 }
                    } 
                })
                .then(stream => {
                    video.srcObject = stream;
                    video.onloadedmetadata = setupCanvas;
                    connectButton.innerHTML = '<i class="fas fa-video-slash"></i>';
                    resultText.innerText = "Kamera açık! Renk yakala! 🎨";
                })
                .catch(error => {
                    console.error("Kamera erişim hatası:", error);
                    resultText.innerText = "Kamera açılamadı! 😢";
                });
            }
        });

        // Detect color function with fun animations
        function detectColor() {
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const pixels = imageData.data;
            const width = canvas.width;
            const height = canvas.height;

            const boxSize = 50;
            const startX = Math.floor(width / 2 - boxSize / 2);
            const startY = Math.floor(height / 2 - boxSize / 2);

            let totalR = 0, totalG = 0, totalB = 0, count = 0;

            for (let y = startY; y < startY + boxSize; y++) {
                for (let x = startX; x < startX + boxSize; x++) {
                    const index = (y * width + x) * 4;

                    totalR += pixels[index];    
                    totalG += pixels[index + 1];
                    totalB += pixels[index + 2];
                    count++;
                }
            }

            const avgR = Math.floor(totalR / count);
            const avgG = Math.floor(totalG / count);
            const avgB = Math.floor(totalB / count);

            const colorBox = colorBoxes[colorIndex];
            
            let dominantColor = "";
            let label = "";
            let emoji = "";

            colorIndex = (colorIndex + 1) % colorBoxes.length;

            if (avgR > (avgB + 25) && avgG > (avgB + 25)) { 
                dominantColor = "green";
                label = "Forward";
                emoji = "⬆️";
                latestCode += "highlightBlock('U9M{=Z=7d}^CN{#I+o3|'); GoForward(1); \n";
            } else if (avgG > (avgR + 25) && avgG > (avgB + 25)) { 
                dominantColor = "yellow";
                label = "TurnRight";
                emoji = "➡️";
                latestCode += "highlightBlock('U9M{=Z=7d}^CN{#I+o3|'); GoTurnRight(1); \n";
            } else if (avgB > (avgR + 25) && avgB > (avgG + 25)) { 
                dominantColor = "blue";
                label = "TurnLeft";
                emoji = "⬅️";
                latestCode += "highlightBlock('U9M{=Z=7d}^CN{#I+o3|'); GoTurnLeft(1); \n";
            } else if (avgR > (avgG + 25) && avgR > (avgB + 25)) { 
                dominantColor = "red";
                label = "GoBack";
                emoji = "⬇️";
                latestCode += "highlightBlock('U9M{=Z=7d}^CN{#I+o3|'); GoBackward(1); \n";
            } else {
                colorIndex = (colorIndex - 1) % colorBoxes.length;
                resultText.innerText = `Belirgin bir renk bulunamadı! Tekrar dene! 🔄`;
                return;
            }

            resultText.innerText = `Yakalandı: ${label} ${emoji}`;

            commands[colorIndex - 1] = label;
            console.log(commands);

            colorBox.style.backgroundColor = dominantColor;
            colorBox.innerHTML = `<div class="emoji">${emoji}</div>${label}`;
            
            // Add animation to the color box
            colorBox.style.transform = "scale(1.2)";
            setTimeout(() => {
                colorBox.style.transform = "scale(1)";
            }, 300);
        }

        // Make sure canvas is properly sized when video dimensions change
        video.addEventListener('play', () => {
            function checkSize() {
                if (video.videoWidth !== canvas.width || video.videoHeight !== canvas.height) {
                    setupCanvas();
                }
                requestAnimationFrame(checkSize);
            }
            checkSize();
        });

        // Initial setup
        window.addEventListener('DOMContentLoaded', () => {
            // Set initial message
            resultText.innerText = "Renk yakalamak için kamerayı aç! 📸";
            
            // Make colorboxes initially transparent with dotted borders
            colorBoxes.forEach(box => {
                box.style.border = "2px dashed #ccc";
                box.style.backgroundColor = "transparent";
            });
        });