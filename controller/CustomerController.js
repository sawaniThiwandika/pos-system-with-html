import {CustomerModel} from "../model/CustomerModel.js";
import {customersList} from "../db/db.js";

let clickRecord;
let cusId;
getCustomerList();


function getCustomerList(){
    const http = new XMLHttpRequest();
    customersList.length = 0;
    http.onreadystatechange = () => {
        if (http.readyState === 4) {
            if (http.status === 200) {
                let contentType = http.getResponseHeader("Content-Type");
                console.log("Content type: " + contentType);

                if (contentType && contentType.includes("application/json")) {
                    try {
                        let response = JSON.parse(http.responseText);
                        console.log("response:", response);  // Log the retrieved customer list

                        response.forEach((customerData) => {
                            // Create CustomerModel instance with appropriate properties
                            let customer = new CustomerModel(
                                customerData._cusId,
                                customerData._cusName,
                                customerData._cusEmail,
                                customerData._cusContact,
                                customerData._cusAddress,
                                customerData._addCusDate
                            );
                            customersList.push(customer);
                        });
                        console.log(customersList);
                        loadId();
                        loadTable();

                    } catch (e) {
                        console.error("Failed to parse JSON response: ", http.responseText);
                    }
                } else {
                    console.error("Unexpected content type: ", contentType);
                    console.error("Response is not JSON: ", http.responseText);
                }
            } else {
                console.error("Request failed with status: ", http.status);
            }
        } else {
            console.log("Processing stage: ", http.readyState);
        }
    };

    // Change the method to GET since we're fetching data
    http.open("GET", "http://localhost:8080/POS_backend_war_exploded/Customer", true);
    http.send();
}
function loadId() {


    let cusId;
    if (customersList.length === 0) {
        cusId = "C" + 1;
    } else {
        let lastCustomerIdNumericPart = parseInt(customersList[customersList.length - 1].cusId.substring(1));
        let newNumericPart = lastCustomerIdNumericPart + 1;
        cusId = "C" + newNumericPart;
    }
    $('#customerIdField').val(cusId);
}

loadId();

let customer;
$('#submitCusBtn').on('click', (event) => {
    event.preventDefault(); // Prevent form submission

    let isValid = validateCustomer();
    if (isValid) {
        // Gather customer data
        let cusId = $('#customerIdField').val();
        let cusName = $('#customerNameField').val();
        let cusEmail = $('#customerEmailField').val();
        let cusAddress = $('#customerAddressField').val();
        let cusContact = $('#customerContactField').val();
       // let cusAddDate = new Date().toISOString().split('T')[0];

        let currentDate = new Date();
        let year = currentDate.getFullYear();
        let month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        let day = String(currentDate.getDate()).padStart(2, '0');

        let formattedDate = `${year}-${month}-${day}`;
        console.log("date "+formattedDate);
        // Create customer model
        customer = new CustomerModel(cusId, cusName, cusEmail, cusAddress, cusContact, formattedDate);
        console.log(customer.cusName);
        console.log("customer"+customer);

        // Reset form and reload table
        $('#resetCusBtn').click();
        getCustomerList();


        // Convert customer data to JSON
        const customerJSON = JSON.stringify(customer);

        // Create and configure XMLHttpRequest
        // Create JSON


// Save the data with AJAX
        const http = new XMLHttpRequest();
        //const http=new XMLHttpRequest().setRequestHeader("Content-Type","application/json");
        http.onreadystatechange = () => {
            if (http.readyState === 4) {
                if (http.status === 200) {
                    let contentType = http.getResponseHeader("Content-Type");
                    console.log("content type "+http);
                    if (contentType && contentType.includes("application/json")) {
                        try {
                            let response = JSON.parse(http.responseText);
                            console.log(response);
                        } catch (e) {
                            console.error("Failed to parse JSON response: ", http.responseText);
                        }
                    } else {
                        console.error("Unexpected content type: ", contentType);
                        console.error("Response is not JSON: ", http.responseText);
                    }
                } else {
                    console.error("Failed with status: ", http.status);
                    console.error("Processing stage: ", http.readyState);
                }
            } else {
                console.log("Processing stage: ", http.readyState);
            }
        };
        http.open("POST", "http://localhost:8080/POS_backend_war_exploded/Customer", true);
        http.setRequestHeader("Content-Type", "application/json");
        http.send(customerJSON);

    }
    loadId();
    loadTable();
});

$('#updateCusBtn').on('click', (event) => {
    event.preventDefault();
    let selectedIndex = $(this).index()+1;
    let cusId = $('#customerIdField').val();
    let cusName = $('#customerNameField').val();
    let cusEmail = $('#customerEmailField').val();
    let cusAddress = $('#customerContactField').val();
    let cusContact = $('#customerAddressField').val();


    if (selectedIndex !== undefined && selectedIndex >= 0 && selectedIndex < customersList.length) {
        let selectCustomer = customersList[selectedIndex];

        let currentDate = new Date();
        let year = currentDate.getFullYear();
        let month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        let day = String(currentDate.getDate()).padStart(2, '0');
        selectCustomer._cusId = cusId;
        selectCustomer._cusName = cusName;
        selectCustomer._cusEmail = cusEmail;
        selectCustomer._cusAddress = cusAddress;
        selectCustomer._cusContact = cusContact;



        let formattedDate = `${year}-${month}-${day}`;
        console.log(selectCustomer._cusName);
        console.log(selectCustomer._cusAddress);

        $('#resetCusBtn').click();
        customer = new CustomerModel(cusId, cusName, cusEmail, cusAddress, cusContact, formattedDate);
        const customerJSON = JSON.stringify(customer);
        const http = new XMLHttpRequest();
        //const http=new XMLHttpRequest().setRequestHeader("Content-Type","application/json");
        http.onreadystatechange = () => {
            if (http.readyState === 4) {
                if (http.status === 200) {
                    let contentType = http.getResponseHeader("Content-Type");
                    console.log("content type "+http);
                    if (contentType && contentType.includes("application/json")) {
                        try {
                            let response = JSON.parse(http.responseText);
                            console.log(response);
                        } catch (e) {
                            console.error("Failed to parse JSON response: ", http.responseText);
                        }
                    } else {
                        console.error("Unexpected content type: ", contentType);
                        console.error("Response is not JSON: ", http.responseText);
                    }
                } else {
                    console.error("Failed with status: ", http.status);
                    console.error("Processing stage: ", http.readyState);
                }
            } else {
                console.log("Processing stage: ", http.readyState);
            }
        };
        http.open("PATCH", "http://localhost:8080/POS_backend_war_exploded/Customer", true);
        http.setRequestHeader("Content-Type", "application/json");
        http.send(customerJSON);
        loadTable();
    }

     else {
        console.log("No row selected or invalid index");
    }
});
$('#resetCusBtn').on('click',(event)=>{
    event.preventDefault();
   loadId();
    $('#customerNameField').val("");
    $('#customerEmailField').val("");
    $('#customerAddressField').val("");
    $('#customerContactField').val("");
    console.log("reset customer details");

});
function loadTable() {
    $('#cusTableBody').empty();
    customersList.map((item, index) => {
        var record = `<tr>
         <td  class="colCustomerId" >${item._cusId}</td>
            <td class="colCustomerName">${item._cusName}</td>
            <td class="colCustomerAddress">${item._cusAddress}</td>
            <td class="colCustomerEmail">${item._cusEmail}</td>
            <td class="colCustomerContact">${item._cusContact}</td>
            <td class="colCustomerAddDate">${item._addCusDate}</td>
        </tr>`;
        $('#customerTable').append(record);
    });
}

$('#cusTableBody').on('click','tr',function () {
    let index = $(this).index();
    clickRecord = index;
    let cusId = $(this).find(".colCustomerId").text();
    let cusName = $(this).find(".colCustomerName").text();
    let cusAddress = $(this).find(".colCustomerAddress").text();
    let cusEmail = $(this).find(".colCustomerEmail").text();
    let cusContact = $(this).find(".colCustomerContact").text();
    console.log("clicked row " + index);
    $('#customerIdField').val(cusId);
    $('#customerNameField').val(cusName);
    $('#customerEmailField').val(cusEmail);
    $('#customerAddressField').val(cusAddress);
    $('#customerContactField').val(cusContact);
});
$('#deleteCusBtn').on('click',(event)=>{
    event.preventDefault();
    customersList.splice(clickRecord, 1);
    loadTable();
});

loadTable();
function validateCustomer() {
    let isValid = true;


    let customerId = $('#customerIdField').val().trim();
    if (customerId === '') {
        isValid = false;
        alert('Please enter Customer ID');
        return isValid;
    }


    let customerName = $('#customerNameField').val().trim();
    if (customerName === '') {
        isValid = false;
        alert('Please enter Name');
        return isValid;
    }


    let customerEmail = $('#customerEmailField').val().trim();
    if (customerEmail === '') {
        isValid = false;
        alert('Please enter Email');
        return isValid;
    } else {

        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(customerEmail)) {
            isValid = false;
            alert('Please enter a valid Email address');
            return isValid;
        }
    }


    let customerAddress = $('#customerAddressField').val().trim();
    if (customerAddress === '') {
        isValid = false;
        alert('Please enter City');
        return isValid;
    }


    let customerContact = $('#customerContactField').val().trim();
    if (customerContact === '') {
        isValid = false;
        alert('Please enter Contact');
        return isValid;
    } else {

        let contactRegex = /^\d{10}$/;
        if (!contactRegex.test(customerContact)) {
            isValid = false;
            alert('Please enter a valid Contact number (10 digits)');
            return isValid;
        }
    }

    return isValid;
}
$(document).ready(function() {
    $("#searchBarCustomers").on("keyup", function() {
        var value = $(this).val().toLowerCase();

        $("#cusTableBody tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });

        $("#cusTableBody tr:visible").each(function() {
            var row = $(this);
            row.find("td").each(function() {
                var cell = $(this);
                var cellText = cell.text();
                var regex = new RegExp('(' + value + ')', 'gi');
                var highlightedText = cellText.replace(regex, '<span class="highlight">$1</span>');
                cell.html(highlightedText);
            });
        });
    });
});
