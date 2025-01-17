document.addEventListener('DOMContentLoaded', () => {
    var printButton = document.getElementById('printButton');
 
    printButton.addEventListener('click', function() {
        // Notify background script
        chrome.runtime.sendMessage({action: "createLabel"});
    });
});