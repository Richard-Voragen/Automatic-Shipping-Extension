document.addEventListener('DOMContentLoaded', () => {
    var printButton = document.getElementById('printButton');
    printButton.addEventListener('click', function() {
        // Notify background script
        chrome.runtime.sendMessage({action: "createLabel"});
    });
 
    var lookupButton = document.getElementById('lookupButton');
    lookupButton.addEventListener('click', function() {
        // Notify background script
        chrome.runtime.sendMessage({action: "lookupPerson"});
    });
 
    var formButton = document.getElementById('formButton');
    formButton.addEventListener('click', function() {
        // Notify background script
        chrome.runtime.sendMessage({action: "createForm"});
    });
});