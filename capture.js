if (!window.recognition) {
  window.recognition = null;

  function startRecognition() {
    console.log('Starting recognition...');
    if (!window.recognition) {
      window.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      window.recognition.interimResults = true;
      window.recognition.continuous = true; // Continuous recognition
      window.recognition.lang = 'en-US';

      window.recognition.onstart = () => {
        console.log('Recognition started successfully');
      };

      window.recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');

        console.log('Transcript:', transcript);

        // Ensure updateCaptions is accessible in the global scope
        updateCaptions(transcript); // Call the global function to update captions
      };

      window.recognition.onerror = (event) => {
        console.error("Recognition error:", event.error);
      };

      window.recognition.onend = () => {
        console.log("Recognition service ended");
        setTimeout(() => {
          console.log("Attempting to restart recognition...");
          startRecognition();
        }, 1000);
      };

      try {
        window.recognition.start();
        console.log("Recognition start command issued");
      } catch (error) {
        console.error("Error starting recognition:", error);
      }
    } else {
      console.log("Recognition is already running");
    }
  }

  function stopRecognition() {
    if (window.recognition) {
      window.recognition.stop();
      window.recognition = null;
      console.log("Recognition stopped");
    }
  }

  // Ensure the updateCaptions function is globally defined
  window.updateCaptions = function (text) {
    const captionDiv = document.getElementById('captions');
    if (captionDiv) {
      captionDiv.innerText = text; // Update the caption text
    } else {
      console.log('Captions div does not exist.'); // Log if the div doesn't exist
    }
  };

  // Call setupCaptions when the script is loaded
  setupCaptions();
  startRecognition(); // Start recognition after setting up captions
}

// Function to set up captions div
function setupCaptions() {
  // Check if the captions div already exists
  if (!document.getElementById('captions')) {
      const captionDiv = document.createElement('div');
      captionDiv.id = 'captions';
      captionDiv.style.position = 'fixed';
      captionDiv.style.bottom = '20px';
      captionDiv.style.left = '20px';
      captionDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
      captionDiv.style.color = 'white';
      captionDiv.style.padding = '10px';
      captionDiv.style.fontSize = '20px';
      captionDiv.style.zIndex = '10000';  // Increased z-index
      captionDiv.innerText = 'Captions will appear here'; // Add initial text
      document.body.appendChild(captionDiv);
      console.log('Captions div created'); // Log to console
  }
}
