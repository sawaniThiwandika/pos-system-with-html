import {CustomerModel} from "../model/CustomerModel.js";
import {customersList} from "../db/db.js";
let clickRecord;
let cusId;
loadId();
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
$('#nav-dashboard').on('click',()=>{
    $('#dashboardSection').removeClass("close");
    $('#customerSection').addClass("close");
    $('#itemSection').addClass("close");
    $('#orderSection').addClass("close");
    $('#dashboardSection').addClass("open");
    console.log("clicked");

})
$('#nav-customers').on('click',()=>{
    $('#customerSection').removeClass("close");
    $('#customerSection').addClass("open");
    $('#itemSection').addClass("close");
    $('#orderSection').addClass("close");
    $('#dashboardSection').addClass("close");
    console.log("clicked");
});
$('#nav-inventory').on('click',()=>{
    $('#itemSection').removeClass("close");
    $('#customerSection').addClass("close");
    $('#itemSection').addClass("open");
    $('#orderSection').addClass("close");
    $('#dashboardSection').addClass("close");
    console.log("clicked");
});
$('#nav-orders').on('click',()=>{
    $('#orderSection').removeClass("close");
    $('#customerSection').addClass("close");
    $('#itemSection').addClass("close");
    $('#orderSection').addClass("open");
    $('#dashboardSection').addClass("close");
    console.log("clicked");
});
let customer;
$('#submitCusBtn').on('click',(event)=>{
     let isValid=validateCustomer();
    event.preventDefault();

   if(isValid) {
       let cusId = $('#customerIdField').val();
       let cusName = $('#customerNameField').val();
       let cusEmail = $('#customerEmailField').val();
       let cusAddress = $('#customerAddressField').val();
       let cusContact = $('#customerContactField').val();
       let cusAddDate = new Date().toISOString().split('T')[0];
       customer = new CustomerModel(cusId, cusName, cusEmail, cusAddress, cusContact, cusAddDate);
       customersList.push(customer);
       console.log(customer.cusName);
       $('#resetCusBtn').click();
       loadTable();

   }
});
$('#updateCusBtn').on('click', (event) => {
    event.preventDefault();
    let selectedIndex = $(this).index()+1;
    let cusId = $('#customerIdField').val();
    let cusName = $('#customerNameField').val();
    let cusEmail = $('#customerEmailField').val();
    let cusAddress = $('#customerAddressField').val();
    let cusContact = $('#customerContactField').val();


    if (selectedIndex !== undefined && selectedIndex >= 0 && selectedIndex < customersList.length) {
        let selectCustomer = customersList[selectedIndex];
        selectCustomer.cusId = cusId;
        selectCustomer.cusName = cusName;
        selectCustomer.cusEmail = cusEmail;
        selectCustomer.cusAddress = cusAddress;
        selectCustomer.cusContact = cusContact;
        console.log(selectCustomer.cusName);

        $('#resetCusBtn').click();


        loadTable();
    } else {
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
            <td class="colCustomerName">${item.cusName}</td>
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
