let cities = [];
 
chrome.runtime.onInstalled.addListener(async () => {
    console.log('Autofiller Extension Installed');
    await fetch('./assets/cities.csv')
      .then(response => {
        return response.text();
      })
      .then(text => {
        cities = text.split('\r\n');
      })
  });
 
let responseData = null;
 
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.action === "getCityList") {
        sendResponse(cities);
      }
 
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
 
      // Calls content to print the shipping data
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
 
      if (request.action === "lookupPerson") {
        chrome.tabs.create({ url: "https://adlookup.sutterhealth.org/?auto" });
      }
 
      if (request.action === "printLookupData") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          let data = {
            email: "",
            first_name: "",
            last_name: ""
          };
 
          if (responseData) {
            data.email = responseData.worker.worker_email;
            data.first_name = responseData.worker.worker_first_name;
            data.last_name = responseData.worker.worker_last_name;
          }
 
          chrome.tabs.sendMessage(tabs[0].id, { action: 'printLookupData', data: data });
        });
      }
 
      if (request.action === "createForm") {
        chrome.tabs.create({ url: "https://form.asana.com/?k=EEfalg4YOs24mCOhxzkk3A&d=15743239826254" });
      }
 
      if (request.action === "printFormData") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          let data = {
            ticket_number: "",
            ticket_url: "",
            ticket_assignment: "",
            ticket_comment: "",
          };
 
          if (responseData) {
            data.ticket_number = responseData.ticket.ticket_number;
            data.ticket_url = responseData.ticket.ticket_url;
            data.ticket_assignment = responseData.ticket.ticket_assignment;
            data.ticket_comment = responseData.ticket.ticket_comment;
          }
 
          chrome.tabs.sendMessage(tabs[0].id, { action: 'printFormData', data: data });
        });
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