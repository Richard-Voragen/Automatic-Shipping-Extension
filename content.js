const CONTACT_NAME = "Richard Voragen";
const CONTACT_PHONE = "7149449113";
const PACK_DESCRIPTION = "Pack";
const PACK_SIZES = [ 12.5, 9.5, 0.1, 2.0 ];
 
console.log('Content injected')
let city_list = [];
chrome.runtime.sendMessage({action: "getCityList"}, (response) => {
    if (response) {
      city_list = response;
    }
});
 
let ticket = {
    ticket_number: "null",
    ticket_url: "null",
    ticket_assignment: "null",
    ticket_comment: "null"
}
let worker = {
    worker_location: "null",
    worker_first_name: "null",
    worker_last_name: "null",
    worker_email: "null",
    worker_job_title: "null",
    worker_department: "null"
}
let requester = {
    requester_first_name: "null",
    requester_last_name: "null",
    requester_email: "null",
    requester_location: "null"
}
let scrapedData = {
    ticket,
    worker,
    requester
};
 
listener();
 
if (document.URL.includes("sc_task.do?")) {
    chrome.runtime.sendMessage({action: "scrapeData"});
} else if (document.URL.includes("tranzact.com/Pages/Shipments/Parcel_Add")) {
    setTimeout(() => {
        chrome.runtime.sendMessage({action: "printData"});
    }, 3200);
} else if (document.URL.includes("tranzact.com/Pages/Location_Add")) {
    setTimeout(() => {
        chrome.runtime.sendMessage({action: "printLocationData"});
    }, 500);
} else if (document.URL.includes("adlookup.sutterhealth.org/?auto")) {
    setTimeout(() => {
        chrome.runtime.sendMessage({action: "printLookupData"});
    }, 1000);
} else if (document.URL.includes("form.asana.com/?k=EEfalg4YOs24mCOhxzkk3A&d=15743239826254")) {
    setTimeout(() => {
        chrome.runtime.sendMessage({action: "printFormData"});
    }, 1000);
}
 
// Example of extracting data from a page
function listener() {
    // Send the scraped data to the background script or popup
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.action === 'scrapeData' && document.URL.includes("sc_task.do?")) {
            getTicketData();
            getWorkerData();
            getRequesterData();
 
            scrapedData = {
                ticket,
                worker,
                requester
            };
            sendResponse(scrapedData);
        }
 
        //This is the printdata function for the shipping page
        if (message.action === 'printData') {
            if (document.URL.includes("tranzact.com/Pages/Shipments/Parcel_Add")) {
                printParcelData(message.data);
            }
        }
 
        //This is the printdata function for the location page
        if (message.action === 'printLocationData') {
            if (document.URL.includes("tranzact.com/Pages/Location_Add")) {
                printLocationData(message.data);
            }
        }
 
        //This is the printdata function for the active directory page
        if (message.action === 'printLookupData') {
            if (document.URL.includes("adlookup.sutterhealth.org")) {
                printLookupData(message.data);
            }
        }
 
        // This is the printdata function for asana form
        if (message.action === 'printFormData') {
            if (document.URL.includes("form.asana.com/")) {
                printFormData(message.data);
            }
        }
    });
}
 
// Scrapes the ticket data
function getTicketData() {
    //console.log(document.getElementById("sys_readonly.sc_task.number").value);
    const ticket_number = document.getElementById("sys_readonly.sc_task.number").value;
    const ticket_url = document.URL;
    const ticket_assignment = document.getElementById("sys_display.sc_task.assigned_to").value;
    const ticket_comment = generateComment(document.getElementsByClassName("tdwrap")[0].innerText, ticket_assignment);
 
    ticket = {
        ticket_number,
        ticket_url,
        ticket_assignment,
        ticket_comment
    }
}
 
// Scrapes the worker data
function getWorkerData() {
    console.log(document.getElementsByClassName("tdwrap")[0].innerText);
    const worker_list_info = document.getElementsByClassName("cat_item_option sc-content-pad form-control");
 
    const worker_first_name = worker_list_info[0].value ? worker_list_info[0].value.trim() : "";
    const worker_last_name = worker_list_info[1].value ? worker_list_info[1].value.trim() : "";
    let worker_email = "";
    try {
        worker_email = document.getElementsByClassName("questionsetreference form-control element_reference_input disabled readonly")[0].value.split(" ")[2].slice(1, -1);
    } catch (error) {}
    const worker_job_title = worker_list_info[2].value ? worker_list_info[2].value.trim() : "";
    const worker_department = worker_list_info[3].value ? worker_list_info[3].value.trim() : "";
    const worker_comments = document.getElementsByClassName("question_textarea_input cat_item_option form-control disabled readonly")[1].value.trim();
    const worker_location = parseAddress(worker_comments);
 
    worker = {
        worker_location,
        worker_first_name,
        worker_last_name,
        worker_email,
        worker_job_title,
        worker_department
    }
}
 
// Scrapes the requester data
function getRequesterData() {
    const requesterData = document.getElementById("sys_display.original.sc_task.request_item.request.requested_for").value;
    let requester_tokens = requesterData.split(" ")
 
    const requester_first_name = requester_tokens[1];
    const requester_last_name = requester_tokens[0].slice(0, -1);
    const requester_email = requester_tokens[2].slice(1, -1);
    const requester_location = parseAddress(document.getElementsByClassName("cat_item_option sc-content-pad form-control")[4].value ? document.getElementsByClassName("cat_item_option sc-content-pad form-control")[4].value : "");
 
    requester = {
        requester_first_name,
        requester_last_name,
        requester_email,
        requester_location
    }
}
 
function printParcelData(data) {
    //console.log(document.getElementsByClassName("pickDrop stopLocationSelect col-sm-4"));
    console.log(document.getElementById("tblAll"));
    //locations
    document.getElementsByClassName("form-control input-sm ui-autocomplete-input autocomplete-location")[0].value = CONTACT_NAME;
    document.getElementsByClassName("form-control input-sm ui-autocomplete-input autocomplete-location")[1].value = data.request_location;
 
    // names
    document.getElementsByClassName("form-control input-sm txtStopContactName")[0].value = CONTACT_NAME;
    document.getElementsByClassName("form-control input-sm txtStopContactName")[1].value = data.worker_name;
    // Phone numbers
    document.getElementsByClassName("form-control input-sm txtStopContactPhone")[0].value = CONTACT_PHONE;
    document.getElementsByClassName("form-control input-sm txtStopContactPhone")[1].value = CONTACT_PHONE;
 
    // description
    document.getElementsByClassName("txtStopLineData lineControlEdit form-control input-excel input-sm form-control ui-autocomplete-input autocomplete-commodity input-sm txtStopCommodityDescription txtCommodityDescription")[0].value = PACK_DESCRIPTION;
   
    // Dropdowns
    document.getElementsByClassName("form-control input-sm controlldCustom controlAdd")[0].selectedIndex = 1;
    document.getElementById("ddPickupType").selectedIndex = 1;
   
    // check boxes
    let checks = document.getElementsByClassName("controlldCustomChk")
    for (let i = 0; i < checks.length; i++) {
        checks[i].click();
    }
 
    let sizes = document.getElementsByClassName("txtStopLineData lineControlEdit form-control input-excel decimal-field input-sm");
    for (let i = 0; i < sizes.length; i++) {
        sizes[i].value = PACK_SIZES[i];
    }
 
    const destination = document.getElementsByClassName("pickDrop stopLocationSelect col-sm-4")[1];
    const interval = setInterval(() => {
        if (destination.style.display === "none") {
            // Dropdowns
            document.getElementById("chk0461").click();
            document.getElementById("chk0611").click();
 
            clearInterval(interval);
        }
    }, 1000)
 
    const interval2 = setInterval(() => {
        const shipping_values = document.getElementById("tblAll");
        if (shipping_values != null) {
            const idVal = shipping_values.tBodies[0].querySelectorAll('tr')[4].querySelectorAll('td')[0].innerText;
            document.getElementById("UPSN-" + idVal).click();
 
            setTimeout(() => {
                document.getElementById("ddParcelTenderAccountNum").selectedIndex = 1;
            }, 200);
 
            clearInterval(interval2);
        }
    }, 1000)
}
 
function printLocationData(data) {
    //console.log(document.getElementsByClassName("form-control input-sm ui-autocomplete-input autocomplete-location"));
    // Location Name
    document.getElementById("txtLocationName").value = data.location_name;
    // Street Addresses
    document.getElementById("txtStreetAddress").value = data.location.addressL1;
    document.getElementById("txtStreetAddress2").value = data.location.addressL2;
    // Zip Code
    document.getElementById("txtPostalCode").value = data.location.zip;
    // City
    document.getElementById("txtCity").value = data.location.city;
    // Validate Button
    document.getElementById("chkDoValidate").click();
 
    const dropdowns = [
        document.getElementById("ddState"),
        document.getElementById("ddTimeZone"),
        document.getElementById("ddLocationType")
    ];
    const interval = setInterval(() => {
        if (dropdowns.every(dropdown => dropdown.value === "-1")) {
            // Dropdowns
            document.getElementById("ddLocationType").selectedIndex = 5;
            document.getElementById("ddState").selectedIndex = 5;
            document.getElementById("ddTimeZone").selectedIndex = 4;
 
            // Dock Hours
            document.getElementById("btnSetDockHours").click();
            document.getElementById("ddAddHoursStart").selectedIndex = 28;
            document.getElementById("ddAddHoursEnd").selectedIndex = 68;
            document.getElementById("btnAddHoursConfirm").click();
 
            clearInterval(interval);
        }
    }, 250)
}
 
function printLookupData(data) {
    if (data.email === "") {
        document.getElementById("TextBoxFN").value = data.first_name;
        document.getElementById("TextBoxLN").value = data.last_name;
 
        document.getElementById("ButtonGetFL").click();
    } else {
        document.getElementById("TextBox1").value = data.email;
 
        document.getElementById("Button1").click();
    }
}
 
function printFormData(data) {
    const inputEvent = new Event('input', { bubbles: true });
    const changeEvent = new Event('change', { bubbles: true });
 
    let textbox = document.getElementById("1209254768244365");
    textbox.value = data.ticket_number;
    textbox.dispatchEvent(inputEvent);
    textbox.dispatchEvent(changeEvent);
 
    textbox = document.getElementById("1209254768244367");
    textbox.value = data.ticket_assignment;
    textbox.dispatchEvent(inputEvent);
    textbox.dispatchEvent(changeEvent);
 
    textbox = document.getElementById("1209254768244369");
    textbox.value = data.ticket_url;
    textbox.dispatchEvent(inputEvent);
    textbox.dispatchEvent(changeEvent);
 
    textbox = document.getElementById("1209254768244375");
    textbox.value = data.ticket_comment;
    textbox.dispatchEvent(inputEvent);
    textbox.dispatchEvent(changeEvent);
}
 
function parseAddress(address) {
    let addressL1 = "";
    let addressL2 = "";
    let city = "";
    let zip = "";
 
    const index = city_list.findLastIndex(item => address.toLowerCase().includes(item.toLowerCase()));
    if (index != -1) city = city_list[index].trim();
 
    if (city) addressL1 = address.substring(address.search(/\d{3,5}/), address.search(city)).replace(/^[,\s]+|[,\s]+$/g, "");
 
    if (address.match(/ 9\d{4}/)) {
        zip = address.match(/ 9\d{4}/)[0].trim();
    }
 
    const lines = addressL1.split(',')
    if (lines.length >= 2) {
        addressL1 = lines[0].trim();
        addressL2 = lines[1].trim();
    }
 
    return {
        addressL1,
        addressL2,
        city,
        zip
    }
}
 
function generateComment(date, ticket_assignment) {
    splitDate = date.split(' ');
 
    if (date.includes(ticket_assignment)) {
        return "Last contact made with customer on ServiceNow was on " + splitDate[0];
    }
 
    return "Customer contacted us on " + splitDate[0];
}