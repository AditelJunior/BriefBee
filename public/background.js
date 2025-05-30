chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'file_uploaded') {
    // Store or process the file content as needed
    console.log('Background received file:', message);
    // Optionally save to chrome.storage for popup to access later
    chrome.storage.local.set({ uploadedFile: message });
  }
});