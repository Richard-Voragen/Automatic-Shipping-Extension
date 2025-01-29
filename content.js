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
 
checkURL(document.URL);
listener();
 
// Checks url to see what function to call
function checkURL(url) {
    if (url.includes("sc_task.do?")) {
        chrome.runtime.sendMessage({action: "scrapeData"});
    } else if (url.includes("tranzact.com/Pages/Shipments/Parcel_Add")) {
        setTimeout(() => {
            chrome.runtime.sendMessage({action: "printShippingData"});
        }, 3200);
    } else if (url.includes("tranzact.com/Pages/Location_Add")) {
        setTimeout(() => {
            chrome.runtime.sendMessage({action: "printLocationData"});
        }, 500);
    } else if (url.includes("adlookup.sutterhealth.org/?auto")) {
        setTimeout(() => {
            chrome.runtime.sendMessage({action: "printLookupData"});
        }, 1000);
    } else if (url.includes("form.asana.com/?k=EEfalg4YOs24mCOhxzkk3A&d=15743239826254")) {
        setTimeout(() => {
            chrome.runtime.sendMessage({action: "printQueueFormData"});
        }, 1000);
    } else if (url.includes("form.asana.com/?k=EvpYzsDC7rjTQPQIJegwNw&d=15743239826254")) {
        setTimeout(() => {
            chrome.runtime.sendMessage({action: "printWorkdayFormData"});
        }, 1000);
    }
}
 
// Listens to requests from background.js
function listener() {
    // Send the scraped data to the background script or popup
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.action.includes("print")) {
            const printFunctions = new PrintFunctions();
            printFunctions[message.action](message.data);
        } else {
            switch(message.action) {
                case 'scrapeData':
                    const getFunctions = new GetFunctions();
                    const scrapedData = {
                        ticket : getFunctions.getTicketData(),
                        worker : getFunctions.getWorkerData(),
                        requester : getFunctions.getRequesterData()
                    };
                    sendResponse(scrapedData);
                    break;
            }
        }
    });
}
 
class GetFunctions {
    getTicketData() {
        //console.log(document.getElementById("sys_readonly.sc_task.nuer"));
        let ticket_comment = "";
        try { ticket_comment = this.generateComment(document.getElementsByClassName("tdwrap")[0].innerText, ticket_assignment); } catch (e) {console.log("No comments.");};
   
        return {
            ticket_number : document.getElementById("sys_readonly.sc_task.number").value,
            ticket_url : document.URL,
            ticket_assignment : document.getElementById("sys_display.sc_task.assigned_to").value,
            ticket_comment: ticket_comment
        }
    }
   
    getWorkerData() {
        //console.log(document.getElementsByClassName("sc_variable_editor"));
        const worker_info = document.getElementsByClassName("sc_variable_editor");
   
        let worker_email = "";
        try {
            const elements = this.textboxValue(worker_info[3]).trim().split(" ");
            worker_email = elements[elements.length-1].slice(1, -1);
        } catch (error) {}
        const worker_comments = document.getElementsByClassName("question_textarea_input cat_item_option form-control")[1].value.trim();
   
        return {
            worker_first_name : this.textboxValue(worker_info[5]),
            worker_last_name : this.textboxValue(worker_info[6]),
            worker_email : worker_email,
            worker_job_title : this.textboxValue(worker_info[7]),
            worker_department : this.textboxValue(worker_info[8]),
            worker_location : this.parseAddress(worker_comments)
        }
    }
     
    getRequesterData() {
        //console.log(document.getElementsByClassName("cat_item_option sc-content-pad form-control"));
        const requesterData = document.getElementById("sys_display.original.sc_task.request_item.request.requested_for").value;
        let requester_tokens = requesterData.split(" ")
   
        return {
            requester_first_name : requester_tokens[1],
            requester_last_name : requester_tokens[0].slice(0, -1),
            requester_email : requester_tokens[2].slice(1, -1),
            requester_location : this.parseAddress(this.textboxValue(document.getElementsByClassName("sc_variable_editor")[13]))
        }
    }
   
    // helper function to get the textbox value field
    textboxValue(workerTextbox) {
        if (workerTextbox)
            return workerTextbox.querySelectorAll('div')[1].querySelectorAll('input')[1].value;
        return "";
    }
   
    // gets the address data from the comment
    parseAddress(address) {
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
            comment : address,
            addressL1,
            addressL2,
            city,
            zip
        }
    }
   
    // generates comment to put on the queue ticket
    generateComment(date, ticket_assignment) {
        splitDate = date.split(' ');
   
        if (date.includes(ticket_assignment)) {
            return "Last contact made with customer on ServiceNow was on " + splitDate[0];
        }
   
        return "Customer contacted us on " + splitDate[0];
    }
}
 
class PrintFunctions {
    printShippingData(data) {
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
 
    printLocationData(data) {
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
 
    printLookupData(data) {
        if (data.email === "") {
            document.getElementById("TextBoxFN").value = data.first_name;
            document.getElementById("TextBoxLN").value = data.last_name;
 
            document.getElementById("ButtonGetFL").click();
        } else {
            document.getElementById("TextBox1").value = data.email;
 
            document.getElementById("Button1").click();
        }
    }
 
    printQueueFormData(data) {
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
 
    printWorkdayFormData(data) {
        console.log(data);
        console.log("TEST");
        const inputEvent = new Event('input', { bubbles: true });
        const changeEvent = new Event('change', { bubbles: true });
 
        let textbox = document.getElementById("1209244228303880");
        textbox.value = data.employee_name;
        textbox.dispatchEvent(inputEvent);
        textbox.dispatchEvent(changeEvent);
    }
}