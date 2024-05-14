import {itemList,customersList,orderList} from "../db/db.js";
$('#nav-dashboard').on('click',()=>{
    $('#dashboardSection').removeClass("close");
    $('#customerSection').addClass("close");
    $('#itemSection').addClass("close");
    $('#orderSection').addClass("close");
    $('#dashboardSection').addClass("open");
    console.log("clicked");
    loadValues();

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
function loadValues() {
    $('#totalCustomerH1').text(customersList.length);
    $('#totalItemH1').text(itemList.length);
    $('#totalOrdersH1').text(orderList.length);
    var date = new Date();
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    var formattedDate = date.toLocaleDateString('en-US', options);
    $('#dateLabel').text( formattedDate);

}

loadValues();