import {CustomerModel} from "../model/CustomerModel.js";
import {customersList} from "../db/db.js";
let clickRecord;
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
event.preventDefault();
    let cusId=$('#customerIdField').val();
    let cusName=$('#customerNameField').val();
    let cusEmail=$('#customerEmailField').val();
    let cusAddress=$('#customerAddressField').val();
    let cusContact=$('#customerContactField').val();
    let cusAddDate= new Date().toISOString().split('T')[0];
    customer=new CustomerModel(cusId,cusName,cusEmail,cusAddress,cusContact,cusAddDate);
    customersList.push(customer);
    console.log(customer.cusName);
    loadTable();

});
$('#updateCusBtn').on('click',(event)=>{
    event.preventDefault();
    let cusId=$('#customerIdField').val();
    let cusName=$('#customerNameField').val();
    let cusEmail=$('#customerEmailField').val();
    let cusAddress=$('#customerAddressField').val();
    let cusContact=$('#customerContactField').val();

    customer.cusName=cusId;
    customer.cusName=cusName;
    customer.cusEmail=cusEmail;
    customer.cusAddress=cusAddress;
    customer.cusContact=cusContact;

    console.log(customer.cusName);
    loadTable();

});
$('#resetCusBtn').on('click',(event)=>{
    event.preventDefault();
    $('#customerIdField').val("");
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
