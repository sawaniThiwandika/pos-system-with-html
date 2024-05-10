import {customersList, itemList, orderList} from "../db/db.js";
import {OrderModel} from "../model/OrderModel.js";
import {CustomerModel} from "../model/CustomerModel.js";
import {OrderItemDetailsModel} from "../model/OrderItemDetails.js";

let selectedCustomer = new CustomerModel();
let order;
let orderId;
loadId();

function loadId() {
    order = new OrderModel();

    if (orderList.length === 0) {
        orderId = "O1";
    } else {
        let lastOrderId = orderList[orderList.length - 1];
        if (lastOrderId && lastOrderId.id) {
            let lastOrderIdNumericPart = parseInt(lastOrderId.id.substring(1));
            let newNumericPart = lastOrderIdNumericPart + 1;
            orderId = "O" + newNumericPart;
        } else {
            // Handle the case where the last order ID is invalid
            orderId = "O1";
        }
    }
    $('#orderIdField').val(orderId);
}

$(document).ready(function () {

    $("#customerContactFieldOrder").on("input", function () {
        populateDatalistCustomerOrder();
    });

    $("#customerContactFieldOrder").on("change", function () {
        var selectedValue = $(this).val();
        updateOtherFieldsCustomerOrder(selectedValue);
    });

    $("#customerContactFieldOrder").on("input", function () {
        var selectedValue = $(this).val();
        if (!selectedValue) {
            clearOtherFieldsCustomerOrder();
        }
    });
    $("#selectBtnCustomerBtnOrder").on("click", function () {
        var selectedValue = $("#customerContactFieldOrder").val();
        selectedCustomer = customersList.find(function (customer) {
            return customer.cusContact === selectedValue;
        });

        if (selectedCustomer) {
            order.customer = selectedCustomer;
            console.log("Selected customer: ", selectedCustomer);
        } else {
            console.log("Customer not found");
        }

    });


});
function populateDatalistCustomerOrder() {
    var datalistForCustomers = $("#customerListForOrder");
    datalistForCustomers.empty();
    $.each(customersList, function(index, item) {
        datalistForCustomers.append($("<option>", { value: item.cusContact }));
    });
}
function updateOtherFieldsCustomerOrder(selectedValue) {
    selectedCustomer = customersList.find(function (item) {
        return item.cusContact === selectedValue;
    });

    if (selectedCustomer) {
        $("#customerNameFieldOrder").val(selectedCustomer.cusName);
        $("#customerIdFieldOrder").val(selectedCustomer.cusId);
    }
}
function clearOtherFieldsCustomerOrder() {
    $("#customerIdFieldOrder").val("");
    $("#customerNameFieldOrder").val("");

}
$(document).ready(function() {

    $("#itemNameFieldInOrder").on("input", function() {
        populateDatalist();
    });

    $("#itemNameFieldInOrder").on("change", function() {
        var selectedValue = $(this).val();
        updateOtherFields(selectedValue);
    });

    $("#itemNameFieldInOrder").on("input", function() {
        var selectedValue = $(this).val();
        if (!selectedValue) {
            clearOtherFields();
        }
    });

    $("#itemQtyFieldOrder").on("input", function() {
        updateTotalPrice();
    });
});

function populateDatalist() {
    var datalistForItems = $("#itemListForOrder");
    datalistForItems.empty();
    $.each(itemList, function(index, item) {
        datalistForItems.append($("<option>", { value: item.itemName }));
    });
}

function updateOtherFields(selectedValue) {
    var selectedItem = itemList.find(function(item) {
        return item.itemName === selectedValue;
    });

    if (selectedItem) {
        $("#itemUnitPriceFieldOrder").val(selectedItem.unitPrice);
        $("#itemCodeFieldOrder").val(selectedItem.itemCode);
    }
}

function clearOtherFields() {
    $("#itemUnitPriceFieldOrder").val("");
    $("#itemCodeFieldOrder").val("");
    $("#itemQtyFieldOrder").val("");
    $("#totalPriceFieldInOrder").val("");
}

function updateTotalPrice() {
    var unitPrice = parseFloat($("#itemUnitPriceFieldOrder").val());
    var quantity = parseInt($("#itemQtyFieldOrder").val());
    var totalPrice = unitPrice * quantity;
    if (!isNaN(totalPrice)) {
        $("#totalPriceFieldInOrder").val(totalPrice.toFixed(2));
    } else {
        $("#totalPriceFieldInOrder").val("");
    }
}

function calculateNetTotal() {
    let netTotal = 0;

    // Iterate over each row of the cart table
    $('#cartTableBody tr').each(function() {
        // Extract the total amount from the row
        let totalAmount = parseFloat($(this).find('.colItemTotalCart').text());

        // Add the total amount to the net total
        if (!isNaN(totalAmount)) {
            netTotal += totalAmount;
        }
    });


    $('#totalValue').text(netTotal.toFixed(2));
}

function addToCart() {
    $('#cartTableBody').empty();
    order.itemListOrder.forEach((item, index) => {
        if (index > 0) {
            var record = `<tr>
                <td class="colItemCodeCart">${item.itemCode}</td>
                <td class="colItemNameCart">${item.itemName}</td>
                <td class="cilItemQtyCart">${item.qty}</td>
                <td class="colItemUnitPriceCart">${item.unitPrice}</td>
                <td class="colItemTotalCart">${item.total}</td>
                <td class="colItemRemoveButtonCart"><button class="removeFromCart">Remove</button></td>
            </tr>`;
            $('#cartTableBody').append(record);
        }
    });

    // Attach click event listener to the "Remove" buttons
    $('#cartTableBody').on('click', '.removeFromCart', function() {
        // Get the item code of the item to remove
        var itemCodeToRemove = $(this).closest('tr').find('.colItemCodeCart').text();

        // Find the index of the item with the matching item code in the array
        var indexToRemove = order.itemListOrder.findIndex(item => item.itemCode === itemCodeToRemove);

        // Remove the item from the array if found
        if (indexToRemove !== -1) {
            order.itemListOrder.splice(indexToRemove, 1);
            addToCart(); // Rebuild the cart table
            calculateNetTotal(); // Recalculate the net total
        }
    });

    calculateNetTotal();
}

addToCart();

function checkDuplicate() {
    let itemCode = $("#itemCodeFieldOrder").val();
    for (let index = 0; index < order.itemListOrder.length; index++) {
        if (itemCode === order.itemListOrder[index].itemCode) {
            return index; // Return the index of the duplicate item
        }
    }
    return -1; // Return -1 if no duplicate is found
}

$("#addToCartButtonOrder").on("click", function () {
    var newQty = parseFloat($("#itemQtyFieldOrder").val());
    var unitPrice = parseFloat($("#itemUnitPriceFieldOrder").val());
    var index = checkDuplicate();
    if (index > -1) {
        var oldQty = parseFloat(order.itemListOrder[index].qty);
        newQty = oldQty + newQty;
        var newPrice=newQty*unitPrice;
        order.itemListOrder[index].qty=newQty;
        order.itemListOrder[index].total=newPrice;
    }

    else {
        let id = $("#orderIdField").val();
        let itemName = $("#itemNameFieldInOrder").val();
        let itemCode = $("#itemCodeFieldOrder").val();
        let qty = $("#itemQtyFieldOrder").val();
        let unitPrice = $("#itemUnitPriceFieldOrder").val();
        let totalPriceOfItem = $("#totalPriceFieldInOrder").val();
        order.itemListOrder.push(new OrderItemDetailsModel(id, itemCode, itemName, qty, unitPrice, totalPriceOfItem));
        console.log(order.itemListOrder);
    }
    addToCart();
    clearOtherFields();
});

function loadOrderList() {
    $('#orderListTableBody').empty();
    orderList.map((item, index) => {
        var record = `<tr>
         <td  class="colOrderId" >${item.id}</td>
            <td class="colCustomerIdOrderList">${item.customer.cusId}</td>
            <td class="colCustomerNameOrderList">${item.customer.cusName}</td>
            <td class="colDateOrder">${item.date}</td>
            <td class="colTotalOrder">${item.total}</td>
            <td class="colViewItems"><button>View Items</button></td>
        </tr>`;
        $('#orderListTableBody').append(record);
    });
}

$("#placeOrder").on("click", function () {
    order.id=orderId;
    order.total = $("#totalValue").text().trim();
    order.date=new Date().toISOString().split('T')[0];
    orderList.push(order);
    loadOrderList();
    loadId();
});