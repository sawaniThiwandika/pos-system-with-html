import {CustomerModel} from "../model/CustomerModel.js";
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
    customer=new CustomerModel(cusId,cusName,cusEmail,cusAddress,cusContact);
    console.log(customer.cusName);

});