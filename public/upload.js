document.getElementById('fileInput').addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (event) {
    const base64 = event.target.result.split(',')[1];
    const fileUri = URL.createObjectURL(file);
    chrome.runtime.sendMessage({
      action: 'file_uploaded',
      fileName: file.name,
      fileType: file.type,
      file: file,
      fileUri: fileUri, // send the URI if needed
      // base64: base64,
    });
  };
  reader.readAsDataURL(file);
});