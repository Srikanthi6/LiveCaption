document.getElementById('start').addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      if (tabs.length > 0) {
        // Send message with the active tab ID
        chrome.runtime.sendMessage({ action: "startCaptions", tabId: tabs[0].id });
        console.log("Captions started");
      }
    });
  });
  
  document.getElementById('stop').addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      if (tabs.length > 0) {
        // Send message with the active tab ID
        chrome.runtime.sendMessage({ action: "stopCaptions", tabId: tabs[0].id });
      }
    });
  });
  
  // Update font size
  document.getElementById('font-size').addEventListener('input', function () {
    chrome.runtime.sendMessage({
      action: "updateFontSize",
      value: this.value
    });
  });
  
  // Update font color
  document.getElementById('color').addEventListener('input', function () {
    chrome.runtime.sendMessage({
      action: "updateFontColor",
      value: this.value
    });
  });