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

// Function to update the captions text
function updateCaptions(text) {
  const captionDiv = document.getElementById('captions');
  if (captionDiv) {
      captionDiv.innerText = text; // Update the caption text
  } else {
      console.log('Captions div does not exist.'); // Log if the div doesn't exist
  }
}

// Call setupCaptions when the script is loaded
setupCaptions();

// Example usage: updating the captions
updateCaptions('This is an example of caption text.'); // Replace with your dynamic text
