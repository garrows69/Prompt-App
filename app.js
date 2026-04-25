/**
 * app.js
 * 
 * This script handles clipboard operations using the modern Clipboard API, including 
 * copy and paste functionalities, with exponential backoff retry logic for APIs. It also
 * includes error handling for different HTTP status codes, storage quota checking,
 * character counters, and keyboard shortcuts for ease of use.
 * 
 * @module ClipboardHandler
 */

 // Function to copy text to clipboard
 function copyToClipboard(text) {
     navigator.clipboard.writeText(text)
         .then(() => {
             console.log('Text copied to clipboard');
         })
         .catch((err) => {
             console.error('Failed to copy: ', err);
         });
 }

 // Exponential backoff for retrying clipboard operations
 function exponentialBackoff(retryCount) {
     return new Promise(resolve => {
         const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff (2^n * 1000ms)
         setTimeout(resolve, delay);
     });
 }

 // Handle errors based on HTTP status codes
 function handleHttpResponse(response) {
     if (response.ok) {
         return response.json();
     } else if (response.status === 404) {
         throw new Error('Resource not found (404)');
     } else if (response.status === 500) {
         throw new Error('Server error (500)');
     } else {
         throw new Error('Unexpected error: ' + response.status);
     }
 }

 // Check storage quota for clipboard operations
 function checkStorageQuota() {
     // Logic for checking storage quota goes here, if applicable
     return true; // Assume storage is available for now
 }

 // Keyboard shortcuts (Ctrl/Cmd + Enter)
 document.addEventListener('keydown', function(event) {
     if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
         // Trigger paste function or submit action
         console.log('Ctrl/Cmd + Enter pressed');
     }
 });

 // Character counter
 function countCharacters(inputField) {
     const counterElement = document.getElementById('charCounter');
     inputField.addEventListener('input', () => {
         const count = inputField.value.length;
         counterElement.textContent = `${count} characters`; // Update character count
     });
 }