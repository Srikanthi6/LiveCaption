chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('Received message:', request);
    if (request.action === "startCaptions") {
      if (request.tabId) {
        chrome.scripting.executeScript({
          target: { tabId: request.tabId },
          files: ["capture.js"]
        }, (results) => {
          if (chrome.runtime.lastError) {
            console.error("Failed to inject capture script:", chrome.runtime.lastError);
          } else {
            console.log("Capture script injected successfully");
          }
        });
      } else {
        console.error("No tab information available.");
      }
    } else if (request.action === "stopCaptions") {
      if (request.tabId) {
        chrome.scripting.executeScript({
          target: { tabId: request.tabId },
          function: () => {
            if (window.stopRecognition) {
              window.stopRecognition();
            }
          }
        });
      }
    } else if (request.action === "updateCaptions") {
      console.log('Updating captions with:', request.transcript);
      if (sender.tab && sender.tab.id) {
        chrome.scripting.executeScript({
          target: { tabId: sender.tab.id },
          function: (transcript) => {
            const captionDiv = document.getElementById('captions');
            if (captionDiv) {
              captionDiv.innerText = transcript;
              console.log('Captions updated:', transcript);
            } else {
              console.error('Captions div not found');
            }
          },
          args: [request.transcript]
        });
      } else {
        console.error('Unable to determine tab for caption update');
      }
    }
  });