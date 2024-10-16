import {CustomerModel} from "../model/CustomerModel.js";
import {customersList} from "../db/db.js";

let clickRecord;
let cusId;
getCustomerList();

$('#nav-customers').on('click', function (event) {
    event.preventDefault(); // Prevent default link behavior

    // Load the item table
    //loadItemTable();

    getCustomerList();
});

function getCustomerList() {
    const http = new XMLHttpRequest();
    customersList.length = 0; // Clear previous data

    http.onreadystatechange = () => {
        if (http.readyState === 4) {
            if (http.status === 200) {
                let contentType = http.getResponseHeader("Content-Type");
                console.log("Content type: " + contentType);

                if (contentType && contentType.includes("application/json")) {
                    try {
                        let response = JSON.parse(http.responseText);
                        console.log("Response:", response); // Log the retrieved customer list

                        response.forEach((customerData) => {
                            const customer = new CustomerModel(
                                customerData.cusId,
                                customerData.cusName,
                                customerData.cusEmail,
                                customerData.cusAddress,
                                customerData.cusContact,
                                customerData.addCusDate
                            );
                            customersList.push(customer);
                        });

                        console.log(customersList);
                        loadId(); // Assuming this function loads some ID related data
                        loadTable(); // Assuming this function populates a table with customer data

                    } catch (e) {
                        console.error("Failed to parse JSON response: ", e);
                        console.error("Response text: ", http.responseText);
                    }
                } else {
                    console.error("Unexpected content type: ", contentType);
                    console.error("Response is not JSON: ", http.responseText);
                }
            } else {
                console.error("Request failed with status: ", http.status);
                console.error("Response text: ", http.responseText);
            }
        } else {
            console.log("Processing stage: ", http.readyState);
        }
    };

    // Use GET method to fetch customer list
    http.open("GET", "http://localhost:8080/pos_system_backend_with_spring/api/v1/customer", true);
    http.send();
}
function loadId() {


    let cusId;
    /*if (customersList.length === 0) {
        cusId = "C" + 1;
    } else {
        let lastCustomerIdNumericPart = parseInt(customersList[customersList.length - 1].cusId.substring(1));
        let newNumericPart = lastCustomerIdNumericPart + 1;
        cusId = "C" + newNumericPart;
    }*/
    $('#customerIdField').val("CustomerId");
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
        console.log("customer" + customer);

        // Reset form and reload table
        $('#resetCusBtn').click();
        getCustomerList();


        const formData = new FormData();
        formData.append("_cusId", customer.cusId);
        formData.append("_cusName", customer.cusName);
        formData.append("_cusEmail", customer.cusEmail);
        formData.append("_cusAddress", customer.cusAddress);
        formData.append("_cusContact", customer.cusContact);
        formData.append("_addCusDate", customer.addCusDate);

// Create and configure XMLHttpRequest
        const http = new XMLHttpRequest();

        http.onreadystatechange = () => {
            if (http.readyState === 4) { // Request is done
                if (http.status === 201) { // Created (201 is usually the status code for resource creation)
                    console.log("Customer saved successfully");
                    let contentType = http.getResponseHeader("Content-Type");
                    console.log("Content-Type: " + contentType);
                    console.log("Response Text: " + http.responseText); // Log the raw response before parsing

                    // Check if the content type is JSON
                    if (contentType && contentType.includes("application/json")) {
                        try {
                            let response = JSON.parse(http.responseText); // Parse response as JSON
                            console.log(response); // Log the parsed response
                        } catch (e) {
                            console.error("Failed to parse JSON response: ", http.responseText);
                        }
                    } else {
                        // Handle non-JSON responses
                        console.log("Response: ", http.responseText); // Log plain text response
                    }
                } else {
                    console.error("Request failed with status: ", http.status);
                }
            } else {
                console.log("Processing stage: ", http.readyState);
            }
        };

// Open a connection
        http.open("POST", "http://localhost:8080/pos_system_backend_with_spring/api/v1/customer", true);

// No need to set Content-Type, as FormData automatically sets it
        http.send(formData); // Send the FormData

    }
    loadId();
    loadTable();
});

$('#updateCusBtn').on('click', (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the customer data from the form fields
    let cusId = $('#customerIdField').val();
    let cusName = $('#customerNameField').val();
    let cusEmail = $('#customerEmailField').val();
    let cusAddress = $('#customerAddressField').val();
    let cusContact = $('#customerContactField').val();
    let addCusDate = $('#customerAddDateField').val(); // Ensure this is coming from a form field or set it in JS

    // Check if all fields have values
    if (cusId && cusName && cusEmail && cusAddress && cusContact) {
        // Create FormData object to hold form data
        const formData = new FormData();
        formData.append("_cusId", cusId);
        formData.append("_cusName", cusName);
        formData.append("_cusEmail", cusEmail);
        formData.append("_cusAddress", cusAddress);
        formData.append("_cusContact", cusContact);
        formData.append("_addCusDate", addCusDate);

        // Create and configure XMLHttpRequest for sending the data
        const http = new XMLHttpRequest();

        http.onreadystatechange = () => {
            if (http.readyState === 4) { // Request is done
                if (http.status === 200) { // Success
                    console.log("Customer updated successfully");
                    console.log("Response Text: ", http.responseText); // Log the raw response
                } else {
                    console.error("Request failed with status: ", http.status);
                    console.error("Response Text: ", http.responseText);
                }
            }
        };

        // Open a connection to the update customer endpoint
        http.open("PUT", "http://localhost:8080/pos_system_backend_with_spring/api/v1/customer", true);

        // No need to set Content-Type, as FormData automatically sets the boundary for multipart form data
        http.send(formData); // Send the FormData
    } else {
        console.error("One or more form fields are empty.");
    }
    loadTable();
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
    event.preventDefault();
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
    let cusId = $('#customerIdField').val();
    console.log("Delete customer: " + cusId);

    const idJSON = JSON.stringify({ cusId: cusId });
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
    http.open("DELETE", `http://localhost:8080/pos_system_backend_with_spring/api/v1/customer/${cusId}`, true);
    http.setRequestHeader("Content-Type", "application/json");
    http.send(idJSON);



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
