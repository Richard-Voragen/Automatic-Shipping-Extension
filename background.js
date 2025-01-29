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
      if (request.action.includes("print")) {
        sendCommandToContent(request.action);
      } else if (request.action.includes("create")) {
        chrome.tabs.create({ url: request.data });
      } else {
        switch(request.action) {
          case 'getCityList':
            sendResponse(cities);
            break;
 
          case 'scrapeData':
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
              try {
                chrome.tabs.sendMessage(tabs[0].id, { action: 'scrapeData' }, (response) => {
                  if (response) {
                    responseData = response;
                    console.log(responseData);
                  }
                });
              } catch (e) {
                console.log("Data retrieval failed.")
              }
            });
            break;
        }
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
 
function sendCommandToContent(command) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const printFunctions = new PrintFunctions();
    const data = printFunctions[command]();
 
    try {
      chrome.tabs.sendMessage(tabs[0].id, { action: command, data: data });
      console.log("Printed " + command);
    } catch (e) {
      console.log(command + " failed.");
    }
  });
}
 
// All the functions to obtain the data structure for the print calls
class PrintFunctions {
  printShippingData() {
    return {
      worker_name: (responseData) ? responseData.worker.worker_first_name + " " + responseData.worker.worker_last_name : "",
      request_location: (responseData) ? getRequestLocation(responseData).addressL1 : ""
    }
  }
 
  printLocationData() {
    let data = {
      location_name: (responseData) ? responseData.requester.requester_first_name + " " + responseData.requester.requester_last_name : "",
      location: {
        addressL1: "",
        addressL2: "",
        zip: "",
        city: ""
      }
    }
    if (responseData) {
      data.location = getRequestLocation(responseData);
    }
    return data;
  }
 
  printLookupData() {
    return {
      email: (responseData) ? responseData.worker.worker_email : "",
      first_name: (responseData) ? responseData.worker.worker_first_name : "",
      last_name: (responseData) ? responseData.worker.worker_last_name : ""
    }
  }
 
  printQueueFormData() {
    return {
      ticket_number: (responseData) ? responseData.ticket.ticket_number : "",
      ticket_url: (responseData) ? responseData.ticket.ticket_url : "",
      ticket_assignment: (responseData) ? responseData.ticket.ticket_assignment : "",
      ticket_comment: (responseData) ? responseData.ticket.ticket_comment : ""
    }
  }
 
  printWorkdayFormData() {
    return {
      employee_name: (responseData) ? responseData.worker.worker_first_name + " " + responseData.worker.worker_last_name : ""
    }
  }
}