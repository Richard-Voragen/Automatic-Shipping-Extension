const CONTACT_NAME = "Derek Shannon";
const CONTACT_PHONE = "9163909209";
const PACK_DESCRIPTION = "Pack";
const PACK_SIZES = [ 12.5, 9.5, 0.1, 2.0 ];
 
console.log('Content injected')
const city_list = ["Adelanto","Agoura Hills","Alameda","Albany","Alhambra","Alturas","Amador City","Anaheim","Anderson","Angels","Antioch","Apple Valley","Arcadia","Arcata","Arroyo Grande","Artesia","Arvin","Atascadero","Atherton","Atwater","Auburn","Avalon","Avenal","Azusa","Bakersfield","Baldwin Park","Banning","Barstow","Beaumont","Bell","Bell Gardens","Bellflower","Belmont","Belvedere","Benicia","Berkeley","Beverly Hills","Big Bear Lake","Biggs","Bishop","Blue Lake","Blythe","Bradbury","Brawley","Brea","Brentwood","Brisbane","Buena Park","Burbank","Burlingame","Calexico","California City","Calipatria","Calistoga","Camarillo","Campbell","Capitola","Carlsbad","Carmel-By-The-Sea","Carpinteria","Carson","Cathedral City","Ceres","Cerritos","Chico","Chino","Chowchilla","Chula Vista","Claremont","Clayton","Cloverdale","Clovis","Coachella","Coalinga","Colfax","Colma","Colton","Colusa","Commerce","Compton","Concord","Corcoran","Corning","Corona","Coronado","Corte Madera","Costa Mesa","Cotati","Covina","Crescent City","Cudahy","Culver City","Cupertino","Cypress","Daly City","Dana Point","Danville","Davis","Del Mar","Del Rey Oaks","Delano","Desert Hot Springs","Diamond Bar","Dinuba","Dixon","Dorris","Dos Palos","Downey","Duarte","Dublin","Dunsmuir","East Palo Alto","El Cajon","El Centro","El Cerrito","El Monte","El Segundo","Elk Grove","Emeryville","Encinitas","Escalon","Escondido","Etna","Eureka","Exeter","Fairfax","Fairfield","Farmersville","Ferndale","Fillmore","Firebaugh","Folsom","Fontana","Fort Bragg","Fort Jones","Fortuna","Foster City","Fountain Valley","Fowler","Fremont","Fresno","Fullerton","Galt","Garden Grove","Gardena","Gilroy","Glendale","Glendora","Gonzales","Grand Terrace","Grass Valley","Greenfield","Gridley","Grover Beach","Guadalupe","Gustine","Half Moon Bay","Hanford","Hawaiian Gardens","Hawthorne","Hayward","Healdsburg","Hemet","Hercules","Hermosa Beach","Hesperia","Hidden Hills","Highland","Hillsborough","Hollister","Holtville","Hughson","Huntington Beach","Huntington Park","Huron","Imperial","Imperial Beach","Indian Wells","Indio","Industry","Inglewood","Ione","Irvine","Irwindale","Isleton","Jackson","Kerman","King City","Kingsburg","La Cañada Flintridge","La Habra","La Habra Heights","La Mesa","La Mirada","La Palma","La Puente","La Quinta","La Verne","Lafayette","Laguna Beach","Laguna Niguel","Lake Elsinore","Lakeport","Lakewood","Lancaster","Larkspur","Lathrop","Lawndale","Lemon Grove","Lemoore","Lincoln","Lindsay","Live Oak","Livermore","Livingston","Lodi","Loma Linda","Lomita","Lompoc","Long Beach","Loomis","Los Alamitos","Los Altos","Los Altos Hills","Los Angeles","Los Banos","Los Gatos","Loyalton","Lynwood","Madera","Mammoth Lakes","Manhattan Beach","Manteca","Maricopa","Marina","Martinez","Marysville","Maywood","McFarland","Mendota","Menlo Park","Merced","Mill Valley","Millbrae","Milpitas","Mission Viejo","Modesto","Monrovia","Montague","Montclair","Monte Sereno","Montebello","Monterey","Monterey Park","Moorpark","Moraga","Moreno Valley","Morgan Hill","Morro Bay","Mount Shasta","Mountain View","Napa","National City","Needles","Nevada City","Newark","Newman","Newport Beach","Norco","Norwalk","Novato","Oakdale","Oakland","Oceanside","Ojai","Ontario","Orange","Orange Cove","Orinda","Orland","Oroville","Oxnard","Pacific Grove","Pacifica","Palm Desert","Palm Springs","Palmdale","Palo Alto","Palos Verdes Estates","Paradise","Paramount","Parlier","Pasadena","Paso Robles","Patterson","Perris","Petaluma","Pico Rivera","Piedmont","Pinole","Pismo Beach","Pittsburg","Placentia","Placerville","Pleasant Hill","Pleasanton","Plymouth","Point Arena","Pomona","Port Hueneme","Porterville","Portola","Portola Valley","Poway","Rancho Cucamonga","Rancho Mirage","Rancho Palos Verdes","Red Bluff","Redding","Redlands","Redondo Beach","Redwood City","Reedley","Rialto","Richmond","Ridgecrest","Rio Dell","Rio Vista","Ripon","Riverbank","Riverside","Rocklin","Rohnert Park","Rolling Hills","Rolling Hills Estates","Rosemead","Roseville","Ross","Sacramento","Salinas","San Anselmo","San Bernardino","San Bruno","San Carlos","San Clemente","San Diego","San Dimas","San Fernando","San Francisco","San Gabriel","San Jacinto","San Joaquin","San Jose","San Juan Bautista","San Juan Capistrano","San Leandro","San Luis Obispo","San Marcos","San Marino","San Mateo","San Pablo","San Rafael","San Ramon","Sand City","Sanger","Santa Ana","Santa Barbara","Santa Clara","Santa Clarita","Santa Cruz","Santa Fe Springs","Santa Maria","Santa Monica","Santa Paula","Santa Rosa","Santee","Saratoga","Sausalito","Scotts Valley","Seal Beach","Seaside","Sebastopol","Selma","Shafter","Sierra Madre","Signal Hill","Simi Valley","Solana Beach","Soledad","Solvang","Sonoma","Sonora","South El Monte","South Gate","South Lake Tahoe","South Pasadena","South San Francisco","St. Helena","Stanton","Stockton","Suisun City","Sunnyvale","Susanville","Sutter Creek","Taft","Tehachapi","Tehama","Temecula","Temple City","Thousand Oaks","Tiburon","Torrance","Tracy","Trinidad","Tulare","Tulelake","Turlock","Tustin","Twentynine Palms","Ukiah","Union City","Upland","Vacaville","Vallejo","Ventura","Vernon","Victorville","Villa Park","Visalia","Vista","Walnut","Walnut Creek","Wasco","Waterford","Watsonville","Weed","West Covina","West Hollywood","West Sacramento","Westlake Village","Westminster","Westmorland","Wheatland","Whittier","Williams","Willits","Willows","Winters","Woodlake","Woodland","Woodside","Yorba Linda","Yountville","Yreka","Yuba City","Yucaipa"];
 
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
    worker,
    requester
};
 
listener();
 
if (document.URL.includes("sc_task.do?")) {
    chrome.runtime.sendMessage({action: "scrapeData"});
} else if (document.URL.includes("tranzact.com/Pages/Shipments/Parcel_Add")) {
    setTimeout(() => {
        chrome.runtime.sendMessage({action: "printData"});
    }, 3000);
} else if (document.URL.includes("tranzact.com/Pages/Location_Add")) {
    setTimeout(() => {
        chrome.runtime.sendMessage({action: "printLocationData"});
    }, 6000);
}
 
// Example of extracting data from a page
function listener() {
    // Send the scraped data to the background script or popup
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.action === 'scrapeData' && document.URL.includes("sc_task.do?")) {
            getWorkerData();
            getRequesterData();
 
            scrapedData = {
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
    });
}
 
// Scrapes the worker data
function getWorkerData() {
    //console.log(document.getElementsByClassName("questionsetreference form-control element_reference_input disabled readonly"));
    const worker_list_info = document.getElementsByClassName("cat_item_option sc-content-pad form-control");
 
    const worker_first_name = worker_list_info[0].value ? worker_list_info[0].value.trim() : "";
    const worker_last_name = worker_list_info[1].value ? worker_list_info[1].value.trim() : "";
    const worker_email = "";
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
    console.log(document.getElementsByClassName("form-control input-sm controlldCustom controlAdd"));
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
    /* document.getElementsByClassName("form-control input-sm controlldCustom controlAdd")[0].querySelectorAll("option").forEach(el => {
        console.log(el.textContent);
        if (el.textContent === "185-269118400-69045 (SUTTER MEDICAL FOUNDATION)") {
            el.click();
            console.log("RAN");
        }
    }); */
   
    // check boxes
    let checks = document.getElementsByClassName("controlldCustomChk")
    for (let i = 0; i < checks.length; i++) {
        checks[i].click();
    }
 
    let sizes = document.getElementsByClassName("txtStopLineData lineControlEdit form-control input-excel decimal-field input-sm");
    for (let i = 0; i < sizes.length; i++) {
        sizes[i].value = PACK_SIZES[i];
    }
}
 
function printLocationData(data) {
    console.log(data);
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
    // Dropdowns
    document.getElementById("ddLocationType").selectedIndex = 5;
    document.getElementById("ddState").selectedIndex = 5;
    document.getElementById("ddTimeZone").selectedIndex = 4;
}
 
function parseAddress(address) {
    const parts = address.split(/[,/]/);
 
    let addressL1 = "";
    let addressL2 = "";
    let city = "";
    let zip = "";
 
    const index = city_list.findIndex(item => address.includes(item));
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