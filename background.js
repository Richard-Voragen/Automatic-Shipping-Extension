chrome.runtime.onInstalled.addListener(() => {
    console.log('Autofiller Extension Installed');
  });
 
let responseData = null;
 
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.action === "scrapeData") {
        // Send a call to the active tab to find data
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'scrapeData' }, (response) => {
            if (response) {
              responseData = response;
              console.log(responseData);
            }
            });
        });
      }
 
      if (request.action === "createLabel") {
        chrome.tabs.create({ url: "https://tms.tranzact.com/Pages/Shipments/Parcel_Add" });
      }
 
      if (request.action === "printData") {
        // Send a call to the active tab to print data
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          let data = {
            worker_name: "",
            request_location: ""
          };
 
          if (responseData) {
            data.worker_name = responseData.worker.worker_first_name + " " + responseData.worker.worker_last_name;
            data.request_location = getRequestLocation(responseData).addressL1;
          }
 
          chrome.tabs.sendMessage(tabs[0].id, { action: 'printData', data: data });
        });
 
        console.log("Printed Shipping Data");
      }
 
      // Runs if we need location data page
      if (request.action === "printLocationData") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          let data = {
            location_name: "",
            location: {
              addressL1: "",
              addressL2: "",
              zip: "",
              city: ""
            }
          }
 
          if (responseData) {
            data.location_name = responseData.requester.requester_first_name + " " + responseData.requester.requester_last_name;
            data.location = getRequestLocation(responseData);
          }
          chrome.tabs.sendMessage(tabs[0].id, { action: 'printLocationData', data: data });
        });
 
        console.log("Printed Location Data");
      }
    }
  );
 
function getRequestLocation(responseData) {
  let request_location = responseData.worker.worker_location;
 
  if (request_location.addressL1 === "" || /\d{3,5}/.test(request_location.addressL1) == false)
    request_location = responseData.requester.requester_location;
 
  if (request_location.addressL1 === "" || /\d{3,5}/.test(request_location.addressL1) == false)
    request_location.addressL1 = responseData.requester.requester_first_name + " " + responseData.requester.requester_last_name;
 
  return request_location;
}