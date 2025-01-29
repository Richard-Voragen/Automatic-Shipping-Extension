document.addEventListener('DOMContentLoaded', () => {
    var printButton = document.getElementById('printButton');
    printButton.addEventListener('click', function() {
        // Notify background script
        chrome.runtime.sendMessage({action: "createLabel", data: "https://tms.tranzact.com/Pages/Shipments/Parcel_Add" });
    });
 
    var lookupButton = document.getElementById('lookupButton');
    lookupButton.addEventListener('click', function() {
        // Notify background script
        chrome.runtime.sendMessage({action: "createLookup", data: "https://adlookup.sutterhealth.org/?auto" });
    });
 
    var queueFormButton = document.getElementById('queueFormButton');
    queueFormButton.addEventListener('click', function() {
        // Notify background script
        chrome.runtime.sendMessage({action: "createQueueForm", data: "https://form.asana.com/?k=EEfalg4YOs24mCOhxzkk3A&d=15743239826254" });
    });
 
    var workdayFormButton = document.getElementById('workdayFormButton');
    workdayFormButton.addEventListener('click', function() {
        // Notify background script
        chrome.runtime.sendMessage({action: "createWorkdayForm", data: "https://form.asana.com/?k=EvpYzsDC7rjTQPQIJegwNw&d=15743239826254" });
    });
});